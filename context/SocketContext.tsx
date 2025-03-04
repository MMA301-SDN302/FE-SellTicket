import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

interface SocketContextProps {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  userOnline: string[];
  setUserOnline: (userOnline: string[]) => void;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: {} as Socket,
  setSocket: () => {},
  userOnline: [],
  setUserOnline: () => {},
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userOnline, setUserOnline] = useState<string[]>([]);
  const { clearUser, userInfo } = useAuth();
  useEffect(() => {
    if (userInfo?.user?.userId !== "") {
      const socket = io("http://localhost:8080", {
        query: {
          userId: userInfo?.user.userId,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", async (data: string[]) => {
        setUserOnline(data);
      });
      socket.on("forceDisconnect", async () => {
        clearUser();
      });
      return () => {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      };
    }
  }, [userInfo]);

  const socketContextValueWithUserOnline = useMemo(
    () => ({ socket, setSocket, userOnline, setUserOnline }),
    [socket, setSocket, userOnline, setUserOnline]
  );

  return (
    <SocketContext.Provider value={socketContextValueWithUserOnline}>
      {children}
    </SocketContext.Provider>
  );
};
