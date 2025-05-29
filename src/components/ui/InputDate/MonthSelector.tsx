"use client";
import { memo } from "react";
import Button from "../Button";

// Komponen untuk selector bulan
const MonthSelector = memo(
  ({
    currentMonth,
    onMonthChange,
    registerMonthRef,
    monthNames,
  }: {
    currentMonth: number;
    onMonthChange: (month: number) => void;
    registerMonthRef: (month: number, el: HTMLButtonElement | null) => void;
    monthNames: string[];
  }) => {
    return (
      <div className="grid grid-cols-3 gap-2 p-2">
        {monthNames.map((month, index) => {
          const isCurrentMonth = index === currentMonth;
          return (
            <Button
              key={month}
              type="button"
              ref={(el) => registerMonthRef(index, el)}
              variant={isCurrentMonth ? "contained" : "text"}
              className={`py-2 rounded text-center capitalize text-base font-normal hover:bg-blue-400/25 ${isCurrentMonth ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
              onClick={() => onMonthChange(index)}
              tabIndex={0}
              aria-selected={isCurrentMonth}
            >
              {month}
            </Button>
          );
        })}
      </div>
    );
  }
);
MonthSelector.displayName = "MonthSelector";

export default MonthSelector;
