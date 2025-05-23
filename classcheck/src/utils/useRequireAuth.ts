// useRequireAuth.ts => function like a hooks
import { useEffect } from "react";

export const useRequireAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      window.location.href = "/lecturer/login";
    }
  }, []);
};
