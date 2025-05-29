import { HTMLAttributes } from "react";
import { color } from "../Type";

interface MoreProps {
  fontSize?: number;
  color?: color;
}

export type IconProps = MoreProps & HTMLAttributes<SVGSVGElement>;
