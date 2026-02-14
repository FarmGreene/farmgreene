import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
