import Grid from "./Grid";

export default {
  title: "Layout/Grid",
  component: Grid,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    container: {
      control: "boolean",
      description: "If true, the component will have the container layout styles",
    },
    item: {
      control: "boolean",
      description: "If true, the component will have the item layout styles",
    },
    spacing: {
      control: "select",
      options: [0,
        1,
        2,
        3,
        4,
        6,
        8],
      description: "Defines spacing between items in the grid",
    },
    xs: {
      control: "select",
      options: [1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12],
      description: "Number of columns for extra small screens",
    },
    sm: {
      control: "select",
      options: [1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12],
      description: "Number of columns for small screens",
    },
    md: {
      control: "select",
      options: [1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12],
      description: "Number of columns for medium screens",
    },
    lg: {
      control: "select",
      options: [1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12],
      description: "Number of columns for large screens",
    },
    xl: {
      control: "select",
      options: [1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12],
      description: "Number of columns for extra large screens",
    },
    children: {
      control: false,
    },
  },
};

export const Container = {
  args: {
    container: true,
    spacing: 2,
    children:(
      <>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#f0f0f0", padding: "20px", textAlign: "center" }}>
            Item 1
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#e0e0e0", padding: "20px", textAlign: "center" }}>
            Item 2
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#d0d0d0", padding: "20px", textAlign: "center" }}>
            Item 3
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#c0c0c0", padding: "20px", textAlign: "center" }}>
            Item 4
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#b0b0b0", padding: "20px", textAlign: "center" }}>
            Item 5
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ backgroundColor: "#a0a0a0", padding: "20px", textAlign: "center" }}>
            Item 6
          </div>
        </Grid>
      </>
    ),
  },
};

export const ResponsiveItems = {
  args: {
    container: true,
    spacing: 3,
    children: (
      <>
        <Grid item xs={12} md={8}>
          <div style={{ backgroundColor: "#003580", color: "white", padding: "24px", textAlign: "center" }}>
            Main Content (xs=12, md=8)
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div style={{ backgroundColor: "#0056CC", color: "white", padding: "24px", textAlign: "center" }}>
            Sidebar (xs=12, md=4)
          </div>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <div style={{ backgroundColor: "#E7F3FF", color: "#003580", padding: "16px", textAlign: "center" }}>
            Col 1
          </div>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <div style={{ backgroundColor: "#CCE7FF", color: "#003580", padding: "16px", textAlign: "center" }}>
            Col 2
          </div>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <div style={{ backgroundColor: "#B3DBFF", color: "#003580", padding: "16px", textAlign: "center" }}>
            Col 3
          </div>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <div style={{ backgroundColor: "#99CFFF", color: "#003580", padding: "16px", textAlign: "center" }}>
            Col 4
          </div>
        </Grid>
      </>
    ),
  },
};

export const DifferentSpacing = {
  args: {
    container: true,
    spacing: 8,
    children: (
      <>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#003580", color: "white", padding: "16px", textAlign: "center" }}>
            Large Spacing
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#0056CC", color: "white", padding: "16px", textAlign: "center" }}>
            Between
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{ backgroundColor: "#003580", color: "white", padding: "16px", textAlign: "center" }}>
            Items
          </div>
        </Grid>
      </>
    ),
  },
};

export const NestedGrids = {
  args: {
    container: true,
    spacing: 2,
    children: (
      <>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#E7F3FF", padding: "16px" }}>
            <h3 style={{ margin: "0 0 16px 0" }}>Nested Grid 1</h3>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <div style={{ backgroundColor: "#003580", color: "white", padding: "12px", textAlign: "center" }}>
                  Nested 1
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ backgroundColor: "#0056CC", color: "white", padding: "12px", textAlign: "center" }}>
                  Nested 2
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ backgroundColor: "#CCE7FF", padding: "16px" }}>
            <h3 style={{ margin: "0 0 16px 0" }}>Nested Grid 2</h3>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <div style={{ backgroundColor: "#003580", color: "white", padding: "12px", textAlign: "center" }}>
                  A
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ backgroundColor: "#0056CC", color: "white", padding: "12px", textAlign: "center" }}>
                  B
                </div>
              </Grid>
              <Grid item xs={4}>
                <div style={{ backgroundColor: "#003580", color: "white", padding: "12px", textAlign: "center" }}>
                  C
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </>
    ),
  },
};
