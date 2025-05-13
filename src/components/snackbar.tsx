'use client';

import React, { useEffect } from 'react';
import { useSnackbar, SnackbarSeverity } from '@/lib/snackbarContext';

const getSeverityClasses = (severity : SnackbarSeverity) => {
  switch (severity) {
    case 'success':
      return 'bg-green-500 text-white';
    case 'error':
      return 'bg-red-500 text-white';
    case 'warning':
      return 'bg-yellow-500 text-black';
    case 'info':
    default:
      return 'bg-blue-500 text-white';
  }
};

export const Snackbar = () => {
  const { open, message, severity, hideSnackbar } = useSnackbar();

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 5000); // Auto-hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [open, hideSnackbar]);

  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-md shadow-lg z-50 transition-all duration-300 transform ${
        open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } ${getSeverityClasses(severity)}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={hideSnackbar}
          className="ml-4 text-current hover:opacity-75 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
