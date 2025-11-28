import {
  Box,
  Grid,
  Container,
  Typography
} from "@mui/material";

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up in minutes with your email and basic information.",
  },
  {
    number: "02",
    title: "Add Your Property",
    description: "Upload photos, set your prices, and describe your property.",
  },
  {
    number: "03",
    title: "Start Receiving Bookings",
    description: "Go live and start welcoming guests to your property.",
  },
];

export function HowItWorks() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "grey.50" }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              fontWeight: 700,
              mb: 2,
            }}
          >
            How it works
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Get started in just three simple steps
          </Typography>
        </Box>

        <Grid container spacing={6}>
          {
            steps.map((step, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Box sx={{ textAlign: "center", position: "relative" }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      fontSize: "2rem",
                      fontWeight: 700,
                    }}
                  >
                    {step.number}
                  </Box>

                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    {step.title}
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
