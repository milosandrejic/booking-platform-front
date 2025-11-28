import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Dashboard, People, Settings } from "@mui/icons-material";

function App() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Platform management and oversight
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h3" color="primary">
                12,847
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Registered users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Properties
              </Typography>
              <Typography variant="h3" color="secondary">
                3,204
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Listed properties
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
                $284k
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Platform earnings
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<Dashboard />}
          sx={{ mr: 2 }}
        >
          View Analytics
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<People />}
          sx={{ mr: 2 }}
        >
          Manage Users
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Settings />}
        >
          Settings
        </Button>
      </Box>
    </Container>
  );
}

export default App;
