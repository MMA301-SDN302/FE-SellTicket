import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface SpinnerContextType {
  isShowSpinner: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

const SpinnerContext = createContext<SpinnerContextType | undefined>(undefined);

export const SpinnerProvider = ({ children }: { children: ReactNode }) => {
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  const showSpinner = () => setIsShowSpinner(true);
  const hideSpinner = () => setIsShowSpinner(false);

  const value = useMemo(
    () => ({ isShowSpinner, showSpinner, hideSpinner }),
    [isShowSpinner]
  );

  return (
    <SpinnerContext.Provider value={value}>{children}</SpinnerContext.Provider>
  );
};

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error("useSpinner must be used within a SpinnerProvider");
  }
  return context;
};
