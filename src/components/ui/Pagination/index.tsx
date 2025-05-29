/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import IconChevronLeft from "src/components/ui/Icon/IconChevronLeft";
import IconChevronRight from "src/components/ui/Icon/IconChevronRight";
import { twMerge } from "tailwind-merge";
import { color } from "../Type";
import useMediaQuery from "src/components/util/UI/useMediaQuery";

interface MoreProps {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  variant?: "contained" | "outlined";
}

export type PaginationProps = VariantProps<
  typeof variantsOutlinedPaginateButton
> &
  MoreProps;

const variantsOutlinedPrevNextButton = cva(
  [
    "flex items-center justify-center",
    "border",
    "rounded-lg",
    "text-center",
    "bg-inherit",
    "px-1",
    "py-1",
    "text-sm",
    "font-medium",
  ],
  {
    variants: {
      round: {
        circle: ["rounded-full"],
        rounded: ["rounded-lg"],
      },
      color: {
        primary: [
          "border-blue-700/70",
          "text-blue-700/70",
          "disabled:text-blue-300/20",
          "disabled:border-blue-300/20",
        ],
        secondary: [
          "border-gray-700/70",
          "text-gray-700/70",
          "disabled:text-gray-300/20",
          "disabled:border-gray-300/20",
        ],
        success: [
          "border-green-700/70",
          "text-green-700/70",
          "disabled:text-green-300/20",
          "disabled:border-green-300/20",
        ],
        error: [
          "border-red-700/70",
          "text-red-700/70",
          "disabled:text-red-300/20",
          "disabled:border-red-300/20",
        ],
        warning: [
          "border-yellow-700/70",
          "text-yellow-700/70",
          "disabled:text-yellow-300/20",
          "disabled:border-yellow-300/20",
        ],
        info: [
          "border-sky-700/70",
          "text-sky-700/70",
          "disabled:text-sky-300/20",
          "disabled:border-sky-300/20",
        ],
        white: [
          "border-white/70",
          "text-white/70",
          "disabled:text-white/20",
          "disabled:border-white/20",
        ],
      },
      sizes: {
        small: ["w-8", "h-8"],
        medium: ["w-10", "h-10"],
        large: ["w-12", "h-12"],
      },
    },
    defaultVariants: {
      color: "primary",
      sizes: "medium",
      round: "rounded",
    },
  }
);

const variantsContainedPrevNextButton = cva(
  [
    "flex items-center justify-center",
    "border",
    "rounded-lg",
    "text-center",
    "bg-inherit",
    "px-1",
    "py-1",
    "text-sm",
    "font-medium",
  ],
  {
    variants: {
      round: {
        circle: ["rounded-full"],
        rounded: ["rounded-lg"],
      },
      color: {
        primary: [
          "text-blue-700",
          "border-blue-700/50",
          "disabled:border-blue-300/30",
          "disabled:text-blue-300/30",
        ],
        secondary: [
          "text-gray-700",
          "border-gray-700/50",
          "disabled:border-gray-300/30",
          "disabled:text-gray-300/30",
        ],
        success: [
          "text-green-700",
          "border-green-700/50",
          "disabled:border-green-300/30",
          "disabled:text-green-300/30",
        ],
        error: [
          "text-red-700",
          "border-red-700/50",
          "disabled:border-red-300/30",
          "disabled:text-red-300/30",
        ],
        warning: [
          "text-yellow-700",
          "border-yellow-700/50",
          "disabled:border-yellow-300/30",
          "disabled:text-yellow-300/30",
        ],
        info: [
          "text-sky-700",
          "border-sky-700/50",
          "disabled:border-sky-300/30",
          "disabled:text-sky-300/30",
        ],
        white: [
          "text-white",
          "border-white/50",
          "disabled:border-white/30",
          "disabled:text-white/30",
        ],
      },
      sizes: {
        small: ["w-8", "h-8"],
        medium: ["w-10", "h-10"],
        large: ["w-12", "h-12"],
      },
    },
    defaultVariants: {
      color: "primary",
      sizes: "medium",
      round: "rounded",
    },
  }
);

const PrevNextButton = (
  props: VariantProps<
    | typeof variantsOutlinedPrevNextButton
    | typeof variantsContainedPrevNextButton
  > & {
    variant: "contained" | "outlined";
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, color, sizes, round, variant, ...rest } = props;
  let variantCVA;
  if (variant === "outlined")
    variantCVA = variantsOutlinedPrevNextButton({
      color,
      sizes,
      round,
      className,
    });
  if (variant === "contained")
    variantCVA = variantsContainedPrevNextButton({
      color,
      sizes,
      round,
      className,
    });
  return (
    <button
      type="button"
      className={twMerge(variantCVA)}
      {...rest}
      style={{ WebkitTapHighlightColor: "transparent" }}
    />
  );
};

const variantsOutlinedPaginateButton = cva(
  [
    "border",
    "text-center",
    "bg-inherit",
    "px-1",
    "py-1",
    "text-sm",
    "font-medium",
  ],
  {
    variants: {
      round: {
        circle: ["rounded-full"],
        rounded: ["rounded-lg"],
      },
      color: {
        primary: [
          "border-blue-700",
          "text-blue-700",
          "disabled:bg-blue-200/20",
        ],
        secondary: [
          "border-gray-700",
          "text-gray-700",
          "disabled:bg-gray-200/20",
        ],
        success: [
          "border-green-700",
          "text-green-700",
          "disabled:bg-green-200/20",
        ],
        error: ["border-red-700", "text-red-700", "disabled:bg-red-200/20"],
        warning: [
          "border-yellow-700",
          "text-yellow-700",
          "disabled:bg-yellow-200/20",
        ],
        info: ["border-sky-700", "text-sky-700", "disabled:bg-sky-200/20"],
        white: ["border-white", "text-white", "disabled:bg-white/20"],
      },
      sizes: {
        small: ["w-8", "h-8"],
        medium: ["w-10", "h-10"],
        large: ["w-12", "h-12"],
      },
    },
    defaultVariants: {
      color: "primary",
      sizes: "medium",
      round: "rounded",
    },
  }
);

