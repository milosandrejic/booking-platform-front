import { Typography, Container, Button, Box, Divider, Avatar, Badge, Chip } from "@booking-platform-shared/ui";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="headlineLarge">Owner Portal Dashboard</Typography>
      <Typography variant="bodyLarge">
        Manage your properties, bookings, and guest communications.
      </Typography>
      <Typography variant="titleLarge">Quick Actions</Typography>
      <Box display="flex" gap={4} mt={6}>
        <Button variant="filled">Add New Property</Button>
        <Button variant="outlined">View Bookings</Button>
        <Button variant="text">Analytics</Button>
      </Box>

      <Divider style={{ marginTop: 24 }}>Overview</Divider>

      <Box display="flex" gap={4} alignItems="center" mt={6}>
        <Avatar name="Linus" />
        <Badge badgeContent={12} color="success">
          <span style={{ display: "inline-block", width: 28, height: 28, background: "var(--color-grey-300)", borderRadius: 6 }} />
        </Badge>
        <Chip label="Verified" color="success" />
      </Box>
      <Typography variant="bodyMedium" color="primary" style={{ marginTop: "32px" }}>
        Welcome back! You have 3 new booking requests and 2 messages waiting.
      </Typography>
    </Container>
  );
}
