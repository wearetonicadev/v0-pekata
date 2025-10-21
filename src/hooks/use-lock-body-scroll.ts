import { useEffect } from "react";

export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    const body = document.body;

    if (!lock) return;

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [lock]);
}
