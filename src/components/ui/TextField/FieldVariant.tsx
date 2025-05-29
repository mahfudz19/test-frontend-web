import { JSX } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export const variantslabel = cva(
  [
    "absolute",
    "text-neutral-300 dark:text-neutral-500",
    "duration-200",
    "select-none",
  ],
  {
    variants: {
      sizes: {
        small: ["text-xs", "top-[0.4rem]"],
        medium: ["text-base", "top-[0.45rem]"],
        large: ["text-lg", "top-[0.6rem]"],
      },
    },
    defaultVariants: {
      sizes: "medium",
    },
  }
);

export const variantslabelActive = cva(["text-xs", "-top-4", "px-1 "], {
  variants: {
    color: {
      default: ["text-gray-400", "dark:text-neutral-400"],
      primary: ["text-blue-700", "dark:text-blue-400"],
      secondary: ["text-gray-700", "dark:text-gray-400"],
      success: ["text-green-700", "dark:text-green-400"],
      error: ["text-red-700", "dark:text-red-400"],
      warning: ["text-yellow-700", "dark:text-yellow-400"],
      info: ["text-sky-700", "dark:text-sky-400"],
    },
    sizes: {
      small: ["left-2.5"],
      medium: ["left-2.5"],
      large: ["left-2.5"],
    },
  },
  defaultVariants: {
    color: "default",
    sizes: "medium",
  },
});

// ------------------------- outline ------------------------- //
export const variantsInputOutline = cva(
  [
    "outline-2 outline",
    "rounded-lg my-0.5",
    "focus-within:outline focus-within:outline-2",
  ],
  {
    variants: {
      color: {
        default: [
          "outline-gray-300 dark:outline-gray-500",
          "hover:outline-gray-400 dark:hover:outline-gray-400",
          "focus-within:outline-gray-400",
        ],
        primary: [
          "outline-blue-700 dark:outline-blue-400",
          "hover:outline-blue-900 dark:hover:outline-blue-600",
          "focus-within:outline-blue-700",
        ],
        secondary: [
          "outline-gray-700 dark:outline-gray-400",
          "hover:outline-gray-900 dark:hover:outline-gray-600",
          "focus-within:outline-gray-700",
        ],
        success: [
          "outline-green-700 dark:outline-green-400",
          "hover:outline-green-900 dark:hover:outline-green-600",
          "focus-within:outline-green-700",
        ],
        error: [
          "outline-red-700 dark:outline-red-400",
          "hover:outline-red-900 dark:hover:outline-red-600",
          "focus-within:outline-red-700",
        ],
        warning: [
          "outline-yellow-700 dark:outline-yellow-400",
          "hover:outline-yellow-900 dark:hover:outline-yellow-600",
          "focus-within:outline-yellow-700",
        ],
        info: [
          "outline-sky-700 dark:outline-sky-400",
          "hover:outline-sky-900 dark:hover:outline-sky-600",
          "focus-within:outline-sky-700",
        ],
      },
      sizes: {
        small: ["text-sm", "min-h-[1.875rem]", "px-2"],
        medium: ["min-h-[2.5rem]", "px-2.5", "leading-6"],
        large: ["text-lg", "min-h-[3.125rem]", "px-3"],
      },
    },
    defaultVariants: {
      color: "default",
      sizes: "medium",
    },
  }
);
// ----------------------- end outline ----------------------- //

// ------------------------ default ------------------------- //
export const variantsInputDefault = cva(
  ["rounded-lg", "text-black", "my-0.5"],
  {
    variants: {
      color: {
        default: ["bg-white dark:bg-gray-500"],
        primary: [
          "text-blue-700 dark:text-blue-400",
          "bg-blue-700 dark:bg-blue-400",
        ],
        secondary: [
          "text-gray-700 dark:text-gray-400",
          "bg-gray-700 dark:bg-gray-400",
        ],
        success: [
          "text-green-700 dark:text-green-400",
          "bg-green-700 dark:bg-green-400",
        ],
        error: ["text-red-700 dark:text-red-400", "bg-red-700 dark:bg-red-400"],
        warning: [
          "text-yellow-700 dark:text-yellow-400",
          "bg-yellow-700 dark:bg-yellow-400",
        ],
        info: ["text-sky-700 dark:text-sky-400", "bg-sky-700 dark:bg-sky-400"],
      },
      sizes: {
        small: ["text-sm", "min-h-[1.875rem]", "px-2"],
        medium: ["min-h-[2.5rem]", "px-2.5", "leading-6"],
        large: ["text-lg", "min-h-[3.125rem]", "px-3"],
      },
    },
    defaultVariants: {
      color: "default",
      sizes: "medium",
    },
  }
);
// ---------------------- end default ----------------------- //

