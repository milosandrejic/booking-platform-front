import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";

export function CallToAction() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.05,
          backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)",
          zIndex: 0,
        }}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem", lg: "3rem" },
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to get started?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.2rem" },
              mb: 4,
              opacity: 0.95,
            }}
          >
            Join thousands of property owners and start earning more today
          </Typography>

          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              color: "white",
              px: 5,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            List Your Property Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
