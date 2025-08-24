import { Typography, Container, Button, Box, Divider, Avatar, Badge, Chip } from "@booking-platform-shared/ui";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Typography variant="displayMedium">Welcome to Storefront Portal</Typography>
      <Typography variant="bodyLarge">
        Find and book amazing accommodations for your next trip.
      </Typography>

      <Divider style={{ marginTop: 24 }}>Featured</Divider>

      <Box display="flex" gap={4} alignItems="center" mt={6}>
        <Avatar name="Grace Hopper" />
        <Badge badgeContent={3} color="secondary">
          <span style={{ display: "inline-block", width: 28, height: 28, background: "var(--color-grey-300)", borderRadius: 6 }} />
        </Badge>
        <Chip label="New" color="info" />
      </Box>

      <Button variant="filled" size="large" style={{ marginTop: 24 }}>
        Start Exploring
      </Button>
    </Container>
  );
}
