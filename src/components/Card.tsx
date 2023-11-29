import { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return <div className="p-5 bg-slate-800 rounded">{children}</div>;
}

export function CardWhite({ children }: PropsWithChildren) {
  return <div className="p-5 bg-slate-50 rounded">{children}</div>;
}
