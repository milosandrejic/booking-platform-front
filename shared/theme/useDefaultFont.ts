"use client";

import { useLayoutEffect } from "react";

/**
 * Injects a remote stylesheet for the default font family (Roboto) at runtime.
 * - Loads nothing unless explicitly invoked by the ThemeProvider or consumer.
 * - If a custom URL is provided, that will be used instead of the default Roboto URL.
 */
export function useDefaultFont(
  _fontFamily?: string,
  id: string = "bp-theme-fonts",
  url?: string
) {
  useLayoutEffect(() => {
    if (typeof document === "undefined") return;
    const href = url || "https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap";

    let link = document.getElementById(id) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (link.getAttribute("href") !== href) {
      link.setAttribute("href", href);
    }
  }, [id, url]);
}

export default useDefaultFont;
