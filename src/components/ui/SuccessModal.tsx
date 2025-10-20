import React from 'react';

export type SuccessModalProps = {
  open: boolean;
  title?: string;
  message?: string | React.ReactNode;
  onClose: () => void;
  actionLabel?: string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  title = 'Success',
  message = 'Your action was completed successfully.',
  onClose,
  actionLabel = 'Close',
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-desc"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-[90%] max-w-md mx-auto p-6 animate-[fadeIn_0.15s_ease-in]">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
            <i className="fa fa-check" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 id="success-modal-title" className="text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <div id="success-modal-desc" className="mt-2 text-sm text-gray-600">
              {message}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
