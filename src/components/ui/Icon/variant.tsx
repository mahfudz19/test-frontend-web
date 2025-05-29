import { cva } from "class-variance-authority";

const variantsIcon = cva([], {
  variants: {
    color: {
      primary: ["text-blue-700"],
      secondary: ["text-gray-700"],
      success: ["text-green-700"],
      error: ["text-red-700"],
      warning: ["text-yellow-700"],
      info: ["text-sky-700"],
      white: ["text-white"],
    },
  },
});

export default variantsIcon;
