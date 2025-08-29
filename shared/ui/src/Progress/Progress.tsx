"use client";

import React, { forwardRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { resolveSx, type SxProps } from "../utils/sx";
import "./Progress.scss";

export type ProgressVariant = "linear" | "circular";
export type ProgressColor = "primary" | "success" | "info" | "warning" | "error";
export type ProgressSize = "small" | "medium" | "large";

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  variant?: ProgressVariant;
  color?: ProgressColor;
  value?: number; // 0-100; undefined => indeterminate
  buffer?: number; // 0-100; linear only
  label?: ReactNode | boolean;
  size?: ProgressSize;
  thickness?: number; // circular stroke width
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

function clampValue(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return value;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    variant = "linear",
    color = "primary",
    value,
    buffer,
    label,
    size = "medium",
    thickness = 4,
    className = "",
    style,
    sx,
    ...rest
  },
  ref,
) {
  const { styles, className: sxClassName } = resolveSx(sx);

  const isDeterminate = typeof value === "number";
  const normalizedValue = isDeterminate ? clampValue(value as number) : 0;
  const normalizedBuffer = typeof buffer === "number" ? clampValue(buffer) : undefined;

  const classes = [
    "progress",
    `progress--variant-${variant}`,
    `progress--color-${color}`,
    `progress--size-${size}`,
    isDeterminate ? "progress--determinate" : "progress--indeterminate",
    sxClassName,
    className.trim() || null,
  ].filter(Boolean).join(" ");

  if (variant === "linear") {
    return (
      <div
        ref={ref}
        className={classes}
        style={{ ...style, ...styles }}
        role="progressbar"
        aria-valuemin={isDeterminate ? 0 : undefined}
        aria-valuemax={isDeterminate ? 100 : undefined}
        aria-valuenow={isDeterminate ? normalizedValue : undefined}
        {...rest}
      >
        <div className="progress__track">
          {
            normalizedBuffer != null &&
            <div
              className="progress__buffer"
              style={{ width: `${normalizedBuffer}%` }}
            />
          }

          <div
            className="progress__bar"
            style={isDeterminate ? { width: `${normalizedValue}%` } : undefined}
          />
        </div>

        {
          label && isDeterminate &&
          <div className="progress__label">
            {label === true ? `${normalizedValue}%` : label}
          </div>
        }
      </div>
    );
  }

  // Circular
  let circularSize = 40;
  if (size === "small") {
    circularSize = 24;
  } else if (size === "large") {
    circularSize = 64;
  }
  
  const strokeWidth = thickness;
  const radius = (circularSize - strokeWidth) / 2;
  const strokeDashoffset = isDeterminate ? 100 - normalizedValue : undefined;

  return (
    <div
      ref={ref}
      className={classes}
      style={{ width: circularSize, height: circularSize, ...style, ...styles }}
      role="progressbar"
      aria-valuemin={isDeterminate ? 0 : undefined}
      aria-valuemax={isDeterminate ? 100 : undefined}
      aria-valuenow={isDeterminate ? normalizedValue : undefined}
      {...rest}
    >
      <svg
        className="progress__svg"
        width={circularSize}
        height={circularSize}
        viewBox={`0 0 ${circularSize} ${circularSize}`}
      >
        <circle
          className="progress__track-circle"
          cx={circularSize / 2}
          cy={circularSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          pathLength={100}
        />

        <circle
          className="progress__bar-circle"
          cx={circularSize / 2}
          cy={circularSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          // For determinate, use normalized 0-100 values so CSS indeterminate animation can override cleanly
          strokeDasharray={isDeterminate ? 100 : undefined}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${circularSize / 2} ${circularSize / 2})`}
          pathLength={100}
        />
      </svg>

      {
        label && isDeterminate &&
        <div className="progress__label">
          {label === true ? `${normalizedValue}%` : label}
        </div>
      }
    </div>
  );
});
