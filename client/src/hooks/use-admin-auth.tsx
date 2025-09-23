import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
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
        return false;
      }
    } catch (error) {
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
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}