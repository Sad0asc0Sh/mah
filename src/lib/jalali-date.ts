import { toGregorian, toJalaali } from "jalaali-js"

const PERSIAN_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]

const PERSIAN_MONTHS_SHORT = [
  "فرو",
  "ارد",
  "خرد",
  "تیر",
  "مرد",
  "شهر",
  "مهر",
  "آبا",
  "آذر",
  "دی",
  "بهم",
  "اسف",
]

const normalizeDigits = (value: string) =>
  value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹"
    const arabicDigits = "٠١٢٣٤٥٦٧٨٩"
    const persianIndex = persianDigits.indexOf(digit)
    if (persianIndex >= 0) return String(persianIndex)
    const arabicIndex = arabicDigits.indexOf(digit)
    if (arabicIndex >= 0) return String(arabicIndex)
    return digit
  })

export function formatJalaliDate(
  input: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date =
    typeof input === "string" || typeof input === "number"
      ? new Date(input)
      : input

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return ""
  }

  const formatOptions: Intl.DateTimeFormatOptions =
    options ??
    ({
      year: "numeric",
      month: "long",
      day: "numeric",
    } as const)

  try {
    return new Intl.DateTimeFormat(
      "fa-IR-u-ca-persian",
      formatOptions,
    ).format(date)
  } catch {
    const { jy, jm, jd } = toJalaali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    )

    const monthFormat = formatOptions.month
    let monthValue = ""
    if (monthFormat === "long") {
      monthValue = PERSIAN_MONTHS[jm - 1]
    } else if (monthFormat === "short") {
      monthValue = PERSIAN_MONTHS_SHORT[jm - 1]
    } else if (monthFormat === "2-digit") {
      monthValue = String(jm).padStart(2, "0")
    } else if (monthFormat) {
      monthValue = String(jm)
    }

    const dayFormat = formatOptions.day
    const dayValue = dayFormat
      ? dayFormat === "2-digit"
        ? String(jd).padStart(2, "0")
        : String(jd)
      : ""

    const yearValue = formatOptions.year ? String(jy) : ""
    const weekdayValue = formatOptions.weekday
      ? new Intl.DateTimeFormat("fa-IR", {
          weekday: formatOptions.weekday,
        }).format(date)
      : ""

    const parts = [weekdayValue, dayValue, monthValue, yearValue].filter(Boolean)
    return parts.join(" ")
  }
}

export function jalaliToIso(jalali: string): string | null {
  const normalized = normalizeDigits(jalali)
  const match = normalized.match(/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})$/)
  if (!match) return null

  const [, jy, jm, jd] = match.map(Number)
  const { gy, gm, gd } = toGregorian(jy, jm, jd)

  const isoMonth = String(gm).padStart(2, "0")
  const isoDay = String(gd).padStart(2, "0")
  return `${gy}-${isoMonth}-${isoDay}`
}

export function isoToJalali(iso: string): string | null {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (!match) return null

  const [, gy, gm, gd] = match.map(Number)
  const { jy, jm, jd } = toJalaali(gy, gm, gd)

  const jMonth = String(jm).padStart(2, "0")
  const jDay = String(jd).padStart(2, "0")
  return `${jy}/${jMonth}/${jDay}`
}
