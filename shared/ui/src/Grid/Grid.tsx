import "./Grid.scss";

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
  ...props
}: GridProps) => {
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
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};
