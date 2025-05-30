"use client";
import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import CircularProgress from "src/components/ui/CircularProgress";
import { twMerge } from "tailwind-merge";
import Ripple from "../Ripple";

const baseClass = [
  "rounded-xl",
  "tracking-wide",
  "cursor-pointer",
  "inline-flex",
  "items-center",
  "justify-center",
  "uppercase",
  "transition",
  "font-semibold",
];

const disabledClass = [
  "disabled:cursor-not-allowed",
  "disabled:scale-100",
  "disabled:opacity-25",
  "dark:disabled:cursor-not-allowed",
  "dark:disabled:scale-100",
];

const interactionClass = [
  "outline-none",
  "hover:scale-[1.03]",
  "active:scale-95",
  "hover:shadow-md",
];

const containedVariant = cva(
  [
    ...baseClass,
    ...interactionClass.splice(0),
    "shadow",
    ...disabledClass,
    "text-white",
    "disabled:shadow-none",
    "disabled:text-white",
    "disabled:from-neutral-400",
    "disabled:to-neutral-400",
    "disabled:bg-neutral-400",
    "dark:disabled:shadow-none",
    "dark:disabled:text-white",
    "dark:disabled:from-neutral-400",
    "dark:disabled:to-neutral-400",
    "dark:disabled:bg-neutral-400",
  ],
  {
    variants: {
      color: {
        primary: ["bg-blue-600", "focus:ring-blue-600"],
        secondary: ["bg-gray-600", "focus:ring-gray-600"],
        success: ["bg-green-600", "focus:ring-green-600"],
        error: ["bg-red-600", "focus:ring-red-600"],
        warning: ["bg-yellow-600", "focus:ring-yellow-600"],
        info: ["bg-sky-600", "text-white", "focus:ring-sky-600"],
        white: [
          "bg-white",
          "dark:bg-gray-700",
          "text-blue-600",
          "dark:text-white",
          "focus:ring-neutral-200",
        ],
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

const outlinedVariant = cva(
  [
    ...baseClass,
    ...interactionClass,
    "shadow",
    "outline",
    "outline-2",
    "-outline-offset-1",
    ...disabledClass,
    // focus
    "focus-visible:outline-2",
    "focus-visible:outline",
    "disabled:shadow-none",
    "disabled:text-neutral-400",
    "disabled:outline-neutral-400",
    "dark:disabled:shadow-none",
    "dark:disabled:text-neutral-400",
    "dark:disabled:outline-neutral-400",
  ],
  {
    variants: {
      color: {
        primary: [
          "outline-blue-700 dark:outline-blue-900",
          "text-blue-700",
          "focus:ring-blue-700",
        ],
        secondary: [
          "outline-gray-700 dark:outline-gray-900",
          "text-gray-700",
          "focus:ring-gray-700",
        ],
        success: [
          "outline-green-700 dark:outline-green-900",
          "text-green-700",
          "focus:ring-green-700",
        ],
        error: [
          "outline-red-700 dark:outline-red-900",
          "text-red-700",
          "focus:ring-red-700",
        ],
        warning: [
          "outline-yellow-700 dark:outline-yellow-900",
          "text-yellow-700",
          "focus:ring-yellow-700",
        ],
        info: [
          "outline-sky-700 dark:outline-sky-900",
          "text-sky-700",
          "focus:ring-sky-700",
        ],
        white: [
          "outline-gray-500 dark:outline-white",
          "text-gray-500 dark:text-white",
          "focus:ring-gray-500 dark:focus:ring-white",
        ],
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

const textVariant = cva(
  [
    ...baseClass,
    "focus-visible:outline-none",
    "hover:scale-[1.01]",
    ...disabledClass,
  ],
  {
    variants: {
      color: {
        primary: ["text-blue-700", "hover:text-blue-900 focus:ring-blue-700"],
        secondary: ["text-gray-700", "hover:text-gray-900 focus:ring-gray-700"],
        success: [
          "text-green-700",
          "hover:text-green-900 focus:ring-green-700",
        ],
        error: ["text-red-700", "hover:text-red-900 focus:ring-red-700"],
        warning: [
          "text-yellow-700",
          "hover:text-yellow-900 focus:ring-yellow-700",
        ],
        info: ["text-sky-700", "hover:text-sky-900 focus:ring-sky-700"],
        white: [
          "text-gray-500 dark:text-white",
          "focus:ring-gray-500 dark:focus:ring-white",
        ],
      },
    },
    defaultVariants: {
      color: "primary",
    },
  }
);

interface MoreProps {
  loading?: boolean;
  variant?: "contained" | "outlined" | "text";
  sizes?: "small" | "medium" | "large";
  fullWidth?: boolean;
  noRipple?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  href?: string;
  onClickDownloadURL?: string;
  target?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LinkComponent?: React.ComponentType<any>;
}

export type ButtonVariantProps = VariantProps<typeof containedVariant>;
export type ButtonProp = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps &
  MoreProps;

export const switchVariant = (
  variant: MoreProps["variant"],
  size: "small" | "medium" | "large",
  color?: ButtonVariantProps["color"],
  noRipple?: boolean,
  icon?: boolean
) => {
  const variantMap = {
    contained: containedVariant,
    outlined: outlinedVariant,
    text: textVariant,
  };
  const sizeMap: Record<
    "small" | "medium" | "large",
    { default: string[]; icon: string[] }
  > = {
    small: {
      default: ["text-xs", "p-1", "px-4"],
      icon: ["text-xs", "p-1.5", "rounded-full"],
    },
    medium: {
      default: ["text-xs", "p-1", "leading-6", "px-6"],
      icon: ["text-sm", "p-2", "rounded-full"],
    },
    large: {
      default: ["text-sm", "p-2.5", "px-9"],
      icon: ["text-base", "p-3", "rounded-full"],
    },
  };

  const sizeClasses = icon ? sizeMap[size].icon : sizeMap[size].default;
  const base = variantMap[variant ?? "contained"]({ color });
  const rippleClass = noRipple
    ? "focus-visible:ring-2 focus-visible:ring-offset-2"
    : "";

  return [base, rippleClass, ...sizeClasses].join(" ");
};

const Button = forwardRef<HTMLButtonElement, ButtonProp>(
  (props: ButtonProp, ref) => {
    const {
      className,
      variant = "contained",
      color = "primary",
      sizes = "medium",
      loading,
      children,
      startIcon,
      fullWidth,
      endIcon,
      href,
      onClickDownloadURL,
      noRipple,
      ...rest
    } = props;
    let { LinkComponent = "button" } = rest;

    if (rest.disabled) LinkComponent = "button";
    const choseVariant = switchVariant(variant, sizes, color, noRipple);

    if (onClickDownloadURL) {
      rest.onClick = () => {
        const a = document.createElement("a");
        a.href = onClickDownloadURL;
        a.click();
      };
    }

    return (
      <LinkComponent
        ref={ref}
        title={
          rest.title || typeof children === "string" ? children : undefined
        }
        type={rest.type}
        {...(href && { href: href })}
        className={twMerge(
          "overflow-hidden relative",
          choseVariant,
          startIcon ? "pl-3" : "",
          endIcon ? "pr-3" : "",
          fullWidth && "w-full",
          className
        )}
        style={{ WebkitTapHighlightColor: "transparent" }}
        {...rest}
      >
        {startIcon && <span className="mx-1">{startIcon}</span>}
        {loading && (
          <CircularProgress className="absolute inline-flex items-center" />
        )}
        <span
          className={twMerge(
            "transition",
            loading ? "opacity-0" : "opacity-100"
          )}
        >
          {children}
        </span>

        {endIcon && <span className="mx-1">{endIcon}</span>}
        {!noRipple && !rest.disabled && (
          <Ripple
            color={
              variant === "contained" && color !== "white" ? undefined : color
            }
            opacity={
              variant === "contained" && color !== "white" ? undefined : 0.25
            }
          />
        )}
      </LinkComponent>
    );
  }
);

Button.displayName = "Button";

export default Button;
