"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { CSSProperties, HTMLAttributes, ReactNode, MouseEvent } from "react";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";
import "./Dialog.scss";

type BaseProps = {
  className?: string;
  sx?: SxProps;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "style">;

export type DialogProps = BaseProps & {
  open: boolean;
  onClose?: () => void;
  disablePortal?: boolean;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
  fullScreen?: boolean;
  scroll?: "paper" | "body";
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

export type DialogTitleProps = BaseProps;
export type DialogContentProps = BaseProps & {
  dividers?: boolean;
};
export type DialogActionsProps = BaseProps;

const DialogRoot = forwardRef<HTMLDivElement, DialogProps>(function DialogRoot(props, ref) {
  const theme = useTheme();
  const {
    className,
    sx,
    style: styleProp,
    children,
    open,
    onClose,
    disableBackdropClick = false,
    disableEscapeKeyDown = false,
    maxWidth = "sm",
    fullWidth = false,
    fullScreen = false,
    scroll = "paper",
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = props;

  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || disableEscapeKeyDown) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, disableEscapeKeyDown, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (disableBackdropClick) {
      return;
    }

    if (event.target === backdropRef.current) {
      onClose?.();
    }
  };

  if (!open) {
    return null;
  }

  const classes = [
    "dialog",
    fullScreen ? "dialog--full-screen" : undefined,
    !fullScreen && maxWidth ? `dialog--max-width-${maxWidth}` : undefined,
    fullWidth ? "dialog--full-width" : undefined,
    scroll === "body" ? "dialog--scroll-body" : undefined,
    className,
  ].filter(Boolean).join(" ");

  const backdropClasses = ["dialog__backdrop", fullScreen ? "dialog__backdrop--full-screen" : undefined].filter(Boolean).join(" ");

  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div className={backdropClasses} ref={backdropRef} onClick={handleBackdropClick}>
      <div
        ref={ref}
        className={classes}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
});

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(props, ref) {
  const { disablePortal = false, ...dialogProps } = props;

  const dialogElement = <DialogRoot ref={ref} {...dialogProps} />;

  if (disablePortal || typeof document === "undefined") {
    return dialogElement;
  }

  return createPortal(dialogElement, document.body);
});

export const DialogTitle = forwardRef<HTMLDivElement, DialogTitleProps>(function DialogTitle(props, ref) {
  const theme = useTheme();
  const { className, sx, style: styleProp, children, ...rest } = props;
  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div
      ref={ref}
      className={["dialog__title", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(props, ref) {
  const theme = useTheme();
  const { className, sx, style: styleProp, children, dividers = false, ...rest } = props;

  const classes = [
    "dialog__content", dividers ? "dialog__content--dividers" : undefined, className,
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

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(function DialogActions(props, ref) {
  const theme = useTheme();
  const { className, sx, style: styleProp, children, ...rest } = props;
  const style: CSSProperties = { ...styleProp, ...resolveSx(theme, sx) };

  return (
    <div
      ref={ref}
      className={["dialog__actions", className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export default undefined;
