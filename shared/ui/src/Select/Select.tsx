"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, useCallback, Children, isValidElement } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode, MouseEvent } from "react";
import "./Select.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type SelectSize = "small" | "medium" | "large";
export type SelectValue = string | number | object;

export interface SelectOptionProps extends HTMLAttributes<HTMLLIElement> {
  value: SelectValue;
  disabled?: boolean;
  children: ReactNode;
  sx?: SxProps;
}

export interface SelectProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "value" | "onChange" | "children"
> {
  value?: SelectValue | SelectValue[];
  defaultValue?: SelectValue | SelectValue[];
  onChange?: (next: SelectValue | SelectValue[]) => void;
  compareValue?: (a: SelectValue, b: SelectValue) => boolean;
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  size?: SelectSize;
  fullWidth?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  sx?: SxProps;
}

// Context to share Select state with Option components
const SelectContext = createContext<{
  selectedValue: SelectValue | SelectValue[] | undefined;
  multiple: boolean;
  toggleValue: (value: SelectValue, disabled?: boolean) => void;
  isSelected: (value: SelectValue) => boolean;
} | null>(null);

export const SelectOption = ({
  value,
  disabled = false,
  children,
  className = "",
  onClick,
  style,
  sx,
  ...props
}: SelectOptionProps) => {
  const context = useContext(SelectContext);
  
  if (!context) {
    throw new Error("SelectOption must be used within a Select component");
  }

  const { isSelected, toggleValue } = context;
  const selected = isSelected(value);

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    
    if (!disabled) {
      toggleValue(value, disabled);
    }
    
    onClick?.(e);
  };

  const optionClasses = [
    "select__option",
    disabled && "select__option--disabled",
    selected && "select__option--selected",
    className?.trim() || null
  ].filter(Boolean).join(" ");

  return (
    <li
      role="option"
      aria-selected={selected}
      className={optionClasses}
      style={{ ...style, ...resolveSx(useTheme(), sx) }}
      onMouseDown={(e) => { e.preventDefault(); }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </li>
  );
};

export const Select = ({
  value,
  defaultValue,
  onChange,
  compareValue,
  multiple = false,
  disabled = false,
  loading = false,
  placeholder = "Select…",
  size = "medium",
  fullWidth = false,
  className = "",
  style = {},
  children,
  sx,
  ...props
}: SelectProps) => {
  const theme = useTheme();
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<SelectValue | SelectValue[] | undefined>(
    defaultValue ?? (multiple ? [] : undefined)
  );
  const selectedValue = isControlled ? value! : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useRef(`select-listbox-${Math.random().toString(36).slice(2)}`).current;

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (!rootRef.current) {
        return;
      }
      
      if (rootRef.current.contains(e.target as Node)) {
        return;
      }
      
      setIsOpen(false);
    };
    
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const open = () => {
    if (disabled) {
      return;
    }

    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  // Helper function to compare values (handles objects)
  const isValueEqual = useCallback((a: SelectValue, b: SelectValue): boolean => {
    // Use custom comparator if provided
    if (compareValue) {
      return compareValue(a, b);
    }

    // Default comparison logic
    if (a === b) {
      return true;
    }

    if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    return false;
  }, [compareValue]);

  const toggleValue = useCallback((optValue: SelectValue, optDisabled?: boolean) => {
    if (optDisabled) {
      return;
    }

    const commitChange = (next: SelectValue | SelectValue[]) => {
      if (!isControlled) {
        setInternalValue(next);
      }

      onChange?.(next);
    };

    if (multiple) {
      const current = Array.isArray(selectedValue) ? selectedValue : [];
      const exists = current.some(v => isValueEqual(v, optValue));
      const next = exists ? current.filter(v => !isValueEqual(v, optValue)) : [...current, optValue];

      commitChange(next);
    } else {
      const next = optValue;

      commitChange(next);
      close();
    }
  }, [
    multiple,
    selectedValue,
    onChange,
    isControlled,
    isValueEqual
  ]);

  const isSelected = useCallback((optValue: SelectValue) => {
    if (multiple) {
      return Array.isArray(selectedValue) && selectedValue.some(v => isValueEqual(v, optValue));
    }

    return selectedValue !== undefined && isValueEqual(selectedValue as SelectValue, optValue);
  }, [multiple, selectedValue, isValueEqual]);

  // Extract display value from selected options
  const displayValue = useMemo(() => {
    const extractValueFromChildren = (children: ReactNode): string[] => {
      const values: string[] = [];
      
      Children.forEach(children, (child) => {
        if (isValidElement(child) && child.type === SelectOption) {
          const optValue = child.props.value;
          
          if (isSelected(optValue)) {
            const label = typeof child.props.children === "string" ? child.props.children : String(optValue);
            values.push(label);
          }
        }
      });
      
      return values;
    };

    const selectedLabels = extractValueFromChildren(children);
    
    if (multiple) {
      return selectedLabels.length > 0 ? selectedLabels.join(", ") : "";
    }
    
    return selectedLabels[0] || "";
  }, [children, multiple, isSelected]);

  const classes = [
    "select",
    `select--${size}`,
    isOpen && "select--open",
    disabled && "select--disabled",
    multiple && "select--multiple",
    fullWidth && "select--full-width",
    className?.trim() || null
  ].filter(Boolean).join(" ");

  const hasValue = Boolean(displayValue);

  const contextValue = useMemo(() => ({
    selectedValue,
    multiple,
    toggleValue,
    isSelected
  }), [
    selectedValue,
    multiple,
    toggleValue,
    isSelected
  ]);

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        className={classes}
        style={{ ...style, ...resolveSx(theme, sx) }}
        {...props}
      >
        <button
          type="button"
          className="select__trigger"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          disabled={disabled}
          onClick={isOpen ? close : open}
        >
          <span className="select__value">
            {
              hasValue &&
              <span className="select__valueText">
                {displayValue}
              </span>
            }

            {
              !hasValue &&
              <span className="select__placeholder">{placeholder}</span>
            }
          </span>

          <span className="select__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f">
              <path d="M480-360 280-560h400L480-360Z"/>
            </svg>
          </span>
        </button>

        {
          isOpen &&
          <div
            className="select__popover"
            role="listbox"
            id={listboxId}
            tabIndex={-1}
          >
            {
              loading &&
              <div className="select__option select__option--disabled">Loading…</div>
            }

            {
              !loading &&
              <ul className="select__list">
                {children}
              </ul>
            }
          </div>
        }
      </div>
    </SelectContext.Provider>
  );
};
