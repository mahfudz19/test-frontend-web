import { TableHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface MoreProps {
  noRoot?: boolean;
  exceptMobile?: boolean;
  classNames?: {
    root?: string;
    table?: string;
  };
}

export type TableProps = TableHTMLAttributes<HTMLTableElement> & MoreProps;

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ noRoot, exceptMobile, className, classNames, ...rest }, ref) => {
    return !noRoot ? (
      <div className={twMerge("overflow-x-auto", classNames?.root)}>
        <table
          ref={ref}
          className={twMerge(
            "text-sm min-w-full h-auto table-auto w-full border-gray-300",
            exceptMobile && "hidden sm:table",
            className,
            classNames?.table
          )}
          {...rest}
        />
      </div>
    ) : (
      <table
        ref={ref}
        className={twMerge(
          "text-sm w-full min-w-screen-sm border-gray-300",
          exceptMobile && "hidden sm:table",
          className,
          classNames?.table
        )}
        {...rest}
      />
    );
  }
);

Table.displayName = "Table";

export default Table;
