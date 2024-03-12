import React, { createContext, useContext, ReactNode, useState } from 'react';


// Create a context with an initial value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a context provider component
interface AppContextProviderProps {
  children: ReactNode;
}
const initialPagination: pagination = {
    total: 0,
    current_page: 1,
    limit: 10,
    total_pages: 1,
    offset: 0,
    next_url: ""
  }
export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [pagination, setPagination] = useState({ ...initialPagination })


  return (
    <AppContext.Provider value={{ pagination, setPagination }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }

  return context;
};
