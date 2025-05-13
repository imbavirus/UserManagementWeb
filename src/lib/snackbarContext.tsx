'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

interface SnackbarState {
  open : boolean;
  message : string;
  severity : SnackbarSeverity;
}

interface SnackbarContextType extends SnackbarState {
  showSnackbar : (message : string, severity : SnackbarSeverity) => void;
  hideSnackbar : () => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children } : { children : ReactNode }) => {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const showSnackbar = useCallback((message : string, severity : SnackbarSeverity) => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <SnackbarContext.Provider value={{ ...snackbar, showSnackbar, hideSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
