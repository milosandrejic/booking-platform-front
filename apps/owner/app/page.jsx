import { Typography, Container, Button, Box, Divider, Avatar, Badge, Chip } from "@booking-platform-shared/ui";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="headlineLarge">Owner Portal Dashboard</Typography>
      <Typography variant="bodyLarge">
        Manage your properties, bookings, and guest communications.
      </Typography>
      <Typography variant="titleLarge">Quick Actions</Typography>
      <Box sx={{
        display: "flex",
        marginTop: "20px",
        gap: "30px"
      }}>
        <Button variant="filled">Add New Property</Button>
        <Button variant="outlined">View Bookings</Button>
        <Button variant="text">Analytics</Button>
      </Box>

      <Divider style={{ marginTop: 24 }}>Overview</Divider>

      <Typography variant="bodyMedium" color="primary" style={{ marginTop: "32px" }}>
        Welcome back! You have 3 new booking requests and 2 messages waiting.
      </Typography>
    </Container>
  );
}
