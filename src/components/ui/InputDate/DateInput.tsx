"use client";
import type React from "react";
import { Fragment, memo } from "react";
import { twMerge } from "tailwind-merge";
import { DateState } from ".";
import Calendar from "../Icon/IconCalendar";
import X from "../Icon/IconClose";
import IconButton from "../IconButton";
import { Label, TextFieldProps } from "../Input";
import { variantIsChoose } from "../TextField/FieldVariant";

// Komponen untuk input tanggal
interface DateInputContainerProps extends TextFieldProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  selectsRange: boolean;
  dateState: DateState;
  handleDateChange: (
    type: "day" | "month" | "year",
    value: string,
    dateType: "start" | "end"
  ) => void;
  handleTimeChange: (
    value: string,
    type: "hour" | "minute",
    dateType: "start" | "end"
  ) => void;
  handleClear: (e: React.MouseEvent) => void;
  handlerOpen: (isOpen?: boolean) => void;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
  sm: boolean;
  isOpen: boolean;
  showTimeSelect: boolean;
  isClearable: boolean;
  showTimeInput: boolean;
  disabledTimeInput: boolean;

  dayRef: React.RefObject<HTMLInputElement | null>;
  monthRef: React.RefObject<HTMLInputElement | null>;
  yearRef: React.RefObject<HTMLInputElement | null>;
  hourRef: React.RefObject<HTMLInputElement | null>;
  minuteRef: React.RefObject<HTMLInputElement | null>;

  dayRangeRef: React.RefObject<HTMLInputElement | null>;
  monthRangeRef: React.RefObject<HTMLInputElement | null>;
  yearRangeRef: React.RefObject<HTMLInputElement | null>;
  hourRangeRef: React.RefObject<HTMLInputElement | null>;
  minuteRangeRef: React.RefObject<HTMLInputElement | null>;
}
const DateInput = memo((props: DateInputContainerProps) => {
  const {
    wrapperRef,
    showTimeSelect,
    isClearable,
    selectsRange,
    dateState,
    handleClear,
    handleDateChange,
    handleTimeChange,
    handlerOpen,
    setIsOpen,
    isOpen,
    sm,
    onBlur,
    showTimeInput,
    disabledTimeInput,

    className,
    classNames,
    variant,
    error,
    sizes,
    disabled,
    required,
    margin,
    label,
    helperText,
    fullWidth,
    noFocusAnimation,
    startAdornment,
    endAdornment,
    dayRef,
    hourRef,
    minuteRef,
    monthRef,
    yearRef,

    dayRangeRef,
    monthRangeRef,
    yearRangeRef,
    hourRangeRef,
    minuteRangeRef,
    ...rest
  } = props;
  let { color } = rest;

  const inputs: {
    ref: React.RefObject<HTMLInputElement | null>;
    placeholder: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onBlur: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    className: string;
    fieldType: "day" | "month" | "year" | "hour" | "minute";
    dateType: "start" | "end";
    disabled?: boolean;
  }[] = [
    {
      ref: dayRef,
      placeholder: "dd",
      value: dateState.startDay,
      onChange: (e) => handleDateChange("day", e.target.value, "start"),
      onBlur: (e) => {
        const num = parseInt(e.target.value, 10);
        if (!isNaN(num)) {
          const formatted = num < 10 ? `0${num}` : `${num}`;
          handleDateChange("day", formatted, "start");
        }
      },
      onKeyDown: (e) => handleKeyDown(e, 0, "day", "start"),
      className: "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
      dateType: "start",
      fieldType: "day",
    },
    {
      ref: monthRef,
      placeholder: "mm",
      value: dateState.startMonth,
      onChange: (e) => handleDateChange("month", e.target.value, "start"),
      onBlur: (e) => {
        const num = parseInt(e.target.value, 10);
        if (!isNaN(num)) {
          const formatted = num < 10 ? `0${num}` : `${num}`;
          handleDateChange("month", formatted, "start");
        }
      },
      onKeyDown: (e) => handleKeyDown(e, 1, "month", "start"),
      className: "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
      dateType: "start",
      fieldType: "month",
    },
    {
      ref: yearRef,
      placeholder: "yyyy",
      value: dateState.startYear,
      onBlur: (e) => {
        const raw = e.target.value.replace(/\D/g, "");
        if (raw.length === 4) {
          const num = parseInt(raw, 10);
          const currentYear = new Date().getFullYear();
          if (num >= 1900 && num <= currentYear + 20)
            handleDateChange("year", raw, "start");
          else handleDateChange("year", "", "start");
        } else {
          handleDateChange("year", "", "start");
        }
      },
      onChange: (e) => handleDateChange("year", e.target.value, "start"),
      onKeyDown: (e) => handleKeyDown(e, 2, "year", "start"),
      className: "min-h-[inherit] bg-inherit w-[4ch] outline-none text-center",
      dateType: "start",
      fieldType: "year",
    },
  ];
  if (showTimeSelect || showTimeInput) {
    inputs.push(
      {
        ref: hourRef,
        placeholder: "--",
        value: dateState.startHour,
        onChange: (e) => {
          e.preventDefault();
          handleTimeChange(e.target.value, "hour", "start");
        },
        onBlur: (e) => {
          const num = parseInt(e.target.value, 10);
          if (!isNaN(num)) {
            e.preventDefault();
            e.target.value = num < 10 ? `0${num}` : `${num}`;
            handleTimeChange(e.target.value, "hour", "start");
          }
        },
        onKeyDown: (e) => handleKeyDown(e, 3, "hour", "start"),
        className:
          "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
        dateType: "start",
        fieldType: "hour",
        disabled: disabledTimeInput,
      },
      {
        ref: minuteRef,
        placeholder: "--",
        value: dateState.startMinute,
        onChange: (e) => {
          e.preventDefault();
          handleTimeChange(e.target.value, "minute", "start");
        },
        onBlur: (e) => {
          const num = parseInt(e.target.value, 10);
          if (!isNaN(num)) {
            e.preventDefault();
            e.target.value = num < 10 ? `0${num}` : `${num}`;
            handleTimeChange(e.target.value, "minute", "start");
          }
        },
        onKeyDown: (e) => handleKeyDown(e, 4, "minute", "start"),
        className:
          "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
        dateType: "start",
        fieldType: "minute",
        disabled: disabledTimeInput,
      }
    );
  }
  if (selectsRange) {
    // inputs.push(dayRangeRef, monthRangeRef, yearRangeRef)
    inputs.push(
      {
        ref: dayRangeRef,
        placeholder: "dd",
        value: dateState.endDay,
        onChange: (e) => handleDateChange("day", e.target.value, "end"),
        onBlur: (e) => {
          const num = parseInt(e.target.value, 10);
          if (!isNaN(num)) {
            const formatted = num < 10 ? `0${num}` : `${num}`;
            handleDateChange("day", formatted, "end");
          }
        },
        onKeyDown: (e) => handleKeyDown(e, 0, "day", "end"),
        className:
          "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
        dateType: "end",
        fieldType: "day",
      },
      {
        ref: monthRangeRef,
        placeholder: "mm",
        value: dateState.endMonth,
        onChange: (e) => handleDateChange("month", e.target.value, "end"),
        onBlur: (e) => {
          const num = parseInt(e.target.value, 10);
          if (!isNaN(num)) {
            const formatted = num < 10 ? `0${num}` : `${num}`;
            handleDateChange("month", formatted, "end");
          }
        },
        onKeyDown: (e) => handleKeyDown(e, 1, "month", "end"),
        className:
          "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
        dateType: "end",
        fieldType: "month",
      },
      {
        ref: yearRangeRef,
        placeholder: "yyyy",
        value: dateState.endYear,
        onBlur: (e) => {
          const raw = e.target.value.replace(/\D/g, "");
          if (raw.length === 4) {
            const num = parseInt(raw, 10);
            const currentYear = new Date().getFullYear();
            if (num >= 1900 && num <= currentYear + 20)
              handleDateChange("year", raw, "end");
            else handleDateChange("year", "", "end");
          } else {
            handleDateChange("year", "", "end");
          }
        },
        onChange: (e) => handleDateChange("year", e.target.value, "end"),
        onKeyDown: (e) => handleKeyDown(e, 2, "year", "end"),
        className:
          "min-h-[inherit] bg-inherit w-[4ch] outline-none text-center",
        dateType: "end",
        fieldType: "year",
      }
    );
    if (showTimeSelect || showTimeInput) {
      inputs.push(
        {
          ref: hourRangeRef,
          placeholder: "--",
          value: dateState.endHour,
          onChange: (e) => {
            e.preventDefault();
            handleTimeChange(e.target.value, "hour", "end");
          },
          onBlur: (e) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num)) {
              e.preventDefault();
              e.target.value = num < 10 ? `0${num}` : `${num}`;
              handleTimeChange(e.target.value, "hour", "end");
            }
          },
          onKeyDown: (e) => handleKeyDown(e, 3, "hour", "end"),
          className:
            "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
          dateType: "end",
          fieldType: "hour",
          disabled: disabledTimeInput,
        },
        {
          ref: minuteRangeRef,
          placeholder: "--",
          value: dateState.endMinute,
          onChange: (e) => {
            e.preventDefault();
            handleTimeChange(e.target.value, "minute", "end");
          },
          onBlur: (e) => {
            const num = parseInt(e.target.value, 10);
            if (!isNaN(num)) {
              e.preventDefault();
              e.target.value = num < 10 ? `0${num}` : `${num}`;
              handleTimeChange(e.target.value, "minute", "end");
            }
          },
          onKeyDown: (e) => handleKeyDown(e, 4, "minute", "end"),
          className:
            "min-h-[inherit] bg-inherit w-[2ch] outline-none text-center",
          dateType: "end",
          fieldType: "minute",
          disabled: disabledTimeInput,
        }
      );
    }
  }

  if (error) color = "error";

  const { variantChoose, fieldClassName } = variantIsChoose({
    variant,
    sizes,
    color,
    error,
    disabled,
    focus: false,
    margin,
    label,
    helperText,
    fullWidth,
    noFocusAnimation,
  });

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    fieldType: "day" | "month" | "year" | "hour" | "minute",
    dateType: "start" | "end"
  ) => {
    const target = e.currentTarget;
    const value = target.value;
    const numValue = Number.parseInt(value || "0", 10);

    // Navigasi antar input
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < inputs.length - 1) inputs[index + 1].ref.current?.focus();
      else target.setSelectionRange(0, target.value.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0) inputs[index - 1].ref.current?.focus();
      else target.setSelectionRange(0, target.value.length);
    }

    // Naik/turun nilai numerik
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      const delta = e.key === "ArrowUp" ? 1 : -1;
      const newVal = isNaN(numValue) ? 0 : numValue + delta;
      let paddedValue = "";
      if (fieldType === "year") {
        paddedValue =
          newVal > 1
            ? newVal.toString().padStart(2, "0")
            : new Date().getFullYear().toString();
      } else if (fieldType === "hour") {
        let boundedValue = newVal;
        if (!value) boundedValue = 0;
        else if (newVal > 23) boundedValue = 0;
        else if (newVal < 0) boundedValue = 23;

        paddedValue = boundedValue.toString().padStart(2, "0");
      } else if (fieldType === "minute") {
        let boundedValue = newVal;
        if (!value) boundedValue = 0;
        else if (newVal > 59) boundedValue = 0;
        else if (newVal < 0) boundedValue = 59;

        paddedValue = boundedValue.toString().padStart(2, "0");
      } else if (fieldType === "month") {
        let boundedValue = newVal;
        if (newVal > 12) boundedValue = 1;
        else if (newVal < 1) boundedValue = 12;

        paddedValue = boundedValue.toString().padStart(2, "0");
      } else if (fieldType === "day") {
        const yearStr =
          inputs.find((input) => input.fieldType === "year")?.ref.current
            ?.value || new Date().getFullYear().toString();
        const monthStr =
          inputs.find((input) => input.fieldType === "month")?.ref.current
            ?.value || "1";

        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10);

        const maxDays = new Date(year, month, 0).getDate();

        let boundedValue = newVal;
        if (newVal > maxDays) boundedValue = 1;
        else if (newVal < 1) boundedValue = maxDays;

        paddedValue = boundedValue.toString().padStart(2, "0");
      }

      updateValue(fieldType, paddedValue, dateType);
    }

    // Hapus value
    if (e.key === "Backspace") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e.target as any).select?.();
      e.preventDefault();
      updateValue(fieldType, "", dateType);
      if (value === "" && index > 0) inputs[index].ref.current?.focus();
    }
  };

  const updateValue = (
    field: "day" | "month" | "year" | "hour" | "minute",
    val: string,
    dateType: "start" | "end"
  ) => {
    if (["day", "month", "year"].includes(field)) {
      handleDateChange(field as "day" | "month" | "year", val, dateType);
    } else {
      handleTimeChange(val, field as "hour" | "minute", dateType);
    }
  };

  return (
    <div
      className={twMerge(fieldClassName, classNames?.root)}
      onClick={() => dayRef.current?.focus()}
    >
      <div
        ref={wrapperRef}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
            handlerOpen();
          }
          if (e.key === "Enter" && isOpen) {
            e.preventDefault();
            setIsOpen(false);
          }
          if (e.key === "Escape") {
            e.preventDefault();
            if (isOpen) {
              e.stopPropagation();
              setIsOpen(false);
            }
          }
        }}
        onClick={() => {
          if (sm) handlerOpen();
          else setIsOpen(false);
        }}
        className={twMerge(
          "relative text-inherit inline-flex gap-2 items-center bg-inherit transition-transform duration-400 w-full",
          (sizes === "small" || sizes === "large") && "px-2",
          variantChoose,
          className,
          classNames?.container
        )}
      >
        {startAdornment}
        <div
          className={twMerge(
            fullWidth && "w-full",
            "min-h-[inherit]",
            classNames?.containerInput
          )}
        >
          <Label
            focus={true}
            inputRef={inputs[0].ref}
            sizes={sizes}
            classNamesLabel={classNames?.label}
            color={color}
            error={error}
            label={label}
            required={required}
          />
          <div className="min-h-[inherit] inline-block bg-inherit">
            {inputs.map((v, i) => {
              const next = inputs[i + 1];
              let separator: null | React.JSX.Element = null;

              if (next) {
                switch (next.fieldType) {
                  case "day":
                    separator = (
                      <span className="min-h-[inherit] mx-2 text-text-secondary font-semibold">
                        &ndash;
                      </span>
                    );
                    break;
                  case "hour":
                    separator = (
                      <span className="min-h-[inherit] text-text-secondary">
                        ,
                      </span>
                    );
                    break;
                  case "minute":
                    separator = (
                      <span className="min-h-[inherit] text-text-secondary">
                        :
                      </span>
                    );
                    break;
                  default:
                    separator = (
                      <span className="min-h-[inherit] text-text-secondary mx-0.5">
                        /
                      </span>
                    );
                    break;
                }
              }

              return (
                <Fragment key={i}>
                  <input
                    type="text"
                    inputMode={sm ? "none" : "numeric"}
                    maxLength={v.fieldType === "year" ? 4 : 2}
                    ref={v.ref}
                    placeholder={v.placeholder}
                    value={v.value}
                    disabled={v.disabled || disabled}
                    readOnly={rest.readOnly}
                    onFocus={(e) => (sm ? undefined : e.target.select())}
                    onMouseDown={(e) => {
                      if (sm) return;
                      e.preventDefault(); // cegah seleksi manual dengan mouse
                      const input = e.currentTarget;
                      input.focus();
                      input.setSelectionRange(0, input.value.length); // selalu full block
                    }}
                    onClick={(e) => (sm ? null : e.stopPropagation())}
                    onChange={v.onChange}
                    onBlur={(e) => {
                      if (sm) return;
                      v.onBlur(e);
                      onBlur?.({
                        ...e,
                        target: { ...e.target, name: rest.name ?? "" },
                      });
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onBeforeInput={(e: any) => {
                      if (sm) return;
                      if (!/^\d$/.test(e.data ?? "")) e.preventDefault();
                    }}
                    onKeyDown={(e) =>
                      handleKeyDown(e, i, v.fieldType, v.dateType)
                    }
                    className="min-h-[inherit] bg-inherit outline-none text-center cursor-default select-none disabled:opacity-50"
                    style={{
                      width:
                        v.fieldType === "year"
                          ? "4ch"
                          : v.placeholder === "mm" && !(v.value.length > 0)
                            ? "3ch"
                            : "2ch",
                    }}
                  />
                  {separator}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div className="inline-flex items-center min-h-[inherit]">
          {endAdornment}
          {isClearable && dateState.startDate && (
            <IconButton
              type="button"
              variant="text"
              sizes="small"
              disabled={disabled || rest.readOnly}
              onClick={handleClear}
              color="error"
            >
              <X className="bg-inherit h-4 w-4" />
            </IconButton>
          )}
          <IconButton
            type="button"
            variant="text"
            sizes="small"
            disabled={disabled || rest.readOnly}
            onClick={(e) => {
              if (sm) return;
              e.stopPropagation();
              handlerOpen(true);
            }}
          >
            <Calendar fontSize={16} />
          </IconButton>
        </div>
      </div>

      {helperText && (
        <div
          className={twMerge(
            "text-xs text-gray-500 absolute -bottom-4 left-3",
            classNames?.helperText,
            error && "text-error-main"
          )}
        >
          {helperText}
        </div>
      )}
    </div>
  );
});
DateInput.displayName = "DateInput";

export default DateInput;
