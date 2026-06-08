import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="backdrop" ref={backdropRef} onClick={handleBackdropClick}>
      <div role="dialog" className="modal">
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
