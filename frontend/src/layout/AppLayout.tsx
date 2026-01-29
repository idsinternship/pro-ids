import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./layout.css";

type Props = {
  title: string;
  children: ReactNode;
};

export default function AppLayout({ title, children }: Props) {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main">
        <Topbar title={title} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}
