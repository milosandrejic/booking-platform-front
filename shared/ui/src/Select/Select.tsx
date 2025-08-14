"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./Select.scss";

export type SelectSize = "small" | "medium" | "large";
export type SelectValue = string | number;

export interface Option {
  label: string;
  value: SelectValue;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "value" | "onChange"
> {
  options: Option[];
  value?: SelectValue | SelectValue[];
  defaultValue?: SelectValue | SelectValue[];
  onChange?: (next: SelectValue | SelectValue[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  loading?: boolean;
  placeholder?: string;
  size?: SelectSize;
  fullWidth?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Select = ({
  options = [],
  value,
  defaultValue,
  onChange,
  multiple = false,
  disabled = false,
  loading = false,
  placeholder = "Select…",
  size = "medium",
  fullWidth = false,
  className = "",
  style = {},
  ...props
}: SelectProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<SelectValue | SelectValue[] | undefined>(
    defaultValue ?? (multiple ? [] : undefined)
  );
  const selectedValue = isControlled ? value! : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listboxId = useRef(`select-listbox-${Math.random().toString(36).slice(2)}`).current;

  const normalizedOptions = useMemo(
    () => options.map((opt, idx) => ({ ...opt, __index: idx } as Option & { __index: number })),
    [options]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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

  const selectedLabels = useMemo(() => {
    const getLabelByValue = (val: SelectValue) => {
      const opt = normalizedOptions.find(o => o.value === val);
      return opt ? opt.label : "";
    };

    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : [];
      return arr.map(getLabelByValue).filter(Boolean);
    }

    return (selectedValue != null && !Array.isArray(selectedValue)) ? getLabelByValue(selectedValue) : "";
  }, [multiple, selectedValue, normalizedOptions]);

  const open = () => {
    if (disabled) {
      return;
    }
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const commitChange = (next: SelectValue | SelectValue[]) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const toggleValue = (opt: Option) => {
    if (opt.disabled) {
      return;
    }
    if (multiple) {
      const current = Array.isArray(selectedValue) ? selectedValue : [];
      const exists = current.includes(opt.value);
      const next = exists ? current.filter(v => v !== opt.value) : [...current, opt.value];
      commitChange(next);
    } else {
      const next = opt.value;
      commitChange(next);
      close();
    }
  };

  const isSelected = (opt: Option) => {
    if (multiple) {
      return Array.isArray(selectedValue) && selectedValue.includes(opt.value);
    }
    return selectedValue === opt.value;
  };

  const classes = [
    "select",
    `select--${size}`,
    isOpen && "select--open",
    disabled && "select--disabled",
    multiple && "select--multiple",
    fullWidth && "select--full-width",
    className?.trim() || null
  ].filter(Boolean).join(" ");

  return (
    <div
      ref={rootRef}
      className={classes}
      style={style}
      {...props}
    >
      <button
        type="button"
        className="select__trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        disabled={disabled}
        onClick={() => (isOpen ? close() : open())}
      >
        <span className="select__value">
          {(multiple ? (selectedLabels as string[]).length > 0 : Boolean(selectedLabels)) && (
            <span className="select__valueText">
              {multiple ? (selectedLabels as string[]).join(", ") : (selectedLabels as string)}
            </span>
          )}
          {(multiple ? (selectedLabels as string[]).length === 0 : !selectedLabels) && (
            <span className="select__placeholder">{placeholder}</span>
          )}
        </span>
        <span className="select__icon" aria-hidden>
          ▾
        </span>
      </button>

      {isOpen && (
        <div
          className="select__popover"
          role="listbox"
          id={listboxId}
          tabIndex={-1}
        >
          {loading && (
            <div className="select__option select__option--disabled">Loading…</div>
          )}

          {!loading && normalizedOptions.length === 0 && (
            <div className="select__option select__option--disabled">No options</div>
          )}

          {!loading && normalizedOptions.length > 0 && (
            <ul className="select__list">
              {normalizedOptions.map((opt) => {
                const optionClasses =
                  "select__option" +
                  (opt.disabled ? " select__option--disabled" : "") +
                  (isSelected(opt) ? " select__option--selected" : "");

                return (
                  <li
                    key={String(opt.value)}
                    role="option"
                    aria-selected={isSelected(opt)}
                    className={optionClasses}
                    onMouseDown={(e) => { e.preventDefault(); }}
                    onClick={() => toggleValue(opt)}
                  >
                    {opt.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