// ------------------------ default ------------------------- //
export const variantsInputUnderlined = cva(["border-b-2"], {
  variants: {
    color: {
      default: [
        "hover:border-gray-400 dark:hover:border-gray-200",
        "border-gray-300 dark:border-gray-400",
      ],
      primary: [
        "hover:border-blue-900 dark:hover:border-blue-600",
        "border-blue-700 dark:border-blue-400",
      ],
      secondary: [
        "hover:border-gray-900 dark:hover:border-gray-600",
        "border-gray-700 dark:border-gray-400",
      ],
      success: [
        "hover:border-green-900 dark:hover:border-green-600",
        "border-green-700 dark:border-green-400",
      ],
      error: [
        "hover:border-red-900 dark:hover:border-red-600",
        "border-red-700 dark:border-red-400",
      ],
      warning: [
        "hover:border-yellow-900 dark:hover:border-yellow-600",
        "border-yellow-700 dark:border-yellow-400",
      ],
      info: [
        "hover:border-sky-900 dark:hover:border-sky-600",
        "border-sky-700 dark:border-sky-400",
      ],
    },
    sizes: {
      small: ["text-sm", "min-h-[1.875rem]", "px-2"],
      medium: ["min-h-[2.5rem]", "px-2.5", "leading-6"],
      large: ["text-lg", "min-h-[3.125rem]", "px-3"],
    },
  },
  defaultVariants: {
    color: "default",
    sizes: "medium",
  },
});
// ---------------------- end default ----------------------- //

interface Props {
  variant?: "default" | "bordered" | "underlined";
  sizes?: "small" | "medium" | "large" | null;
  color?: "default" | "primary" | "success" | "error" | "warning" | "info";
  error?: boolean;
  disabled?: boolean;
  focus?: boolean;
  margin?: "none" | "dense" | "normal";
  label?: string;
  helperText?: string | boolean | JSX.Element;
  fullWidth?: boolean;
  noFocusAnimation?: boolean;
}

export const variantIsChoose = (props: Props) => {
  const {
    variant = "default",
    sizes,
    color,
    error,
    disabled,
    focus,
    helperText,
    label,
    margin = "none",
    fullWidth,
    noFocusAnimation,
  } = props;
  let variantChoose;
  switch (variant) {
    case "bordered":
      variantChoose = twMerge(
        variantsInputOutline({ sizes, color }),
        error && " outline-error-main dark:outline-error-main ",
        disabled &&
          " outline-gray-100 hover:outline-gray-100 dark:outline-gray-700 hover:dark:outline-gray-700 ",
        !disabled && focus && !noFocusAnimation && " -translate-y-[0.125rem] ",
        !disabled && focus && " z-[1] "
      );
      break;
    case "underlined":
      variantChoose =
        variantsInputUnderlined({ sizes, color }) +
        (disabled &&
          " border-gray-100 hover:border-gray-100 dark:border-gray-700 hover:dark:border-gray-700 ");
      break;

    default:
      variantChoose =
        variantsInputDefault({ sizes, color }) +
        (disabled && " bg-gray-50/90 dark:bg-gray-700 ") +
        (focus && " z-[1] ") +
        (focus && !noFocusAnimation && " -translate-y-[0.125rem] ");
      break;
  }
  return {
    variantChoose,
    fieldClassName: twMerge(
      "inline-flex items-center relative",
      fullWidth ? "w-full" : "",
      margin === "normal" && "my-4",
      margin === "dense" && "my-2",
      margin === "none" && "my-0",
      label && "mt-4",
      error && "text-error-main",
      disabled && "text-gray-300 dark:text-gray-500",
      helperText && "mb-4"
    ),
  };
};
