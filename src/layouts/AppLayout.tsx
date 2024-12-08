import React, { ReactElement } from "react";
import AppHeader from "./AppHeader";

interface IAppLayoutProps {
  children: ReactElement | null;
}

export const AppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <div className="overflow-y-auto overflow-x-hidden px-6">{children}</div>
    </>
  );
};