const variantsContainedPaginateButton = cva(
  [
    "border",
    "text-center",
    "bg-inherit",
    "px-1",
    "py-1",
    "text-sm",
    "font-medium",
  ],
  {
    variants: {
      round: {
        circle: ["rounded-full"],
        rounded: ["rounded-lg"],
      },
      color: {
        primary: [
          "border-blue-700/50",
          "text-blue-700",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
        secondary: [
          "border-gray-700/50",
          "text-gray-700",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
        success: [
          "border-green-700/50",
          "text-green-700",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
        error: [
          "border-red-700/50",
          "text-red-700",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
        warning: [
          "border-yellow-700/50",
          "text-yellow-700",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
        info: [
          "border-sky-700/50",
          "text-sky-700",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
        white: [
          "border-white/50",
          "text-white",
          "disabled:text-white",
          "disabled:border-0",
          "disabled:bg-inherit",
        ],
      },
      sizes: {
        small: ["w-8", "h-8"],
        medium: ["w-10", "h-10"],
        large: ["w-12", "h-12"],
      },
    },
    defaultVariants: {
      color: "primary",
      sizes: "medium",
      round: "rounded",
    },
  }
);

const PaginateButton = (
  props: VariantProps<
    | typeof variantsOutlinedPaginateButton
    | typeof variantsContainedPaginateButton
  > & {
    variant: "contained" | "outlined";
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { className, color, sizes, round, variant, ...rest } = props;
  let variantCVA;
  if (variant === "outlined")
    variantCVA = variantsOutlinedPaginateButton({
      color,
      round,
      sizes,
      className,
    });
  if (variant === "contained")
    variantCVA = variantsContainedPaginateButton({
      color,
      round,
      sizes,
      className,
    });
  return (
    <button
      type="button"
      className={twMerge(variantCVA)}
      {...rest}
      style={{ WebkitTapHighlightColor: "transparent" }}
    />
  );
};

const Pagination: FC<PaginationProps> = ({
  totalCount,
  currentPage: page,
  onPageChange,
  color,
  round,
  sizes,
  variant = "outlined",
}) => {
  const sm = useMediaQuery("sm");

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const renderButton = (pageNum: number) => {
    const key = `PaginateButton-${pageNum}-${page}-${totalCount}`;
    return (
      <PaginateButton
        key={key}
        onClick={() => handlePageChange(pageNum)}
        disabled={page === pageNum}
        color={color as color}
        round={round}
        sizes={sizes}
        variant={variant}
      >
        {pageNum}
      </PaginateButton>
    );
  };

  const renderSpan = (key: string) => {
    key = `PaginateButton-${key}...-${page}-${totalCount}`;
    return (
      <span
        key={key}
        className="w-8 px-1 py-1 text-sm font-medium text-center text-gray-700 bg-inherit"
      >
        ...
      </span>
    );
  };

  const renderButtonsAndSpans = () => {
    const buttonsAndSpans: ReactNode[] = [];

    if (totalCount <= 7) {
      for (let i = 1; i <= totalCount; i++) {
        buttonsAndSpans.push(renderButton(i));
      }
    } else {
      buttonsAndSpans.push(renderButton(1));
      if (page <= 3) {
        buttonsAndSpans.push(renderButton(2));
        sm && buttonsAndSpans.push(renderButton(3));
        buttonsAndSpans.push(renderButton(4));
        sm && buttonsAndSpans.push(renderButton(5));
        buttonsAndSpans.push(renderSpan("1"));
      } else if (page >= totalCount - 2) {
        buttonsAndSpans.push(renderSpan("1"));
        sm && buttonsAndSpans.push(renderButton(totalCount - 4));
        buttonsAndSpans.push(renderButton(totalCount - 3));
        sm && buttonsAndSpans.push(renderButton(totalCount - 2));
        buttonsAndSpans.push(renderButton(totalCount - 1));
      } else {
        buttonsAndSpans.push(renderSpan("1"));
        sm && buttonsAndSpans.push(renderButton(page - 1));
        buttonsAndSpans.push(renderButton(page));
        sm && buttonsAndSpans.push(renderButton(page + 1));
        buttonsAndSpans.push(renderSpan("2"));
      }
      buttonsAndSpans.push(renderButton(totalCount));
    }

    return buttonsAndSpans;
  };

  return (
    <nav className="relative z-0 inline-flex flex-wrap gap-0.5 sm:gap-1">
      <PrevNextButton
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        color={color as color}
        round={round}
        sizes={sizes}
        variant={variant}
      >
        <IconChevronLeft fontSize={18} />
      </PrevNextButton>
      {renderButtonsAndSpans()}
      <PrevNextButton
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalCount}
        color={color as color}
        round={round}
        sizes={sizes}
        variant={variant}
      >
        <IconChevronRight fontSize={18} />
      </PrevNextButton>
    </nav>
  );
};

export default Pagination;
