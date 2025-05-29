import parse from "html-react-parser";
import { twMerge } from "tailwind-merge";
import style from "./unreset.module.css";

export interface PerseComponentProps {
  data: string;
  unresetTailwind?: boolean;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: any;
}
function PerseComponent({
  data,
  unresetTailwind,
  className,
  Component = "div",
}: PerseComponentProps) {
  return (
    <Component className={twMerge(unresetTailwind && style.unreset, className)}>
      {parse(data)}
    </Component>
  );
}

export default PerseComponent;
