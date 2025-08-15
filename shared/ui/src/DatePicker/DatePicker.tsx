import { forwardRef, useId, useState, useRef, useEffect } from "react";
import dayjs, { type Dayjs } from "dayjs";
import "./DatePicker.scss";

export type DatePickerVariant = "outlined" | "filled";
export type DatePickerSize = "small" | "medium" | "large";

export interface DatePickerProps {
  label?: string;
  value?: Date | Dayjs | null;
  defaultValue?: Date | Dayjs | null;
  onChange?: (date: Dayjs | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  dateFormat?: string;
}

const MONTHS = [
  "January",
  "February", 
  "March", 
  "April", 
  "May", 
  "June",
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];

const DAYS = [
  "Sun", 
  "Mon", 
  "Tue", 
  "Wed", 
  "Thu", 
  "Fri", 
  "Sat"
];

const toDayjs = (date: Date | Dayjs | null): Dayjs | null => {
  if (!date) {
    return null;
  }

  return dayjs.isDayjs(date) ? date : dayjs(date);
};

const formatDate = (date: Date | Dayjs | null, format: string = "MM/DD/YYYY"): string => {
  const dayjsDate = toDayjs(date);

  return dayjsDate ? dayjsDate.format(format) : "";
};

const parseDate = (dateString: string, format: string = "MM/DD/YYYY"): Dayjs | null => {
  if (!dateString) {
    return null;
  }
  
  const parsed = dayjs(dateString, format, true);

  return parsed.isValid() ? parsed : null;
};

const isSameDay = (date1: Date | Dayjs | null, date2: Date | Dayjs | null): boolean => {
  const day1 = toDayjs(date1);
  const day2 = toDayjs(date2);
  
  if (!day1 || !day2) {
    return false;
  }

  return day1.isSame(day2, "day");
};

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker({
    label,
    placeholder = "MM/DD/YYYY",
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    variant = "outlined",
    size = "medium",
    error = false,
    helperText,
    disabled = false,
    required = false,
    fullWidth = false,
    name,
    className = "",
    dateFormat = "MM/DD/YYYY",
    ...props
  }, ref) {
    const initialValue = toDayjs(value || defaultValue || null);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(formatDate(initialValue, dateFormat));
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(initialValue);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    const reactId = useId();
    const inputId = `datepicker-${reactId}`;
    const helperId = helperText ? `${inputId}-helper-text` : undefined;

    const classes = [
      "datepicker",
      `datepicker--${variant}`,
      `datepicker--${size}`,
      error && "datepicker--error",
      disabled && "datepicker--disabled",
      fullWidth && "datepicker--full-width",
      isOpen && "datepicker--open",
      className?.trim() || null
    ].filter(Boolean).join(" ");

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
      }
    }, [isOpen]);

    useEffect(() => {
      const newValue = toDayjs(value || null);
      setInputValue(formatDate(newValue, dateFormat));
      setSelectedDate(newValue);
      
      if (newValue) {
        setCurrentMonth(newValue.startOf("month"));
      }
    }, [value, dateFormat]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      
      const parsedDate = parseDate(newValue, dateFormat);
      
      if (parsedDate) {
        setSelectedDate(parsedDate);
        setCurrentMonth(parsedDate.startOf("month"));
        onChange?.(parsedDate);
      } else if (newValue === "") {
        setSelectedDate(null);
        onChange?.(null);
      }
    };

    const handleInputClick = () => {
      if (!disabled) {
        setIsOpen(true);
      }
    };

    const handleDateSelect = (date: Dayjs) => {
      setSelectedDate(date);
      setInputValue(formatDate(date, dateFormat));
      onChange?.(date);
      setIsOpen(false);
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(!isOpen);
      } else if (e.key === "ArrowDown" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    return (
      <div className={classes} ref={containerRef}>
        {
          label &&
          <label className="datepicker__label" htmlFor={inputId}>
            {label}
            {
              required &&
              <span className="datepicker__required" aria-hidden> *</span>
            }
          </label>
        }

        <DatePickerInput
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            (inputRef as any).current = node;
          }}
          inputId={inputId}
          placeholder={placeholder}
          inputValue={inputValue}
          disabled={disabled}
          required={required}
          error={error}
          helperId={helperId}
          isOpen={isOpen}
          onInputChange={handleInputChange}
          onInputClick={handleInputClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          name={name}
          {...props}
        />

        {
          isOpen &&
          <CalendarPopup
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            disabled={disabled}
            onDateSelect={handleDateSelect}
            onPrevMonth={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
            onNextMonth={() => setCurrentMonth(currentMonth.add(1, "month"))}
          />
        }

        {
          helperText &&
          <div className="datepicker__helper-text" id={helperId}>
            {helperText}
          </div>
        }
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

interface DatePickerInputProps {
  inputId: string;
  placeholder: string;
  inputValue: string;
  disabled: boolean;
  required: boolean;
  error: boolean;
  helperId?: string;
  isOpen: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputClick: () => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown: (e: React.KeyboardEvent) => void;
  name?: string;
}

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  function DatePickerInput({
    inputId,
    placeholder,
    inputValue,
    disabled,
    required,
    error,
    helperId,
    isOpen,
    onInputChange,
    onInputClick,
    onFocus,
    onBlur,
    onKeyDown,
    name,
    ...props
  }, ref) {
    return (
      <div className="datepicker__input-container">
        <input
          ref={ref}
          className="datepicker__input"
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={onInputChange}
          onClick={onInputClick}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          id={inputId}
          name={name}
          disabled={disabled}
          required={required}
          aria-invalid={error || undefined}
          aria-describedby={helperId}
          aria-required={required || undefined}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          autoComplete="off"
          {...props}
        />
        
        <button
          type="button"
          className="datepicker__toggle"
          onClick={onInputClick}
          disabled={disabled}
          aria-label="Open calendar"
          tabIndex={-1}
        >
          <CalendarIcon />
        </button>
      </div>
    );
  }
);

interface CalendarPopupProps {
  currentMonth: Dayjs;
  selectedDate: Dayjs | null;
  disabled: boolean;
  onDateSelect: (date: Dayjs) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarPopup({
  currentMonth,
  selectedDate,
  disabled,
  onDateSelect,
  onPrevMonth,
  onNextMonth
}: CalendarPopupProps) {
  return (
    <div className="datepicker__popup">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />

      <div className="datepicker__days-header">
        {
          DAYS.map(day =>
            <div key={day} className="datepicker__day-name">
              {day}
            </div>
          )
        }
      </div>

      <CalendarGrid
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        disabled={disabled}
        onDateSelect={onDateSelect}
      />
    </div>
  );
}

interface CalendarHeaderProps {
  currentMonth: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

function CalendarHeader({ currentMonth, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  return (
    <div className="datepicker__header">
      <button
        type="button"
        className="datepicker__nav-button"
        onClick={onPrevMonth}
        aria-label="Previous month"
      >
        <PrevIcon />
      </button>
      
      <h3 className="datepicker__month-year">
        {MONTHS[currentMonth.month()]} {currentMonth.year()}
      </h3>
      
      <button
        type="button"
        className="datepicker__nav-button"
        onClick={onNextMonth}
        aria-label="Next month"
      >
        <NextIcon />
      </button>
    </div>
  );
}

interface CalendarGridProps {
  currentMonth: Dayjs;
  selectedDate: Dayjs | null;
  disabled: boolean;
  onDateSelect: (date: Dayjs) => void;
}

function CalendarGrid({ currentMonth, selectedDate, disabled, onDateSelect }: CalendarGridProps) {
  const startOfMonth = currentMonth.startOf("month");
  const startOfCalendar = startOfMonth.startOf("week");
  const today = dayjs();

  const days = [];
  
  for (let i = 0; i < 42; i++) {
    const date = startOfCalendar.add(i, "day");
    
    days.push(
      <CalendarDay
        key={date.format("YYYY-MM-DD")}
        date={date}
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        today={today}
        disabled={disabled}
        onDateSelect={onDateSelect}
      />
    );
  }

  return (
    <div className="datepicker__days">
      {days}
    </div>
  );
}

interface CalendarDayProps {
  date: Dayjs;
  currentMonth: Dayjs;
  selectedDate: Dayjs | null;
  today: Dayjs;
  disabled: boolean;
  onDateSelect: (date: Dayjs) => void;
}

function CalendarDay({
  date,
  currentMonth,
  selectedDate,
  today,
  disabled,
  onDateSelect
}: CalendarDayProps) {
  const isCurrentMonth = date.month() === currentMonth.month();
  const isSelected = isSameDay(date, selectedDate);
  const isToday = date.isSame(today, "day");

  const dayClasses = [
    "datepicker__day",
    !isCurrentMonth && "datepicker__day--other-month",
    isSelected && "datepicker__day--selected",
    isToday && "datepicker__day--today"
  ].filter(Boolean).join(" ");

  return (
    <button
      type="button"
      className={dayClasses}
      onClick={() => onDateSelect(date)}
      disabled={disabled}
    >
      {date.date()}
    </button>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        stroke="currentColor" 
        strokeWidth="1.5" 
        /* eslint-disable-next-line */
        d="M2 12c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14z"
      />
      <path 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeWidth="1.5" 
        d="M7 4V2.5M17 4V2.5M2.5 9h19"
      />
      <path 
        fill="currentColor" 
        d={
          "M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0" +
          "m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
        }
      />
    </svg>
  );
}

function PrevIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        /* eslint-disable-next-line */
        d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176M14.03 8.47a.75.75 0 0 1 0 1.06L11.56 12l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0"
        clipRule="evenodd"
      />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        fill="currentColor" 
        fillRule="evenodd" 
        /* eslint-disable-next-line */
        d="M11.943 1.25h.114c2.309 0 4.118 0 5.53.19c1.444.194 2.584.6 3.479 1.494c.895.895 1.3 2.035 1.494 3.48c.19 1.411.19 3.22.19 5.529v.114c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m-5.33 1.676c-1.278.172-2.049.5-2.618 1.069c-.57.57-.897 1.34-1.069 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386s-.002-4.086-.176-5.386c-.172-1.279-.5-2.05-1.069-2.62c-.57-.569-1.34-.896-2.619-1.068c-1.3-.174-3.008-.176-5.386-.176s-4.086.002-5.386.176M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06"
        clipRule="evenodd"
      />
    </svg>
  );
}
