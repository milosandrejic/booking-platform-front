import { ThemeProvider } from "@booking-platform-shared/theme";
import { Typography, Container, Button, Box, Divider, Avatar, Badge, Chip } from "@booking-platform-shared/ui";

function App() {
  return (
    <ThemeProvider>
      <Container maxWidth="xl">
        <Typography variant="headlineLarge">Admin Portal</Typography>
        <Typography variant="bodyLarge">
          System administration and platform management dashboard.
        </Typography>

        <Divider style={{ marginTop: 24 }}>
          Platform Overview
        </Divider>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={4}
          mt={6}
        >
          <Box p={6} bgcolor="background.subtle" borderRadius={12}>
            <Typography variant="titleLarge">Users</Typography>
            <Typography variant="headlineSmall" color="primary">1,247</Typography>
          </Box>
          <Box p={6} bgcolor="background.subtle" borderRadius={12}>
            <Typography variant="titleLarge">Properties</Typography>
            <Typography variant="headlineSmall" color="primary">342</Typography>
          </Box>
          <Box p={6} bgcolor="background.subtle" borderRadius={12}>
            <Typography variant="titleLarge">Bookings</Typography>
            <Typography variant="headlineSmall" color="primary">5,891</Typography>
          </Box>
        </Box>

        <Box display="flex" gap={4} mt={8}>
          <Button variant="filled">User Management</Button>
          <Button variant="outlined">Property Approval</Button>
          <Button variant="text">System Settings</Button>
        </Box>

        <Divider style={{ marginTop: 32 }}>UI Components</Divider>

        <Box display="flex" gap={4} alignItems="center" mt={6}>
          <Avatar name="Ada Lovelace" />
          <Avatar src="https://i.pravatar.cc/40?img=68" alt="Avatar" />

          <Badge badgeContent={7} color="primary">
            <span style={{ display: "inline-block", width: 28, height: 28, background: "var(--color-grey-300)", borderRadius: 6 }} />
          </Badge>

          <Chip label="Active" color="success" />
          <Chip label="Beta" variant="outlined" color="info" />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;