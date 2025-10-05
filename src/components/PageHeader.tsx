import React from "react";
import { twMerge } from "tailwind-merge";
import ConditionalRender from "./ConditionalRender";

const PageHeader = ({
  label,
  supportText,
  children,
  className,
}: {
  label?: string;
  supportText?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={twMerge("p-4", className)}>
      <div className="flex flex-col items-start">
        <h1 className="text-2xl leading-tight mb-0 font-bold">{label}</h1>
        <ConditionalRender condition={!!supportText}>
          <p className="text-gray-600 text-sm leading-tight">{supportText}</p>
        </ConditionalRender>
      </div>
      {children}
    </div>
  );
};

export default PageHeader;
