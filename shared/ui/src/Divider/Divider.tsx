import "./Divider.scss";
import { resolveSx, type SxProps } from "../utils/sx";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerTextAlign = "left" | "center" | "right";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: DividerOrientation;
  children?: React.ReactNode;
  flexItem?: boolean;
  textAlign?: DividerTextAlign;
  sx?: SxProps;
}

/**
 * Divider: separates content with a thin line. Supports orientation, optional label, flexItem and text alignment.
 */
export function Divider({
  orientation = "horizontal",
  children,
  flexItem = false,
  textAlign = "center",
  className = "",
  role = "separator",
  style,
  sx,
  ...rest
}: DividerProps) {
  const { styles, className: sxClassName } = resolveSx(sx);
  const hasLabel = Boolean(children) && orientation === "horizontal";

  const classes = [
    "divider",
    `divider--orientation-${orientation}`,
    hasLabel ? "divider--with-children" : null,
    orientation === "horizontal" ? `divider--text-align-${textAlign}` : null,
    flexItem ? "divider--flex-item" : null,
    sxClassName,
    className?.trim() || null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      role={role}
      aria-orientation={orientation}
      style={{ ...style, ...styles }}
      {...rest}
    >
      {
        hasLabel &&
        <span className="divider__label">
          {children}
        </span>
      }
    </div>
  );
}

export default undefined;
