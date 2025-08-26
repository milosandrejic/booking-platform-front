import "./Grid.scss";
import { useTheme } from "@booking-platform-shared/theme";
import { resolveSx, type SxProps } from "../utils/sx";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  container?: boolean;
  item?: boolean;
  spacing?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  className?: string;
  style?: React.CSSProperties;
  sx?: SxProps;
}

export const Grid = ({
  children,
  container = false,
  item = false,
  spacing = 0,
  xs,
  sm,
  md,
  lg,
  xl,
  className = "",
  style = {},
  sx,
  ...props
}: GridProps) => {
  const theme = useTheme();
  const classes = [
    "grid",
    container && "grid--container",
    item && "grid--item",
    container && spacing > 0 && `grid--spacing-${spacing}`,
    item && xs && `grid--xs-${xs}`,
    item && sm && `grid--sm-${sm}`,
    item && md && `grid--md-${md}`,
    item && lg && `grid--lg-${lg}`,
    item && xl && `grid--xl-${xl}`,
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
