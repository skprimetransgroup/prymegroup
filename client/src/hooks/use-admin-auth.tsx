import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

type AdminUser = {
  id: string;
  username: string;
} | null;

type AdminAuthContextType = {
  adminUser: AdminUser;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/admin/me", {
        credentials: 'include',
      });
      
      if (response.ok) {
        const user = await response.json();
        setAdminUser(user);
      } else {
        setAdminUser(null);
      }
    } catch (error) {
      setAdminUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setAdminUser({
          id: data.id,
          username: data.username,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid credentials",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setAdminUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}