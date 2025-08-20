"use client";

import { forwardRef, useId, Children, cloneElement, isValidElement } from "react";
import type { RadioProps, RadioSize, RadioColor } from "./Radio";
import { Radio } from "./Radio";
import "./RadioGroup.scss";

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
      children,
      ...props
    },
    ref
  ) {
    const reactId = useId();
    const groupName = name || `radio-group-${reactId}`;

    const handleChange = (radioValue: string | number) => {
      onChange?.(radioValue);
    };

    const classes = [
      "radio-group",
      `radio-group--${direction}`,
      disabled && "radio-group--disabled",
      className
    ].filter(Boolean).join(" ");

    const enhancedChildren = Children.map(children, (child) => {
      if (!isValidElement(child) || child.type !== Radio) {
        return child;
      }

      const radioProps = child.props as RadioProps;
      
      let isChecked = false;
      if (value !== undefined) {
        isChecked = value === radioProps.value;
      } else if (radioProps.checked) {
        isChecked = true;
      } else if (defaultValue !== undefined) {
        isChecked = defaultValue === radioProps.value;
      }
      
      return cloneElement(
        child, 
        {
          ...radioProps,
          name: groupName,
          size: radioProps.size || size,
          color: radioProps.color || color,
          disabled: radioProps.disabled || disabled,
          required: radioProps.required || required,
          checked: isChecked,
          onChange: (radioValue: string | number, event: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(radioValue);
            radioProps.onChange?.(radioValue, event);
          },
        }
      );
    });

    return (
      <div
        ref={ref}
        className={classes}
        style={style}
        role="radiogroup"
        {...props}
      >
        {enhancedChildren}
      </div>
    );
  }
);

RadioGroup.displayName = "RadioGroup";