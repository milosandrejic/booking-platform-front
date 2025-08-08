import "./Grid.scss";

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
}) => {
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
