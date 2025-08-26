import "./Container.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export type ContainerMax = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ContainerSpacing = "compact" | "default" | "comfortable";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerMax;
  fixed?: boolean;
  disableGutters?: boolean;
  spacing?: ContainerSpacing;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

export const Container = ({ 
  children, 
  maxWidth = "xl", 
  className = "",
  style = {},
  sx,
  fixed = false,
  disableGutters = false,
  spacing = "default",
  ...props 
}: ContainerProps) => {
  const theme = useTheme();
  const classes = [
    "container",
    `container--maxWidth-${maxWidth}`,
    fixed && "container--fixed",
    disableGutters && "container--disableGutters",
    !disableGutters && spacing !== "default" && `container--spacing-${spacing}`,
    className?.trim() || null
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      style={{ ...style, ...resolveSx(theme, sx) }}
      {...props}
    >
      {children}
    </div>
  );
};
