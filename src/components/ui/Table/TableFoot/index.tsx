import { HTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type TableProps = HTMLAttributes<HTMLTableSectionElement>;

const TableFoot = forwardRef<HTMLTableSectionElement, TableProps>(
  ({ className, ...rest }, ref) => {
    return (
      <tfoot
        ref={ref}
        className={twMerge(
          "table-footer-group uppercase text-xs align-middle border-inherit text-text-secondary dark:text-gray-400",
          className
        )}
        {...rest}
      />
    );
  }
);

TableFoot.displayName = "TableFoot";

export default TableFoot;
