import { useEffect } from "react";
import { useLocation } from "wouter";

export function useScrollRestoration() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
}

export function ScrollRestoration() {
  useScrollRestoration();
  return null;
}