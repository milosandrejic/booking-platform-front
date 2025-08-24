"use client";

import { useLayoutEffect } from "react";
import { generateCSSVariables } from "./cssVariables";

type Options = {
  id?: string; // style tag id
  selector?: string; // override selector, default :root
};

export function useThemeVariables(theme: unknown, options: Options = {}): void {
  useLayoutEffect(() => {
    const baseCss = generateCSSVariables(theme);
    const css = options.selector
      ? baseCss.replace(/^:root/, options.selector)
      : baseCss;

    const styleId = options.id ?? "bp-theme-vars";
    let tag = document.getElementById(styleId) as HTMLStyleElement | null;
    if (!tag) {
      tag = document.createElement("style");
      tag.id = styleId;
      document.head.appendChild(tag);
    }
    if (tag.textContent !== css) {
      tag.textContent = css;
    }
  }, [theme, options.id, options.selector]);
}

export default useThemeVariables;
