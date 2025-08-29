"use client";

import { forwardRef, useId, Children, cloneElement, isValidElement } from "react";
import type { RadioProps, RadioSize, RadioColor } from "./Radio";
import { Radio } from "./Radio";
import "./RadioGroup.scss";
import { resolveSx, type SxProps } from "../utils/sx";

export type RadioGroupDirection = "horizontal" | "vertical";

export interface RadioGroupProps {
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  size?: RadioSize;
  color?: RadioColor;
  direction?: RadioGroupDirection;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  sx?: SxProps;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  function RadioGroup(
    {
      value,
      defaultValue,
      onChange,
      size = "medium",
      color = "primary",
      direction = "vertical",
      disabled = false,
      required = false,
      name,
      className = "",
      style,
      sx,
      children,
      ...props
    },
    ref
  ) {
    const { styles, className: sxClassName } = resolveSx(sx);
    const reactId = useId();
    const groupName = name || `radio-group-${reactId}`;

    const handleChange = (radioValue: string | number) => {
      onChange?.(radioValue);
    };

    const classes = [
      "radio-group",
      `radio-group--${direction}`,
      disabled && "radio-group--disabled",
      sxClassName,
      className
    ].filter(Boolean).join(" ");

    const enhancedChildren = Children.map(children, (child) => {
      if (!isValidElement(child)) {
        return child;
      }

      const isRadio = (child.type === Radio) || ((child.type as any)?.displayName === Radio.displayName);
      if (!isRadio) {
        return child;
      }

      const radioProps = child.props as Partial<RadioProps> & Record<string, unknown>;
      
      let isChecked = false;
      if (value !== undefined) {
        isChecked = value === radioProps.value;
      } else if (radioProps.checked) {
        isChecked = true;
      } else if (defaultValue !== undefined) {
        isChecked = defaultValue === radioProps.value;
      }
      
      return cloneElement(child as React.ReactElement<any>, {
        ...radioProps,
        name: groupName,
        size: (radioProps.size as RadioSize) || size,
        color: (radioProps.color as RadioColor) || color,
        disabled: (radioProps.disabled as boolean) || disabled,
        required: (radioProps.required as boolean) || required,
        checked: isChecked,
        onChange: (radioValue: string | number, event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(radioValue);
          (radioProps.onChange as RadioProps["onChange"])?.(radioValue, event);
        },
      });
    });

    return (
      <div
        ref={ref}
        className={classes}
        style={{ ...style, ...styles }}
        role="radiogroup"
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";