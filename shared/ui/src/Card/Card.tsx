import { forwardRef } from "react";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { resolveSx, type SxProps } from "../utils/sx";
import "./Card.scss";

type BaseProps = {
  className?: string;
  sx?: SxProps;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "style">;

export type CardProps = BaseProps & {
  shadow?: "none" | "sm" | "md" | "lg";
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props, ref) {
  const { className, shadow = "md", sx, style: styleProp, children, ...rest } = props;
  const { styles, className: sxClassName } = resolveSx(sx);

  const classes = [
    "card",
    shadow === "none" ? "card--shadow-none" : undefined,
    shadow === "sm" ? "card--shadow-sm" : undefined,
    shadow === "md" ? "card--shadow-md" : undefined,
    shadow === "lg" ? "card--shadow-lg" : undefined,
    sxClassName,
    className,
  ].filter(Boolean).join(" ");

  const style: CSSProperties = { ...styleProp, ...styles };

  return (
    <div
      ref={ref}
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export type CardSectionProps = BaseProps;

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader(props, ref) {
  const { className, sx, style: styleProp, children, ...rest } = props;
  const { styles, className: sxClassName } = resolveSx(sx);
  const style: CSSProperties = { ...styleProp, ...styles };

  return (
    <div
      ref={ref}
      className={["card__header", sxClassName, className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardContent = forwardRef<HTMLDivElement, CardSectionProps>(function CardContent(props, ref) {
  const { className, sx, style: styleProp, children, ...rest } = props;
  const { styles, className: sxClassName } = resolveSx(sx);
  const style: CSSProperties = { ...styleProp, ...styles };

  return (
    <div
      ref={ref}
      className={["card__content", sxClassName, className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export const CardActions = forwardRef<HTMLDivElement, CardSectionProps>(function CardActions(props, ref) {
  const { className, sx, style: styleProp, children, ...rest } = props;
  const { styles, className: sxClassName } = resolveSx(sx);
  const style: CSSProperties = { ...styleProp, ...styles };

  return (
    <div
      ref={ref}
      className={["card__actions", sxClassName, className].filter(Boolean).join(" ")}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
});

export default undefined;
