"use client";
import { Switch } from "antd";
import { ReactNode, useState } from "react";

interface SectionCardProps {
  title: string;
  description: string;
  children: ReactNode;
  containerClassName?: string;
  canToggle?: boolean;
  hideHeader?: boolean;
}

export function SectionCard({
  title,
  description,
  children,
  containerClassName,
  canToggle,
  hideHeader,
}: SectionCardProps) {
  // Check if canToggle was not sent init isChecked state with true so children will render
  const [isChecked, setChecked] = useState<boolean>(canToggle ? false : true);
  return (
    <div
      className={`bg-[#F9FAFB] rounded-md shadow-md overflow-hidden p-6 ${containerClassName}`}
    >
      {hideHeader ? null : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-primary font-semibold text-lg">{title}</h2>
              <p className="text-secondary text-sm">{description}</p>
            </div>
            {canToggle && (
              <div>
                <Switch
                  value={isChecked}
                  onChange={(checked) => setChecked(checked)}
                />
              </div>
            )}
          </div>
          <div className="h-px w-full bg-[#364049]/10 my-3"></div>
        </>
      )}
      {isChecked && children}
    </div>
  );
}
