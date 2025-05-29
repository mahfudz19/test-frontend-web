import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, JSX, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface MoreProps {
  variant?: "contained" | "outlined" | "light";
  startIcon?: JSX.Element;
  endIcon?: JSX.Element;
}

const variantsLight = cva(["rounded-3xl", "inline-block"], {
  variants: {
    color: {
      primary: ["bg-teal-300/30", "text-teal-900 dark:text-teal-300"],
      secondary: ["bg-gray-300/30", "text-gray-900 dark:text-gray-300"],
      success: ["bg-lime-300/30", "text-lime-900 dark:text-lime-300"],
      error: ["bg-rose-300/30", "text-rose-900 dark:text-rose-300"],
      warning: ["bg-amber-300/30", "text-amber-900 dark:text-amber-300"],
      info: ["bg-cyan-300/30", "text-cyan-900 dark:text-cyan-300"],
      white: ["bg-gray-300/30", "text-gray-900"],
    },
    sizes: {
      small: ["px-2", "text-xs"],
      medium: ["px-3", "py-1", "text-sm"],
      large: ["px-3.5", "py-1.5"],
    },
  },
  defaultVariants: {
    color: "primary",
    sizes: "medium",
  },
});

const variantsContained = cva(["rounded-3xl", "inline-block"], {
  variants: {
    color: {
      primary: [
        "bg-gradient-to-br",
        "from-teal-400",
        "to-teal-900",
        "text-white",
      ],
      secondary: [
        "bg-gradient-to-br",
        "from-gray-400",
        "to-gray-900",
        "text-white",
      ],
      success: [
        "bg-gradient-to-br",
        "from-lime-400",
        "to-lime-900",
        "text-white",
      ],
      error: [
        "bg-gradient-to-br",
        "from-rose-400",
        "to-rose-900",
        "text-white",
      ],
      warning: [
        "bg-gradient-to-br",
        "from-amber-400",
        "to-amber-900",
        "text-white",
      ],
      info: ["bg-gradient-to-br", "from-cyan-400", "to-cyan-900", "text-white"],
      white: ["bg-white", "text-gray-900"],
    },
    sizes: {
      small: ["px-2", "text-xs"],
      medium: ["px-3", "py-1", "text-sm"],
      large: ["px-3.5", "py-1.5"],
    },
  },
  defaultVariants: {
    color: "primary",
    sizes: "medium",
  },
});

const variantsOutlined = cva(
  ["rounded-3xl", "inline-block", "border border-2"],
  {
    variants: {
      color: {
        primary: [
          "border-teal-900 dark:border-teal-300",
          "text-teal-900 dark:text-teal-300",
        ],
        secondary: [
          "border-gray-900 dark:border-gray-300",
          "text-gray-900 dark:text-gray-300",
        ],
        success: [
          "border-lime-900 dark:border-lime-300",
          "text-lime-900 dark:text-lime-300",
        ],
        error: [
          "border-rose-900 dark:border-rose-300",
          "text-rose-900 dark:text-rose-300",
        ],
        warning: [
          "border-amber-900 dark:border-amber-300",
          "text-amber-900 dark:text-amber-300",
        ],
        white: [
          "border-gray-900 dark:border-white",
          "text-gray-900 dark:text-gray-900",
        ],
        info: [
          "border-cyan-900 dark:border-cyan-300",
          "text-cyan-900 dark:text-cyan-300",
        ],
      },
      sizes: {
        small: ["px-2", "text-xs"],
        medium: ["px-3", "py-1", "text-sm"],
        large: ["px-3.5", "py-1.5"],
      },
    },
    defaultVariants: {
      color: "primary",
      sizes: "medium",
    },
  }
);

export type ChipProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof variantsContained | typeof variantsOutlined> &
  MoreProps;

const Chip = forwardRef<HTMLDivElement, ChipProps>((props: ChipProps, ref) => {
  const {
    className,
    variant,
    color,
    sizes,
    children,
    startIcon,
    endIcon,
    ...rest
  } = props;
  let choseVariant;
  switch (variant) {
    case "light":
      choseVariant = variantsLight({ color, sizes, className });
      break;

    case "outlined":
      choseVariant = variantsOutlined({ color, sizes, className });
      break;

    default:
      choseVariant = variantsContained({ color, sizes, className });
      break;
  }

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge(
        choseVariant,
        startIcon || endIcon ? "inline-flex gap-1.5 items-center" : undefined
      )}
    >
      {startIcon}
      {children}
      {endIcon}
    </div>
  );
});

Chip.displayName = "Chip";

export default Chip;
