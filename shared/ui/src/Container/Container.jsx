import "./Container.scss";

/**
 * Responsive layout container that constrains content width and manages horizontal gutters.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Content inside the container.
 * @param {('xs'|'sm'|'md'|'lg'|'xl'|'2xl')} [props.maxWidth='xl'] - Max width breakpoint.
 * @param {boolean} [props.fixed=false] - Use fixed max-widths instead of fluid.
 * @param {boolean} [props.disableGutters=false] - Remove horizontal padding.
 * @param {('compact'|'default'|'comfortable')} [props.spacing='default'] - Vertical spacing preset.
 * @param {string} [props.className] - Additional class names.
 * @param {React.CSSProperties} [props.style] - Inline styles.
 * @returns {JSX.Element}
 */
export const Container = ({ 
  children, 
  maxWidth = "xl", 
  className = "",
  style = {},
  fixed = false,
  disableGutters = false,
  spacing = "default", // "compact" | "default" | "comfortable"
  ...props 
}) => {
  const classes = [
    "container",
    `container--maxWidth-${maxWidth}`,
    fixed && "container--fixed",
    disableGutters && "container--disableGutters",
    spacing !== "default" && `container--spacing-${spacing}`,
    className
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style} {...props}>
      {children}
    </div>
  );
};
