import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from "react";
import { Alert } from "react-native";

interface DirtyContextType {
  isDirty: boolean;
  markDirty: () => void;
  markClean: () => void;
}

const DirtyContext = createContext<DirtyContextType | undefined>(undefined);

export const DirtyProvider = ({ children }: { children: ReactNode }) => {
  const [isDirty, setIsDirty] = useState(false);

  const markDirty = () => setIsDirty(true);
  const markClean = () => setIsDirty(false);

  const value = useMemo(() => ({ isDirty, markDirty, markClean }), [isDirty]);

  return (
    <DirtyContext.Provider value={value}>{children}</DirtyContext.Provider>
  );
};

export const useChanges = () => {
  const context = useContext(DirtyContext);
  if (!context) {
    throw new Error("useChanges must be used within a SpinnerProvider");
  }
  return context;
};
