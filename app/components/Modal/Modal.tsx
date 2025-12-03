'use client';

import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  containerId?: string;
}

export default function Modal({ isOpen, onClose, children, containerId = 'modal-root' }: ModalProps) {
  const [mounted, setMounted] = React.useState(false);
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
    setContainer(document.getElementById(containerId));
  }, [containerId]);

  if (!isOpen || !mounted || !container) return null;

  return createPortal(
    <>
      <div className="modal-backdrop fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="mx-4 min-w-xs" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </>,
    container
  );
}


