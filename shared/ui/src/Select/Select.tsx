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
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [typeahead, setTypeahead] = useState("");
  const typeaheadTimeoutRef = useRef<number | null>(null);
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
      setHighlightIndex(-1);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => () => {
    if (typeaheadTimeoutRef.current) {
      window.clearTimeout(typeaheadTimeoutRef.current);
    }
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
    const firstEnabled = normalizedOptions.findIndex(o => !o.disabled);
    setHighlightIndex(firstEnabled);
  };

  const close = () => {
    setIsOpen(false);
    setHighlightIndex(-1);
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

  const moveHighlight = (delta: number) => {
    if (!normalizedOptions.length) {
      return;
    }
    let idx = highlightIndex;
    let tries = 0;
    do {
      idx = (idx + delta + normalizedOptions.length) % normalizedOptions.length;
      tries += 1;
      if (tries > normalizedOptions.length) {
        break;
      }
    } while (normalizedOptions[idx]?.disabled);
    setHighlightIndex(idx);
  };

  const handleTypeahead = (char: string) => {
    const next = (typeahead + char).toLowerCase();
    setTypeahead(next);
    if (typeaheadTimeoutRef.current) {
      window.clearTimeout(typeaheadTimeoutRef.current);
    }
    typeaheadTimeoutRef.current = window.setTimeout(() => setTypeahead(""), 500);

    const matchIdx = normalizedOptions.findIndex(o => !o.disabled && o.label.toLowerCase().startsWith(next));
    if (matchIdx >= 0) {
      setHighlightIndex(matchIdx);
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }
    const { key } = e;
    if (key === "ArrowDown" || key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen) {
        open();
      } else {
        moveHighlight(key === "ArrowDown" ? 1 : -1);
      }
      return;
    }
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      if (!isOpen) {
        open();
      } else if (highlightIndex >= 0) {
        const opt = normalizedOptions[highlightIndex];
        if (opt) {
          toggleValue(opt);
        }
      }
      return;
    }
    if (key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (key.length === 1 && /\S/.test(key)) {
      handleTypeahead(key);
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;
    if (key === "ArrowDown" || key === "ArrowUp") {
      e.preventDefault();
      moveHighlight(key === "ArrowDown" ? 1 : -1);
      return;
    }
    if (key === "Enter" || key === " ") {
      e.preventDefault();
      const opt = normalizedOptions[highlightIndex];
      if (opt) {
        toggleValue(opt);
      }
      return;
    }
    if (key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (key === "Tab") {
      close();
      return;
    }
    if (key.length === 1 && /\S/.test(key)) {
      handleTypeahead(key);
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
    className
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
        onKeyDown={onTriggerKeyDown}
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
          onKeyDown={onListKeyDown}
        >
          {loading && (
            <div className="select__option select__option--disabled">Loading…</div>
          )}

          {!loading && normalizedOptions.length === 0 && (
            <div className="select__option select__option--disabled">No options</div>
          )}

          {!loading && normalizedOptions.length > 0 && (
            <ul className="select__list">
              {normalizedOptions.map((opt, idx) => (
                <li
                  key={String(opt.value)}
                  role="option"
                  aria-selected={isSelected(opt)}
                  className={[
                    "select__option",
                    opt.disabled && "select__option--disabled",
                    isSelected(opt) && "select__option--selected",
                    idx === highlightIndex && "select__option--highlighted"
                  ].filter(Boolean).join(" ")}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onMouseDown={(e) => { e.preventDefault(); }}
                  onClick={() => toggleValue(opt)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
