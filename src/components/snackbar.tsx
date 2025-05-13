'use client';

import React from 'react';
import { useSnackbar, SnackbarSeverity, SnackbarMessage } from '@/lib/snackbarContext';

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

// Individual Snackbar Item component for display
const SnackbarItemDisplay = ({ snackbarItem } : { snackbarItem : SnackbarMessage }) => {
  const { hideSnackbar } = useSnackbar();
  const { id, message, severity } = snackbarItem;

  return (
    <div
      // Each snackbar item
      className={`p-4 rounded-md shadow-lg w-full max-w-md ${getSeverityClasses(severity)}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={() => hideSnackbar(id)} // Hide specific snackbar on click
          className="ml-4 text-current hover:opacity-75 focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export const Snackbar = () => {
  const { snackbars } = useSnackbar();

  if (!snackbars.length) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col-reverse gap-2 items-end">
      {snackbars.map((snackbar) => (
        <SnackbarItemDisplay key={snackbar.id} snackbarItem={snackbar} />
      ))}
    </div>
  );
};
