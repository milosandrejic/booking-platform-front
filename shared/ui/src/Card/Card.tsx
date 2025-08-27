"use client";

import React, { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";
import "./Card.scss";

type BaseProps = {
  className?: string;
  sx?: SxProps;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "style">;

export type CardProps = BaseProps & {
  shadow?: "none" | "sm" | "md" | "lg";
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const theme = useTheme();
  const { className, shadow = "md", sx, style: styleProp, children, ...rest } = props;

  const classes = [
    "card",
    shadow === "none" ? "card--shadow-none" : undefined,
    shadow === "sm" ? "card--shadow-sm" : undefined,
    shadow === "md" ? "card--shadow-md" : undefined,
    shadow === "lg" ? "card--shadow-lg" : undefined,
    className,
  ].filter(Boolean).join(" ");

  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export type CardSectionProps = BaseProps;

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader(props, ref) {
  const theme = useTheme();
  const { className, sx, style: styleProp, children, ...rest } = props;
  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div
      ref={ref}
      className={["card__header", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(function CardContent(props, ref) {
  const theme = useTheme();
  const { className, sx, style: styleProp, children, ...rest } = props;
  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div
      ref={ref}
      className={["card__content", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardActions = forwardRef<HTMLDivElement, CardSectionProps>(function CardActions(props, ref) {
  const theme = useTheme();
  const { className, sx, style: styleProp, children, ...rest } = props;
  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div
      ref={ref}
      className={["card__actions", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export default undefined;
