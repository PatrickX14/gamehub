import { ReactNode } from "react";

interface SectionCard {
  title: string;
  description: string;
  children: ReactNode;
  containerClassName?: string;
}
export function SectionCard({
  title,
  description,
  children,
  containerClassName,
}: SectionCard) {
  return (
    <div
      className={`bg-[#F9FAFB] rounded-md shadow-md overflow-hidden p-6 ${containerClassName}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-primary font-semibold text-lg">{title}</h2>
          <p className="text-secondary text-sm">{description}</p>
        </div>
      </div>
      <div className="h-px w-full bg-[#364049]/10 my-3"></div>
      {children}
    </div>
  );
}
