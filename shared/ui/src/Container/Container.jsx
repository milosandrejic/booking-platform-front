import "./Container.scss";

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
