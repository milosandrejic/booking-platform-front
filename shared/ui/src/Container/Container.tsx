import "./Container.scss";

export type ContainerMax = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type ContainerSpacing = "compact" | "default" | "comfortable";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: ContainerMax;
  fixed?: boolean;
  disableGutters?: boolean;
  spacing?: ContainerSpacing;
  className?: string;
  style?: React.CSSProperties;
}

export const Container = ({ 
  children, 
  maxWidth = "xl", 
  className = "",
  style = {},
  fixed = false,
  disableGutters = false,
  spacing = "default",
  ...props 
}: ContainerProps) => {
  const classes = [
    "container",
    `container--maxWidth-${maxWidth}`,
    fixed && "container--fixed",
    disableGutters && "container--disableGutters",
    spacing !== "default" && `container--spacing-${spacing}`,
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
