"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Owner Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Welcome to your property management dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Properties
              </Typography>
              <Typography variant="h3" color="primary">
                24
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Bookings
              </Typography>
              <Typography variant="h3" color="secondary">
                12
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Monthly Revenue
              </Typography>
              <Typography variant="h3" color="primary">
                $8,420
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ mr: 2 }}
        >
          Add New Property
        </Button>
        <Button
          variant="outlined"
          size="large"
        >
          View All Bookings
        </Button>
      </Box>
    </Container>
  );
};
