import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  position?: 'right' | 'left';
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  position = 'right',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isRight = position === 'right';

  return (
    <div className="fixed inset-0 z-[400] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in" onClick={onClose} />
      <div
        className={`fixed inset-y-0 ${isRight ? 'right-0 animate-slide-left' : 'left-0 animate-slide-right'} max-w-full flex pl-10`}
      >
        <div className="w-screen max-w-md bg-white shadow-drawer flex flex-col justify-between">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            {title && <h2 className="font-serif text-lg font-bold text-primary">{title}</h2>}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-100 ml-auto"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};
