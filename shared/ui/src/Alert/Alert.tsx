/* eslint-disable @stylistic/max-len */
"use client";

import React, { forwardRef } from "react";
import type { ReactNode, HTMLAttributes } from "react";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";
import "./Alert.scss";

export type AlertVariant = "filled" | "outlined" | "standard";
export type AlertSeverity = "success" | "info" | "warning" | "error";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "style" | "title"> {
  variant?: AlertVariant;
  severity?: AlertSeverity;
  icon?: ReactNode | false;
  title?: ReactNode;
  action?: ReactNode;
  onClose?: () => void;
  closeIcon?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

const defaultIcons: Record<AlertSeverity, ReactNode> = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <g fill="none" stroke="currentcolor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.5l2 2l5-5"/>
      </g>
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <g fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentcolor" strokeWidth="1.5"/>
        <path stroke="currentcolor" strokeLinecap="round" strokeWidth="1.5" d="M12 17v-6"/>
        <circle cx="1" cy="1" r="1" fill="currentcolor" transform="matrix(1 0 0 -1 11 9)"/>
      </g>
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentcolor" d="M12 7.25a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75M12 17a1 1 0 1 0 0-2a1 1 0 0 0 0 2"/>
      <path 
        fill="currentcolor" 
        fillRule="evenodd" 
        d="M8.294 4.476C9.366 3.115 10.502 2.25 12 2.25s2.634.865 3.706 2.226c1.054 1.34 2.17 3.32 3.6 5.855l.436.772c1.181 2.095 2.115 3.75 2.605 5.077c.5 1.358.62 2.59-.138 3.677c-.735 1.055-1.962 1.486-3.51 1.69c-1.541.203-3.615.203-6.274.203h-.85c-2.66 0-4.733 0-6.274-.203c-1.548-.204-2.775-.635-3.51-1.69c-.758-1.087-.639-2.32-.138-3.677c.49-1.328 1.424-2.982 2.605-5.077l.436-.772c1.429-2.535 2.546-4.516 3.6-5.855m1.179.928C8.499 6.641 7.437 8.52 5.965 11.13l-.364.645c-1.226 2.174-2.097 3.724-2.54 4.925c-.438 1.186-.378 1.814-.04 2.3c.361.516 1.038.87 2.476 1.06c1.432.188 3.406.19 6.14.19h.727c2.733 0 4.707-.002 6.14-.19c1.437-.19 2.114-.544 2.474-1.06c.339-.486.4-1.114-.038-2.3c-.444-1.201-1.315-2.751-2.541-4.925l-.364-.645c-1.472-2.61-2.534-4.489-3.508-5.726C13.562 4.18 12.813 3.75 12 3.75s-1.562.429-2.527 1.654" 
        clipRule="evenodd"
      />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentcolor" d="M12 6.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V7a.75.75 0 0 1 .75-.75M13 16a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/>
      <path 
        fill="currentcolor" 
        fillRule="evenodd" 
        d="M12 1.25c-.705 0-1.348.194-2.051.52c-.68.317-1.469.783-2.454 1.367l-.754.446c-.986.584-1.773 1.05-2.38 1.496c-.628.462-1.11.934-1.458 1.553s-.505 1.279-.58 2.063c-.073.76-.073 1.691-.073 2.861v.888c0 1.17 0 2.1.073 2.86c.075.785.232 1.446.58 2.064c.349.619.83 1.091 1.458 1.553c.607.446 1.394.912 2.38 1.496l.754.446c.985.584 1.773 1.05 2.454 1.367c.703.326 1.346.52 2.051.52s1.348-.194 2.051-.52c.68-.317 1.469-.783 2.454-1.367l.754-.446c.986-.584 1.773-1.05 2.38-1.496c.628-.462 1.11-.934 1.458-1.553s.505-1.279.58-2.063c.073-.76.073-1.691.073-2.86v-.889c0-1.17 0-2.1-.073-2.86c-.075-.785-.232-1.446-.58-2.064c-.349-.619-.83-1.091-1.458-1.553c-.607-.446-1.394-.912-2.38-1.496l-.754-.446c-.985-.584-1.773-1.05-2.454-1.367c-.703-.326-1.346-.52-2.051-.52M8.225 4.447c1.027-.608 1.751-1.035 2.356-1.316c.59-.274 1.01-.381 1.419-.381s.83.107 1.42.38c.604.282 1.328.71 2.355 1.317l.686.407c1.027.608 1.75 1.037 2.29 1.434c.526.387.83.71 1.038 1.08c.21.371.33.806.395 1.47c.065.68.066 1.54.066 2.756v.812c0 1.216 0 2.075-.066 2.755c-.064.665-.185 1.1-.395 1.471c-.208.37-.512.693-1.038 1.08c-.54.397-1.263.826-2.29 1.434l-.686.407c-1.027.608-1.751 1.035-2.356 1.316c-.59.274-1.01.381-1.419.381s-.83-.107-1.42-.38c-.604-.282-1.328-.71-2.355-1.317l-.686-.407c-1.027-.608-1.75-1.037-2.29-1.434c-.526-.387-.83-.71-1.038-1.08c-.21-.371-.331-.806-.395-1.47c-.065-.68-.066-1.54-.066-2.756v-.812c0-1.216 0-2.075.066-2.755c.064-.665.185-1.1.394-1.471c.209-.37.513-.693 1.04-1.08c.54-.397 1.262-.826 2.29-1.434z" 
        clipRule="evenodd"
      />
    </svg>
  ),
};

/**
 * Alert: Display brief, important messages in a way that attracts attention without interrupting the user's task.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = "standard",
    severity = "info",
    icon,
    title,
    action,
    onClose,
    closeIcon,
    children,
    className = "",
    style,
    sx,
    ...rest
  },
  ref,
) {
  const theme = useTheme();

  if (!children) {
    return null;
  }

  const classes = [
    "alert",
    `alert--variant-${variant}`,
    `alert--severity-${severity}`,
    className.trim() || null,
  ].filter(Boolean).join(" ");

  const displayIcon = icon === false ? null : icon || defaultIcons[severity];

  const defaultCloseIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="currentcolor" d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"/>
      <path 
        fill="currentcolor" 
        fillRule="evenodd" 
        d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75S22.75 17.937 22.75 12S17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0a9.25 9.25 0 0 1-18.5 0" 
        clipRule="evenodd"
      />
    </svg>
  );

  const displayCloseIcon = closeIcon || defaultCloseIcon;

  return (
    <div
      ref={ref}
      className={classes}
      style={{ ...style, ...resolveSx(theme, sx) }}
      role="alert"
      {...rest}
    >
      {
        displayIcon &&
        <div className="alert__icon" aria-hidden="true">
          {displayIcon}
        </div>
      }

      <div className="alert__content">
        {
          title &&
          <div className="alert__title">
            {title}
          </div>
        }

        <div className="alert__message">
          {children}
        </div>
      </div>

      {
        action &&
        <div className="alert__action">
          {action}
        </div>
      }

      {
        onClose && !action &&
        <button
          type="button"
          className="alert__close"
          onClick={onClose}
          aria-label="Close alert"
        >
          {displayCloseIcon}
        </button>
      }
    </div>
  );
});

export default undefined;
