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
      month: "2-digit",
      day: "2-digit",
    } as const)

  try {
    return new Intl.DateTimeFormat(
      "fa-IR-u-ca-persian",
      formatOptions,
    ).format(date)
  } catch {
    return date.toLocaleDateString("fa-IR", formatOptions)
  }
}

