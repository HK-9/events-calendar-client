import React, { ReactElement } from "react";

interface IAppLayoutProps {
  children: ReactElement | null;
}

export const AppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
  return (
    <div className="overflow-y-auto overflow-x-hidden px-6">{children}</div>
  );
};
