'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

export interface SnackbarMessage {
  id : string;
  message : string;
  severity : SnackbarSeverity;
  duration ?: number;
}

interface SnackbarContextType {
  snackbars : SnackbarMessage[];
  showSnackbar : (message : string, severity : SnackbarSeverity, duration ?: number) => void;
  hideSnackbar : (id : string) => void;
}

const DEFAULT_DURATION = 5000; // Default duration for snackbars in milliseconds

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);
export const SnackbarProvider = ({ children } : { children : ReactNode }) => {


    const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

    const hideSnackbar = useCallback((id : string) => {
        setSnackbars((prevSnackbars) => prevSnackbars.filter((snackbar) => snackbar.id !== id));
    }, []);

    const showSnackbar = useCallback(
        (message : string, severity : SnackbarSeverity, duration : number = DEFAULT_DURATION) => {
        const id = Math.random().toString(36).substring(2, 9) + Date.now().toString(36); // Generate a simple unique ID
        setSnackbars((prevSnackbars) => [...prevSnackbars, { id, message, severity, duration }]);

        setTimeout(() => {
            hideSnackbar(id);
        }, duration);
        },
        [hideSnackbar] // hideSnackbar is memoized and stable
    );

    return (
        <SnackbarContext.Provider value={{ snackbars, showSnackbar, hideSnackbar }}>
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
