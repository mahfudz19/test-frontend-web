import { VariantProps, cva } from "class-variance-authority";
import { HtmlHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export type PaperProps = HtmlHTMLAttributes<HTMLElement> &
  VariantProps<typeof variants>;

const variants = cva(
  ["border-gray-300", "outline-gray-300", "bg-white", "rounded-2xl"],
  {
    variants: {
      shadow: {
        transparent: ["shadow-transparent"],
        current: ["shadow-current"],
        inherit: ["shadow-inherit"],
        none: ["shadow-none"],
        inner: ["shadow-inner"],
        "2xl": ["shadow-2xl"],
        xl: ["shadow-xl"],
        lg: ["shadow-lg"],
        md: ["shadow-md"],
        sm: ["shadow-sm"],
        shadow: ["shadow"],
      },
    },
    defaultVariants: {
      shadow: "shadow",
    },
  }
);

const Paper = forwardRef<HTMLDivElement, PaperProps>(
  (props: PaperProps, ref) => {
    const { shadow, className, ...rest } = props;

    return (
      <div
        ref={ref}
        className={twMerge(variants({ shadow, className }))}
        {...rest}
      />
    );
  }
);

Paper.displayName = "Paper";

export default Paper;
