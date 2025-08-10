import { useEffect, useMemo, useRef, useState } from "react";
import "./Select.scss";

/**
 * Headless-ish Select with custom popover and keyboard/type-ahead support.
 *
 * Supports single and multiple selection, controlled and uncontrolled modes,
 * and async-friendly updates (render while loading with dynamic options).
 *
 * @param {object} props
 * @param {{ label: string, value: string | number, disabled?: boolean }[]} props.options - Option list.
 * @param {string|number|Array<string|number>} [props.value] - Controlled value(s).
 * @param {string|number|Array<string|number>} [props.defaultValue] - Default value(s) for uncontrolled.
 * @param {(nextValue: any) => void} [props.onChange] - Change callback; single returns value, multiple returns array of values.
 * @param {boolean} [props.multiple=false] - Enable multiple selection.
 * @param {boolean} [props.disabled=false] - Disable interactions.
 * @param {boolean} [props.loading=false] - Show loading state in popover.
 * @param {string} [props.placeholder='Select…'] - Placeholder when no value.
 * @param {('small'|'medium'|'large')} [props.size='medium'] - Size variant.
 * @param {boolean} [props.fullWidth=false] - Stretch to container width.
 * @param {string} [props.className] - Additional class names.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element}
 */
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
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue ?? (multiple ? [] : undefined));
  const selectedValue = isControlled ? value : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [typeahead, setTypeahead] = useState("");
  const typeaheadTimeoutRef = useRef(null);
  const rootRef = useRef(null);
  const listboxId = useRef(`select-listbox-${Math.random().toString(36).slice(2)}`).current;

  const normalizedOptions = useMemo(
    () => options.map((opt, idx) => ({ ...opt, __index: idx })),
    [options]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!rootRef.current) {
        return;
      }
      if (rootRef.current.contains(e.target)) {
        return;
      }
      setIsOpen(false);
      setHighlightIndex(-1);
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (typeaheadTimeoutRef.current) {
        clearTimeout(typeaheadTimeoutRef.current);
      }
    };
  }, []);

  const selectedLabels = useMemo(() => {
    const getLabelByValue = (val) => {
      const opt = normalizedOptions.find(o => o.value === val);
      return opt ? opt.label : "";
    };

    if (multiple) {
      const arr = Array.isArray(selectedValue) ? selectedValue : [];

      return arr.map(getLabelByValue).filter(Boolean);
    }

    return selectedValue != null ? getLabelByValue(selectedValue) : "";
  }, [multiple, selectedValue, normalizedOptions]);

  const open = () => {
    if (disabled) {
      return;
    }
    setIsOpen(true);
    // Ensure a valid highlight
    const firstEnabled = normalizedOptions.findIndex(o => !o.disabled);
    setHighlightIndex(firstEnabled);
  };

  const close = () => {
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const commitChange = (next) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    if (onChange) {
      onChange(next);
    }
  };

  const toggleValue = (opt) => {
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

  const moveHighlight = (delta) => {
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

  const handleTypeahead = (char) => {
    const next = (typeahead + char).toLowerCase();
    setTypeahead(next);
    if (typeaheadTimeoutRef.current) {
      clearTimeout(typeaheadTimeoutRef.current);
    }
    typeaheadTimeoutRef.current = setTimeout(() => setTypeahead(""), 500);

    const matchIdx = normalizedOptions.findIndex(o => !o.disabled && o.label.toLowerCase().startsWith(next));
    if (matchIdx >= 0) {
      setHighlightIndex(matchIdx);
      if (!isOpen) {
        setIsOpen(true);
      }
    }
  };

  const onTriggerKeyDown = (e) => {
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

  const onListKeyDown = (e) => {
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

  const isSelected = (opt) => {
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
          {
            (multiple ? selectedLabels.length > 0 : Boolean(selectedLabels)) &&
            <span className="select__valueText">
              {multiple ? selectedLabels.join(", ") : selectedLabels}
            </span>
          }

          {
            (multiple ? selectedLabels.length === 0 : !selectedLabels) &&
            <span className="select__placeholder">{placeholder}</span>
          }
        </span>
        <span className="select__icon" aria-hidden>
          ▾
        </span>
      </button>

      {
        isOpen &&
        <div
          className="select__popover"
          role="listbox"
          id={listboxId}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
        >
          {
            loading &&
            <div className="select__option select__option--disabled">Loading…</div>
          }

          {
            !loading && normalizedOptions.length === 0 &&
            <div className="select__option select__option--disabled">No options</div>
          }

          {
            !loading && normalizedOptions.length > 0 &&
            <ul className="select__list">
              {
                normalizedOptions.map((opt, idx) =>
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected(opt)}
                    className={[
                      "select__option",
                      opt.disabled && "select__option--disabled",
                      isSelected(opt) && "select__option--selected",
                      idx === highlightIndex && "select__option--highlighted"
                    ].filter(Boolean).join(" ")}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onMouseDown={(e) => {
                      // prevent blur before click
                      e.preventDefault();
                    }}
                    onClick={() => toggleValue(opt)}
                  >
                    {opt.label}
                  </li>
                )
              }
            </ul>
          }
        </div>
      }
    </div>
  );
};
