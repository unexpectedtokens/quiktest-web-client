import { CardWhite } from "../Card";

export const Modal = ({
  children,
  open,
  confirmAction,
  confirmText,
}: {
  children: React.ReactNode;
  open: boolean;
  confirmAction?: () => void;
  confirmText?: string;
}) => {
  return open ? (
    <div className="fixed p-5 w-full top-0 left-0 h-full bg-slate-900 bg-opacity-80">
      <div className="w-5/12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <CardWhite>
          <div>{children}</div>
          <div>{confirmAction && <button>{confirmText ?? "Save"}</button>}</div>
        </CardWhite>
      </div>
    </div>
  ) : null;
};
