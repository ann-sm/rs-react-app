import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div className="modal">{children}</div>
    </div>,
    document.body
  );
};

export default Modal;
