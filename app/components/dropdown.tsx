"use client";

import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type DropdownContextValue = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext(): DropdownContextValue {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("Dropdown components must be used within <Dropdown>");
  return ctx;
}

export function Dropdown({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setIsOpen(v => !v), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    function onDocumentClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (containerRef.current.contains(e.target as Node)) return;
      setIsOpen(false);
    }
    if (isOpen) document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, [isOpen]);

  const value = useMemo(
    () => ({ isOpen, toggle, close }),
    [isOpen, toggle, close]
  );

  return (
    <DropdownContext.Provider value={value}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

type ButtonProps = PropsWithChildren<{ className?: string }>;

export function DropdownButton({ children, className }: ButtonProps) {
  const { toggle } = useDropdownContext();
  return (
    <div
      onClick={toggle}
      className={
        "inline-flex items-center gap-1 text-sm font-medium cursor-pointer" +
        (className ?? "")
      }
      aria-haspopup="menu"
      aria-expanded={false}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-4 w-4 opacity-70"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export function DropdownMenu({ children }: PropsWithChildren) {
  const { isOpen } = useDropdownContext();
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
      <div className="py-1">{children}</div>
    </div>
  );
}

type ItemProps = PropsWithChildren<{
  onClick?: () => void;
  disabled?: boolean;
}>;

export function DropdownItem({ children, onClick, disabled }: ItemProps) {
  const { close } = useDropdownContext();
  const handleClick = useCallback(() => {
    onClick?.();
    close();
  }, [onClick, close]);
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 disabled:opacity-50 cursor-pointer"
    >
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className="my-1 h-px bg-gray-100" />;
}

export function DropdownLabel({ children }: PropsWithChildren) {
  return <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{children}</div>;
}

export default Dropdown;


