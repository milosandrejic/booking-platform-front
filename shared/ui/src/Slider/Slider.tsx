"use client";

import { forwardRef, useCallback, useId, useMemo, useRef, useState } from "react";
import "./Slider.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type SliderSize = "small" | "medium" | "large";
export type SliderColor = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface SliderProps {
  /** Current value for single slider or array for range slider */
  value?: number | [number, number];
  /** Default value for uncontrolled mode */
  defaultValue?: number | [number, number];
  /** Callback fired when the value changes */
  onChange?: (value: number | [number, number], event?: Event) => void;
  /** Callback fired when the user stops dragging */
  onChangeCommitted?: (value: number | [number, number], event?: Event) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment for discrete sliders */
  step?: number | null;
  /** Whether to show value marks */
  marks?: boolean | Array<{ value: number; label?: string }>;
  /** Size variant of the slider */
  size?: SliderSize;
  /** Color theme of the slider */
  color?: SliderColor;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether to show the current value */
  valueLabelDisplay?: "auto" | "on" | "off";
  /** Minimum distance between range thumbs */
  minRange?: number;
  /** Label text for the slider */
  label?: string;
  /** Name attribute for form handling */
  name?: string;
  /** Additional CSS classes */
  className?: string;
  /** ID attribute for the slider */
  id?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** sx styles */
  sx?: SxProps;
  /** ARIA label */
  "aria-label"?: string;
  /** ARIA labelledby */
  "aria-labelledby"?: string;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(props, ref) {
  const {
    value,
    defaultValue = 0,
    onChange,
    onChangeCommitted,
    min = 0,
    max = 100,
    step = 1,
    marks = false,
    size = "medium",
    color = "primary",
    disabled = false,
    valueLabelDisplay = "auto",
    minRange = 0,
    label,
    name,
    className = "",
    id,
    style,
    sx,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    ...restProps
  } = props;
  const theme = useTheme();

  const reactId = useId();
  const sliderId = id || `slider-${reactId}`;
  const sliderRef = useRef<HTMLDivElement>(null);
  // Refs to avoid stale closures during dragging
  const activeThumbRef = useRef<number>(0);
  const valueRef = useRef<number | [number, number]>(value ?? defaultValue);
  
  // Determine if this is a range slider
  const isRange = Array.isArray(value) || Array.isArray(defaultValue);
  
  // Initialize state - controlled/uncontrolled pattern
  const getInitialValue = (): number | [number, number] => {
    if (value !== undefined) {
      return value;
    }

    if (isRange && !Array.isArray(defaultValue)) {
      return [defaultValue as number, defaultValue as number];
    }

    return defaultValue;
  };
  
  const [internalValue, setInternalValue] = useState<number | [number, number]>(getInitialValue);
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number>(0);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  // keep refs in sync with latest values
  activeThumbRef.current = activeThumb;
  valueRef.current = currentValue as number | [number, number];
  
  // Normalize value to always be array for easier processing
  const normalizedValue = useMemo(() => {
    if (Array.isArray(currentValue)) {
      return currentValue;
    }

    return [currentValue, currentValue];
  }, [currentValue]);
  
  const updateValue = useCallback((newValue: number | [number, number], event?: Event) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue, event);
  }, [isControlled, onChange]);
  
  // Clamp value within bounds and to step
  const clampValue = useCallback((val: number) => {
    let clampedVal = Math.max(min, Math.min(max, val));
    
    if (step !== null && step > 0) {
      const steps = Math.round((clampedVal - min) / step);
      clampedVal = min + steps * step;
    }
    
    return clampedVal;
  }, [min, max, step]);
  
  // Convert pixel position to value
  const positionToValue = useCallback((position: number) => {
    if (!sliderRef.current) {
      return min;
    }
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, position / rect.width));
    const val = min + percent * (max - min);
    
    return clampValue(val);
  }, [min, max, clampValue]);
  
  // Convert value to percentage
  const valueToPercent = useCallback((val: number) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);

  // Adjust range with "push" behavior: if active thumb violates minRange,
  // push the other thumb to preserve the minimum distance within [min, max].
  const adjustRangePush = useCallback((range: [number, number], rawVal: number, idx: 0 | 1): [number, number] => {
    let [start, end] = range;
    const val = clampValue(rawVal);

    if (idx === 0) {
      start = val;

      if (start > end - minRange) {
        end = clampValue(start + minRange);

        if (end > max) {
          end = max;
          start = clampValue(end - minRange);
        }
      }
    } else {
      end = val;

      if (end < start + minRange) {
        start = clampValue(end - minRange);

        if (start < min) {
          start = min;
          end = clampValue(start + minRange);
        }
      }
    }

    // Final clamps
    start = Math.max(min, Math.min(max, start));
    end = Math.max(min, Math.min(max, end));

    // If step rounding caused a violation, enforce again preferring the active thumb
    if (end - start < minRange) {
      if (idx === 0) {
        end = Math.min(max, clampValue(start + minRange));
        if (end - start < minRange) {
          start = Math.max(min, clampValue(end - minRange));
        }
      } else {
        start = Math.max(min, clampValue(end - minRange));
        if (end - start < minRange) {
          end = Math.min(max, clampValue(start + minRange));
        }
      }
    }

    return [start, end];
  }, [clampValue,
    min,
    max,
    minRange]);

  const handleThumbKeyDown = useCallback((event: React.KeyboardEvent, thumbIndex?: number) => {
    if (disabled) {
      return;
    }

    const key = event.key;
    const stepSize = step == null || step <= 0 ? 1 : step;
    let nextValue: number | [number, number] | null = null;

    if (isRange && Array.isArray(currentValue)) {
      const idx = (typeof thumbIndex === "number" ? thumbIndex : 0) as 0 | 1;
      const [start, end] = currentValue;
      let target = idx === 0 ? start : end;

      if (key === "ArrowLeft" || key === "ArrowDown") {
        target = clampValue(target - stepSize);
      } else if (key === "ArrowRight" || key === "ArrowUp") {
        target = clampValue(target + stepSize);
      } else if (key === "Home") {
        target = min;
      } else if (key === "End") {
        target = max;
      } else {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      nextValue = adjustRangePush([start, end], target, idx);
    } else {
      let target = (currentValue as number) ?? 0;

      if (key === "ArrowLeft" || key === "ArrowDown") {
        target = clampValue(target - stepSize);
      } else if (key === "ArrowRight" || key === "ArrowUp") {
        target = clampValue(target + stepSize);
      } else if (key === "Home") {
        target = min;
      } else if (key === "End") {
        target = max;
      } else {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      nextValue = target;
    }

    if (nextValue != null) {
      updateValue(nextValue);
    }
  }, [disabled,
    isRange,
    currentValue,
    step,
    clampValue,
    min,
    max,
    updateValue,
    adjustRangePush]);

  const handleMouseDown = useCallback((event: React.MouseEvent, thumbIndex?: number) => {
    if (disabled) {
      return;
    }
    
    event.preventDefault();
    event.stopPropagation();
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    setIsDragging(true);
    const position = event.clientX - rect.left;
    const newVal = positionToValue(position);
    
    if (isRange && Array.isArray(currentValue)) {
      // Determine which thumb to move and lock it for this drag session
      let targetThumbIndex = thumbIndex;

      if (targetThumbIndex === undefined) {
        const [start, end] = currentValue;
        const distanceToStart = Math.abs(newVal - start);
        const distanceToEnd = Math.abs(newVal - end);
        targetThumbIndex = distanceToStart <= distanceToEnd ? 0 : 1;
      }

      setActiveThumb(targetThumbIndex);
      activeThumbRef.current = targetThumbIndex;

      // Apply initial update based on the locked thumb, with push behavior
      const lockedIndex = targetThumbIndex as 0 | 1;
      let rangeFromRef: [number, number];
      if (Array.isArray(valueRef.current)) {
        rangeFromRef = valueRef.current as [number, number];
      } else {
        rangeFromRef = [valueRef.current as number, valueRef.current as number];
      }
      const currentRange = [...rangeFromRef] as [number, number];
      const pushedRange = adjustRangePush(currentRange, newVal, lockedIndex);
      updateValue(pushedRange, event.nativeEvent);
    } else {
      setActiveThumb(0);
      updateValue(newVal, event.nativeEvent);
    }
    
    // Mouse move handler for dragging
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!sliderRef.current) {
        return;
      }
      
      const rect = sliderRef.current.getBoundingClientRect();
      const position = moveEvent.clientX - rect.left;
      const newVal = positionToValue(position);
      
      if (isRange && Array.isArray(valueRef.current)) {
        // Always use the locked thumb index and the latest range from ref
        const currentRange = [...valueRef.current] as [number, number];
        const lockedIndex = (activeThumbRef.current as 0 | 1);
        const pushedRange = adjustRangePush(currentRange, newVal, lockedIndex);
        updateValue(pushedRange);
      } else {
        updateValue(newVal);
      }
    };
    
    // Mouse up handler to end dragging
    const handleMouseUp = (upEvent: MouseEvent) => {
      setIsDragging(false);
      onChangeCommitted?.(currentValue, upEvent);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [disabled,
    isRange,
    currentValue,
    positionToValue,
    updateValue,
    onChangeCommitted,
    adjustRangePush]);

  const handleTrackClick = useCallback((event: React.MouseEvent) => {
    if (disabled || isDragging) {
      return;
    }

    // Prevent clicks on thumbs from bubbling to track
    const target = event.target as HTMLElement;
    if (target.classList.contains("slider__thumb")) {
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const position = event.clientX - rect.left;
    const newVal = positionToValue(position);
    
    if (isRange && Array.isArray(currentValue)) {
      const [start, end] = currentValue;
      const distanceToStart = Math.abs(newVal - start);
      const distanceToEnd = Math.abs(newVal - end);
      
      const newRange = [...currentValue] as [number, number];
      if (distanceToStart <= distanceToEnd) {
        newRange[0] = Math.max(min, Math.min(newVal, newRange[1] - minRange));
        setActiveThumb(0);
      } else {
        newRange[1] = Math.min(max, Math.max(newVal, newRange[0] + minRange));
        setActiveThumb(1);
      }
      
      updateValue(newRange, event.nativeEvent);
      onChangeCommitted?.(newRange, event.nativeEvent);
    } else {
      updateValue(newVal, event.nativeEvent);
      onChangeCommitted?.(newVal, event.nativeEvent);
    }
  }, [
    disabled, 
    isDragging, 
    isRange, 
    currentValue, 
    positionToValue, 
    updateValue, 
    onChangeCommitted,
    min,
    max,
    minRange
  ]);
  
  // Generate marks
  const marksArray = useMemo(() => {
    if (Array.isArray(marks)) {
      return marks;
    }
    
    if (marks) {
      return Array.from({ length: Math.floor((max - min) / (step || 1)) + 1 }, (_, i) => ({
        value: min + i * (step || 1),
      }));
    }
    
    return [];
  }, [marks,
    max,
    min,
    step]);

  // classes
  const classes = [
    "slider",
    `slider--${size}`,
    `slider--${color}`,
    disabled && "slider--disabled",
    isDragging && "slider--dragging",
    isRange && "slider--range",
    className?.trim() || null
  ].filter(Boolean).join(" ");
  
  const getThumbClassName = useCallback((thumbIndex: number, isActive: boolean) => {
    const classes = ["slider__thumb", "slider__thumb--filled"];
    
    if (isActive) {
      classes.push("slider__thumb--active");
    }
    
    if (isDragging) {
      classes.push("slider__thumb--dragging");
    }
    
    return classes.join(" ");
  }, [isDragging]);

  const trackStyle = isRange ? {
    left: `${valueToPercent(normalizedValue[0] || 0)}%`,
    width: `${valueToPercent(normalizedValue[1] || 0) - valueToPercent(normalizedValue[0] || 0)}%`,
  } : {
    width: `${valueToPercent(currentValue as number)}%`,
  };
  
  return (
    <div 
      className={classes}
  style={{ ...style, ...resolveSx(theme, sx) }}
      ref={ref}
      {...restProps}
    >
      {
        label &&
        <label 
          className="slider__label" 
          htmlFor={sliderId}
        >
          {label}
        </label>
      }
      
      <div className="slider__container">
        {
          valueLabelDisplay !== "off" &&
          <div className="slider__value-labels">
            {
              isRange ? (
                <>
                  <span className="slider__value-label">
                    {normalizedValue[0]}
                  </span>
                  <span className="slider__value-label">
                    {normalizedValue[1]}
                  </span>
                </>
              ) : (
                <span className="slider__value-label">
                  {currentValue}
                </span>
              )
            }
          </div>
        }
        
        <div
          className="slider__root"
          ref={sliderRef}
          onClick={handleTrackClick}
        >
          <div className="slider__rail" />
          
          <div 
            className="slider__track"
            style={trackStyle}
          />
          
          {
            marksArray.map(mark =>
              <div
                key={mark.value}
                className="slider__mark"
                style={{
                  left: `${valueToPercent(mark.value)}%`,
                }}
              >
                {
                  (mark as any).label &&
                  <span className="slider__mark-label">
                    {(mark as any).label}
                  </span>
                }
              </div>
            )
          }
          
          {
            isRange &&
            <>
              <div
                className={getThumbClassName(0, activeThumb === 0)}
                style={{
                  left: `${valueToPercent(normalizedValue[0] || 0)}%`,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, 0);
                }}
                onKeyDown={e => handleThumbKeyDown(e, 0)}
                tabIndex={disabled ? -1 : 0}
                role="slider"
                aria-valuenow={normalizedValue[0]}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-label={ariaLabel || `${label || "Range slider"} minimum`}
                aria-labelledby={ariaLabelledby}
              />

              <div
                className={getThumbClassName(1, activeThumb === 1)}
                style={{
                  left: `${valueToPercent(normalizedValue[1] || 0)}%`,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  handleMouseDown(e, 1);
                }}
                onKeyDown={e => handleThumbKeyDown(e, 1)}
                tabIndex={disabled ? -1 : 0}
                role="slider"
                aria-valuenow={normalizedValue[1]}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-label={ariaLabel || `${label || "Range slider"} maximum`}
                aria-labelledby={ariaLabelledby}
              />
            </>
          }

          {
            !isRange &&
            <div
              className={getThumbClassName(0, true)}
              style={{
                left: `${valueToPercent(currentValue as number)}%`,
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
                handleMouseDown(e);
              }}
              onKeyDown={e => handleThumbKeyDown(e)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuenow={currentValue as number}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-label={ariaLabel || label || "Slider"}
              aria-labelledby={ariaLabelledby}
            />
          }
        </div>
        
        {
          name &&
          <input
            type="hidden"
            name={name}
            value={isRange ? (normalizedValue as [number, number]).join(",") : String(currentValue)}
          />
        }
      </div>
    </div>
  );
});

Slider.displayName = "Slider";