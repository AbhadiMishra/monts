import React from 'react';
import { useToast } from '../../providers/ToastProvider';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[600] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-lg shadow-elevated border transition-all duration-300 animate-slide-up bg-white ${
              isSuccess
                ? 'border-emerald-200 text-emerald-950'
                : isError
                ? 'border-rose-200 text-rose-950'
                : isWarning
                ? 'border-amber-200 text-amber-950'
                : 'border-slate-200 text-slate-900'
            }`}
          >
            <div className="mr-3 mt-0.5 flex-shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-600" />}
            </div>
            <div className="flex-1 pr-2">
              <p className="font-medium text-sm leading-tight">{toast.title}</p>
              {toast.message && <p className="text-xs text-slate-600 mt-1">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
