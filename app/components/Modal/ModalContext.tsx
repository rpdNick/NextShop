'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Modal from './Modal';

type ModalId = string;

type ModalRender =
  | React.ReactNode
  | ((ctx: { close: () => void; id: ModalId }) => React.ReactNode);

interface ModalItem {
  id: ModalId;
  content: ModalRender;
  onClose?: () => void;
}

interface ModalContextValue {
  openModal: (content: ModalRender, opts?: { onClose?: () => void }) => ModalId;
  closeModal: (id?: ModalId) => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalItem[]>([]);

  const openModal = useCallback((content: ModalRender, opts?: { onClose?: () => void }) => {
    const id = Math.random().toString(36).slice(2);
    setModals(prev => [...prev, { id, content, onClose: opts?.onClose }]);
    return id;
  }, []);

  const closeModal = useCallback((id?: ModalId) => {
    setModals(prev => {
      if (!prev.length) return prev;
      const targetId = id ?? prev[prev.length - 1].id;
      const item = prev.find(m => m.id === targetId);
      if (item?.onClose) queueMicrotask(item.onClose);
      return prev.filter(m => m.id !== targetId);
    });
  }, []);

  const closeAll = useCallback(() => {
    setModals(prev => {
      prev.forEach(m => m.onClose?.());
      return [];
    });
  }, []);

  const value = useMemo(() => ({ openModal, closeModal, closeAll }), [openModal, closeModal, closeAll]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map(m => (
        <Modal key={m.id} isOpen={true} onClose={() => closeModal(m.id)}>
          <div onClick={e => e.stopPropagation()}>
            {typeof m.content === 'function'
              ? m.content({ close: () => closeModal(m.id), id: m.id })
              : m.content}
          </div>
        </Modal>
      ))}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}


