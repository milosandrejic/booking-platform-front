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
import { Search, Favorite } from "@mui/icons-material";

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Booking Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Discover amazing properties for your next adventure
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Featured Properties
              </Typography>
              <Typography variant="h3" color="primary">
                1,247
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amazing places to stay
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Happy Guests
              </Typography>
              <Typography variant="h3" color="secondary">
                45k+
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Satisfied travelers
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Cities Available
              </Typography>
              <Typography variant="h3" color="primary">
                230
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Worldwide destinations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Search />}
          sx={{ mr: 2 }}
        >
          Search Properties
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Favorite />}
        >
          View Favorites
        </Button>
      </Box>
    </Container>
  );
};
