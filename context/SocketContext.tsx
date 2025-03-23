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
import { Alert } from "react-native";

interface SocketContextProps {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  userOnline: string[];
  setUserOnline: (userOnline: string[]) => void;
  connecting: boolean;
}

export const SocketContext = createContext<SocketContextProps>({
  socket: {} as Socket,
  setSocket: () => {},
  userOnline: [],
  setUserOnline: () => {},
  connecting: false,
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userOnline, setUserOnline] = useState<string[]>([]);
  const [connecting, setConnecting] = useState(false);
  const { clearUser, userInfo } = useAuth();

  useEffect(() => {
    if (!userInfo?.user?.userId) return;

    try {
      setConnecting(true);
      // Create socket connection
      console.log(
        "Attempting to connect socket for user:",
        userInfo.user.userId
      );
      const socketInstance = io("http://localhost:8080", {
        query: {
          userId: userInfo.user.userId,
          role: userInfo?.user.role || "user",
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000,
      });

      // Handle connection events
      socketInstance.on("connect", () => {
        console.log("Socket connected successfully", socketInstance.id);
        setConnecting(false);
      });

      socketInstance.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        console.error("Connection error details:", {
          message: error.message,
          description: error.description,
          context: error.context,
        });
        setConnecting(false);
      });

      socketInstance.on(
        "getOnlineUsers",
        (data: { users: string[]; admin: string[] }) => {
          console.log("Online users updated:", data);
          setUserOnline([...data.users, ...data.admin]);
        }
      );

      socketInstance.on("forceDisconnect", async () => {
        console.warn("Forced disconnection requested");
        clearUser();
      });

      socketInstance.on("messageError", (error) => {
        console.error("Message error from server:", error);
      });

      socketInstance.on("error", (error) => {
        console.error("General socket error:", error);
      });

      socketInstance.on("messageRead", ({ messageId }) => {
        // Update message read status if needed
      });

      setSocket(socketInstance);

      return () => {
        if (socketInstance) {
          socketInstance.disconnect();
          setSocket(null);
        }
      };
    } catch (error) {
      console.error("Error setting up socket:", error);
      setConnecting(false);
    }
  }, [userInfo?.user?.userId]);

  const socketContextValue = useMemo(
    () => ({
      socket,
      setSocket,
      userOnline,
      setUserOnline,
      connecting,
    }),
    [socket, setSocket, userOnline, setUserOnline, connecting]
  );

  return (
    <SocketContext.Provider value={socketContextValue}>
      {children}
    </SocketContext.Provider>
  );
};
