import { useEffect } from "react";

export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    const body = document.body;

    if (!lock) return;

    // calculate scrollbar width
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    // lock scroll and compensate for scrollbar
    body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // cleanup function
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [lock]);
}
