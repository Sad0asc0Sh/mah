import React from "react";

interface UsersFormProps {
  title?: string;
  subtitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  ageLabel?: string;
  agePlaceholder?: string;
  buttonText?: string;
  onSubmit?: (data: { name: string; age: string }) => void;
  className?: string;
}

export default function UsersForm({
  title = "Let's Get Started",
  subtitle = "Select the button on this card to get started",
  nameLabel = "Your Name",
  namePlaceholder = "Enter your name",
  ageLabel = "Age",
  agePlaceholder = "Enter your age",
  buttonText = "Click Me",
  onSubmit = () => {},
  className = "",
}: UsersFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const age = formData.get("age") as string;
    onSubmit({ name, age });
  };

  return (
    <div
      className={`w-[568px] h-[568px] p-10 rounded-3xl flex flex-col justify-start items-start gap-5 overflow-hidden border border-[#f5f5f5] shadow-md bg-[#F5F4FC] ${className}`}
    >
      <div className="self-stretch h-[488px] flex flex-col justify-start items-start gap-[42px]">
        {/* Header Section */}
        <div className="h-[84px] flex flex-col justify-start items-start gap-3">
          <h1 className="self-stretch text-black text-4xl font-brockmann font-semibold leading-9 tracking-[-0.02em]">
            {title}
          </h1>
          <p className="self-stretch text-black text-[22px] font-brockmann font-normal leading-9 tracking-[-0.01em]">
            {subtitle}
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="self-stretch h-[220px] flex flex-col justify-start items-start gap-6"
        >
          {/* Name Field */}
          <div className="self-stretch h-[98px] flex flex-col justify-start items-start gap-2">
            <label className="self-stretch text-[#020817] text-[22px] font-brockmann font-normal leading-9 tracking-[-0.01em]">
              {nameLabel}
            </label>
            <input
              type="text"
              name="name"
              placeholder={namePlaceholder}
              className="w-full pl-[22px] pr-[22px] pt-2.5 pb-2 rounded-xl border-2 border-[#e1e7ef] flex justify-start items-center overflow-hidden bg-white text-[#63748a] text-[22px] font-brockmann font-normal leading-9 tracking-[-0.01em] placeholder-[#63748a] focus:outline-none focus:border-[#6448ef]"
            />
          </div>

          {/* Age Field */}
          <div className="self-stretch h-[98px] flex flex-col justify-start items-start gap-2">
            <label className="self-stretch text-[#020817] text-[22px] font-brockmann font-normal leading-9 tracking-[-0.01em]">
              {ageLabel}
            </label>
            <input
              type="text"
              name="age"
              placeholder={agePlaceholder}
              className="w-full pl-[22px] pr-[22px] pt-2.5 pb-2 rounded-xl border-2 border-[#e1e7ef] flex justify-start items-center overflow-hidden bg-white text-[#63748a] text-[22px] font-brockmann font-normal leading-9 tracking-[-0.01em] placeholder-[#63748a] focus:outline-none focus:border-[#6448ef]"
            />
          </div>
        </form>

        {/* Button Section */}
        <div className="self-stretch h-[100px] p-4 rounded-[18px] flex flex-col justify-start items-start gap-5">
          <button
            onClick={() => {
              const form = document.querySelector("form") as HTMLFormElement;
              if (form) form.dispatchEvent(new Event("submit", { bubbles: true }));
            }}
            className="self-stretch h-[68px] px-10 bg-[#ff5a00] rounded-xl shadow-[0px_16px_60px_0px_rgba(0,0,0,0.25)] flex justify-center items-center gap-4 hover:bg-[#e64a00] transition-colors"
          >
            <span className="text-center text-[#f5f5f6] text-[28px] font-brockmann font-normal leading-10">
              {buttonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
