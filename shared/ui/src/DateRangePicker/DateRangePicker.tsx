"use client";

import { forwardRef, useId, useState, useRef, useEffect } from "react";
import dayjs, { type Dayjs } from "dayjs";
import "./DateRangePicker.scss";

export type DateRangePickerVariant = "outlined" | "filled";
export type DateRangePickerSize = "small" | "medium" | "large";

export interface DateRange {
  start: Dayjs | null;
  end: Dayjs | null;
}

export interface DateRangePickerProps {
  label?: string;
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onChange?: (dateRange: DateRange | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  variant?: DateRangePickerVariant;
  size?: DateRangePickerSize;
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
  separator?: string;
  shouldDisableDate?: (date: Dayjs) => boolean;
  maxSelectedRange?: number;
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
  "S", 
  "M", 
  "T", 
  "W", 
  "T", 
  "F",
  "S"
];

const formatDateRange = (dateRange: DateRange | null, format: string, separator: string): string => {
  if (!dateRange || (!dateRange.start && !dateRange.end)) {
    return "";
  }

  const startStr = dateRange.start ? dateRange.start.format(format) : "";
  const endStr = dateRange.end ? dateRange.end.format(format) : "";

  if (startStr && endStr) {
    return `${startStr} ${separator} ${endStr}`;
  }
  
  if (startStr) {
    return startStr;
  }
  
  return endStr;
};

export const DateRangePicker = forwardRef<HTMLInputElement, DateRangePickerProps>(
  (
    {
      label,
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
      className,
      style,
      placeholder = "Select date range...",
      dateFormat = "DD/MM/YYYY",
      separator = "—",
      shouldDisableDate,
      maxSelectedRange,
      ...props
    },
    ref
  ) => {
    const inputId = useId();
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
    const [selectionState, setSelectionState] = useState<"start" | "end" | null>(null);
    const [hoveredDate, setHoveredDate] = useState<Dayjs | null>(null);
    const [internalValue, setInternalValue] = useState<DateRange | null>(defaultValue || null);
    const inputRef = useRef<HTMLInputElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Use controlled value if provided, otherwise use internal state
    const dateRange = value !== undefined ? value : internalValue;

    // Helper to update both internal state and call onChange
    const updateDateRange = (newRange: DateRange | null) => {
      if (value === undefined) {
        // Uncontrolled mode: update internal state
        setInternalValue(newRange);
      }
      // Always call onChange for both controlled and uncontrolled
      onChange?.(newRange);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const isClickOutside =
          popupRef.current &&
          !popupRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node);

        if (isClickOutside) {
          setIsOpen(false);
          setSelectionState(null);
          setHoveredDate(null);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleInputClick = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSelectionState(null);
        setHoveredDate(null);
        
        if (dateRange?.start) {
          setCurrentMonth(dateRange.start.startOf("month"));
        }
      }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      
      if (!inputValue) {
        updateDateRange(null);
        return;
      }

      const parts = inputValue.split(separator).map(part => part.trim());
      
      if (parts.length === 2) {
        const startDate = dayjs(parts[0], dateFormat, true);
        const endDate = dayjs(parts[1], dateFormat, true);
        
        if (startDate.isValid() && endDate.isValid()) {
          const newRange: DateRange = {
            start: startDate,
            end: endDate
          };
          updateDateRange(newRange);
          setCurrentMonth(startDate.startOf("month"));
        }
      }
    };

    const handleDateSelect = (date: Dayjs) => {
      if (!dateRange?.start || (dateRange.start && dateRange.end)) {
        // Start new selection
        const newRange: DateRange = { start: date, end: null };
        updateDateRange(newRange);
        setSelectionState("end");
        setHoveredDate(null);
      } else if (dateRange.start && !dateRange.end) {
        // Complete the range
        const start = dateRange.start;
        const end = date;
        
        // Check max range if specified
        if (maxSelectedRange) {
          const daysDiff = Math.abs(end.diff(start, "day")) + 1;
          if (daysDiff > maxSelectedRange) {
            // Range exceeds maximum, don't select
            return;
          }
        }
        
        const finalRange: DateRange = {
          start: start.isBefore(end) ? start : end,
          end: start.isBefore(end) ? end : start
        };
        
        updateDateRange(finalRange);
        setIsOpen(false);
        setSelectionState(null);
        setHoveredDate(null);
      }
    };

    const handleDateHover = (date: Dayjs | null) => {
      if (selectionState === "end" && dateRange?.start && !dateRange?.end) {
        setHoveredDate(date);
      }
    };

    const displayValue = formatDateRange(dateRange, dateFormat, separator);

    const classes = [
      "daterangepicker",
      `daterangepicker--${variant}`,
      `daterangepicker--${size}`,
      error && "daterangepicker--error",
      disabled && "daterangepicker--disabled",
      fullWidth && "daterangepicker--full-width",
      className
    ].filter(Boolean).join(" ");

    return (
      <div className={classes} style={style}>
        <DateRangePickerInput
          ref={ref || inputRef}
          id={inputId}
          name={name}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          label={label}
          isOpen={isOpen}
          onClick={handleInputClick}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          {...props}
        />
        
        {
          isOpen &&
          <CalendarPopup
            ref={popupRef}
            currentMonth={currentMonth}
            selectedRange={dateRange}
            hoveredDate={hoveredDate}
            onDateSelect={handleDateSelect}
            onDateHover={handleDateHover}
            onMonthChange={setCurrentMonth}
            disabled={disabled}
            isSelectingEnd={selectionState === "end"}
            shouldDisableDate={shouldDisableDate}
            maxSelectedRange={maxSelectedRange}
          />
        }

        {
          helperText &&
          <div className="daterangepicker__helper-text">
            {helperText}
          </div>
        }
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

interface DateRangePickerInputProps {
  id: string;
  name?: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
  label?: string;
  isOpen: boolean;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

const DateRangePickerInput = forwardRef<HTMLInputElement, DateRangePickerInputProps>(
  ({ id, name, value, placeholder, disabled, required, label, isOpen, onClick, onChange, onBlur, onFocus }, ref) => {
    return (
      <div className="daterangepicker__input-container">
        {
          label &&
          <label
            htmlFor={id}
            className="daterangepicker__label"
          >
            {label}
            {
              required &&
              <span className="daterangepicker__required">*</span>
            }
          </label>
        }
        
        <div className="daterangepicker__input-wrapper">
          <input
            ref={ref}
            id={id}
            name={name}
            type="text"
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className="daterangepicker__input"
            onClick={onClick}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            role="combobox"
            readOnly
          />
          <CalendarIcon />
        </div>
      </div>
    );
  }
);

DateRangePickerInput.displayName = "DateRangePickerInput";

interface CalendarPopupProps {
  currentMonth: Dayjs;
  selectedRange: DateRange | null;
  hoveredDate: Dayjs | null;
  onDateSelect: (date: Dayjs) => void;
  onDateHover: (date: Dayjs | null) => void;
  onMonthChange: (month: Dayjs) => void;
  disabled: boolean;
  isSelectingEnd: boolean;
  shouldDisableDate?: (date: Dayjs) => boolean;
  maxSelectedRange?: number;
}

const CalendarPopup = forwardRef<HTMLDivElement, CalendarPopupProps>(
  (
    { 
      currentMonth, 
      selectedRange, 
      hoveredDate, 
      onDateSelect, 
      onDateHover, 
      onMonthChange, 
      disabled, 
      isSelectingEnd, 
      shouldDisableDate, 
      maxSelectedRange 
    }, 
    ref
  ) => {
    const nextMonth = currentMonth.add(1, "month");

    return (
      <div
        ref={ref}
        className="daterangepicker__popup"
        role="dialog"
        aria-modal="false"
        aria-label="Date range picker"
      >
        <div className="daterangepicker__months">
          {/* First Month */}
          <div className="daterangepicker__month">
            <CalendarHeader
              currentMonth={currentMonth}
              onMonthChange={onMonthChange}
              disabled={disabled}
              showNavigation="prev"
            />
            
            <div className="daterangepicker__days-header">
              {
                DAYS.map((day, index) =>
                  <div
                    key={index}
                    className="daterangepicker__day-header"
                  >
                    {day}
                  </div>
                )
              }
            </div>
            
            <CalendarGrid
              currentMonth={currentMonth}
              selectedRange={selectedRange}
              hoveredDate={hoveredDate}
              disabled={disabled}
              onDateSelect={onDateSelect}
              onDateHover={onDateHover}
              isSelectingEnd={isSelectingEnd}
              shouldDisableDate={shouldDisableDate}
              maxSelectedRange={maxSelectedRange}
            />
          </div>

          {/* Second Month */}
          <div className="daterangepicker__month">
            <CalendarHeader
              currentMonth={nextMonth}
              onMonthChange={month => onMonthChange(month.subtract(1, "month"))}
              disabled={disabled}
              showNavigation="next"
            />
            
            <div className="daterangepicker__days-header">
              {
                DAYS.map((day, index) =>
                  <div
                    key={index}
                    className="daterangepicker__day-header"
                  >
                    {day}
                  </div>
                )
              }
            </div>
            
            <CalendarGrid
              currentMonth={nextMonth}
              selectedRange={selectedRange}
              hoveredDate={hoveredDate}
              disabled={disabled}
              onDateSelect={onDateSelect}
              onDateHover={onDateHover}
              isSelectingEnd={isSelectingEnd}
              shouldDisableDate={shouldDisableDate}
              maxSelectedRange={maxSelectedRange}
            />
          </div>
        </div>
      </div>
    );
  }
);

CalendarPopup.displayName = "CalendarPopup";

interface CalendarHeaderProps {
  currentMonth: Dayjs;
  onMonthChange: (month: Dayjs) => void;
  disabled: boolean;
  showNavigation?: "prev" | "next" | "both";
}

function CalendarHeader({ currentMonth, onMonthChange, disabled, showNavigation = "both" }: CalendarHeaderProps) {
  const handlePrevMonth = () => {
    if (!disabled) {
      onMonthChange(currentMonth.subtract(1, "month"));
    }
  };

  const handleNextMonth = () => {
    if (!disabled) {
      onMonthChange(currentMonth.add(1, "month"));
    }
  };

  return (
    <div className="daterangepicker__header">
      {
        (showNavigation === "prev" || showNavigation === "both") &&
        <button
          type="button"
          className="daterangepicker__nav-button"
          onClick={handlePrevMonth}
          disabled={disabled}
          aria-label="Previous month"
        >
          <PrevIcon />
        </button>
      }
      
      <div className="daterangepicker__month-year">
        {MONTHS[currentMonth.month()]} {currentMonth.year()}
      </div>
      
      {
        (showNavigation === "next" || showNavigation === "both") &&
        <button
          type="button"
          className="daterangepicker__nav-button"
          onClick={handleNextMonth}
          disabled={disabled}
          aria-label="Next month"
        >
          <NextIcon />
        </button>
      }
    </div>
  );
}

interface CalendarGridProps {
  currentMonth: Dayjs;
  selectedRange: DateRange | null;
  hoveredDate: Dayjs | null;
  disabled: boolean;
  onDateSelect: (date: Dayjs) => void;
  onDateHover: (date: Dayjs | null) => void;
  isSelectingEnd: boolean;
  shouldDisableDate?: (date: Dayjs) => boolean;
  maxSelectedRange?: number;
}

function CalendarGrid({ 
  currentMonth, 
  selectedRange, 
  hoveredDate, 
  disabled, 
  onDateSelect, 
  onDateHover, 
  isSelectingEnd, 
  shouldDisableDate, 
  maxSelectedRange 
}: CalendarGridProps) {
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
        selectedRange={selectedRange}
        hoveredDate={hoveredDate}
        today={today}
        disabled={disabled}
        onDateSelect={onDateSelect}
        onDateHover={onDateHover}
        isSelectingEnd={isSelectingEnd}
        shouldDisableDate={shouldDisableDate}
        maxSelectedRange={maxSelectedRange}
      />
    );
  }

  return (
    <div className="daterangepicker__days">
      {days}
    </div>
  );
}

interface CalendarDayProps {
  date: Dayjs;
  currentMonth: Dayjs;
  selectedRange: DateRange | null;
  hoveredDate: Dayjs | null;
  today: Dayjs;
  disabled: boolean;
  onDateSelect: (date: Dayjs) => void;
  onDateHover: (date: Dayjs | null) => void;
  isSelectingEnd: boolean;
  shouldDisableDate?: (date: Dayjs) => boolean;
  maxSelectedRange?: number;
}

function CalendarDay({ 
  date, 
  currentMonth, 
  selectedRange, 
  hoveredDate, 
  today, 
  disabled, 
  onDateSelect, 
  onDateHover, 
  isSelectingEnd, 
  shouldDisableDate, 
  maxSelectedRange 
}: CalendarDayProps) {
  const isCurrentMonth = date.month() === currentMonth.month();
  const isToday = date.isSame(today, "day");
  const isStartDate = selectedRange?.start && date.isSame(selectedRange.start, "day");
  const isEndDate = selectedRange?.end && date.isSame(selectedRange.end, "day");
  
  // Disable dates before start date when selecting end date
  const isDisabledByRange = isSelectingEnd && selectedRange?.start && date.isBefore(selectedRange.start, "day");
  
  // Disable dates based on custom shouldDisableDate function
  const isDisabledByCustom = shouldDisableDate?.(date) ?? false;
  
  // Disable dates that would exceed maxSelectedRange when selecting end date
  const isDisabledByMaxRange = isSelectingEnd && selectedRange?.start && maxSelectedRange && 
    Math.abs(date.diff(selectedRange.start, "day")) >= maxSelectedRange;
  
  const isDateDisabled = disabled || isDisabledByRange || isDisabledByCustom || isDisabledByMaxRange;
  
  // Range highlighting - only show range when both start and end are selected
  const isInRange = selectedRange?.start && selectedRange?.end && 
    date.isAfter(selectedRange.start, "day") && date.isBefore(selectedRange.end, "day");

  // Hover range highlighting - show when start is selected and hovering over a valid end date
  const isInHoverRange = isSelectingEnd && selectedRange?.start && hoveredDate && 
    !selectedRange?.end && date.isAfter(selectedRange.start, "day") && 
    date.isBefore(hoveredDate, "day") &&
    (!maxSelectedRange || Math.abs(hoveredDate.diff(selectedRange.start, "day")) < maxSelectedRange);
  
  // Hover end highlighting - the actual hovered date when selecting end
  const isHoverEnd = isSelectingEnd && selectedRange?.start && hoveredDate && 
    !selectedRange?.end && date.isSame(hoveredDate, "day") &&
    (!maxSelectedRange || Math.abs(hoveredDate.diff(selectedRange.start, "day")) < maxSelectedRange);
  
  const dayClasses = [
    "daterangepicker__day",
    !isCurrentMonth && "daterangepicker__day--other-month",
    isToday && "daterangepicker__day--today",
    isStartDate && "daterangepicker__day--start",
    isEndDate && "daterangepicker__day--end",
    isInRange && "daterangepicker__day--in-range",
    isInHoverRange && "daterangepicker__day--hover-range",
    isHoverEnd && "daterangepicker__day--hover-end",
    isDateDisabled && "daterangepicker__day--disabled"
  ].filter(Boolean).join(" ");

  const handleClick = () => {
    if (!isDateDisabled && isCurrentMonth) {
      onDateSelect(date);
    }
  };

  const handleMouseEnter = () => {
    if (!isDateDisabled && isCurrentMonth) {
      onDateHover(date);
    }
  };

  const handleMouseLeave = () => {
    onDateHover(null);
  };

  return (
    <button
      type="button"
      className={dayClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={isDateDisabled || !isCurrentMonth}
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
        d="M12.057 1.25h-.114c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19m5.33 1.676c1.278.172 2.049.5 2.618 1.069c.57.57.897 1.34 1.069 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62c.57-.569 1.34-.896 2.619-1.068c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176M9.97 8.47a.75.75 0 0 0 0 1.06L12.44 12L9.97 14.47a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0"
        clipRule="evenodd"
      />
    </svg>
  );
}
