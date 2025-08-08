import "./Grid.scss";

/**
 * Simple responsive grid system. Use container on parent and item on children.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Grid content.
 * @param {boolean} [props.container=false] - Marks the element as a grid container.
 * @param {boolean} [props.item=false] - Marks the element as a grid item.
 * @param {number} [props.spacing=0] - Spacing scale between items (e.g., 0–6).
 * @param {number} [props.xs] - Columns (1–12) on extra-small screens.
 * @param {number} [props.sm] - Columns (1–12) on small screens.
 * @param {number} [props.md] - Columns (1–12) on medium screens.
 * @param {number} [props.lg] - Columns (1–12) on large screens.
 * @param {number} [props.xl] - Columns (1–12) on extra-large screens.
 * @param {string} [props.className] - Additional class names.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element}
 */
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
