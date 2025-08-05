import Container from "./Container";

export default {
  title: "Layout/Container",
  component: Container,
};

export const Default = {
  args: {
    children: <div style={{ backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px" }}>Container Content</div>,
  },
};

export const Small = {
  args: {
    maxWidth: "sm",
    children: <div style={{ backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px" }}>Small Container</div>,
  },
};

export const Medium = {
  args: {
    maxWidth: "md",
    children: <div style={{ backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px" }}>Medium Container</div>,
  },
};

export const Large = {
  args: {
    maxWidth: "lg", 
    children: <div style={{ backgroundColor: "#e3f2fd", padding: "20px", borderRadius: "8px" }}>Large Container</div>,
  },
};
