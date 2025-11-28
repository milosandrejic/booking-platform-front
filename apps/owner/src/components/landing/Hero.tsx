import { ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Typography
} from "@mui/material";

export function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
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
          backgroundImage: "url('https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2070')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
          zIndex: 0,
        }}
      />
      
      {/* Overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(15,32,39,0.1) 0%, rgba(44,83,100,0.1) 100%)",
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem", lg: "4rem" },
              fontWeight: 700,
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            List your property and reach millions of guests
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              mb: 5,
              opacity: 0.95,
              fontWeight: 400,
            }}
          >
            Join thousands of property owners who trust us to help them earn more
            and manage their properties with ease
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Get Started
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                borderWidth: 2,
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "white",
                  borderWidth: 2,
                  bgcolor: "transparent",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          bgcolor: "rgba(255, 255, 255, 0.1)",
          display: { xs: "none", md: "block" },
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 400,
          height: 400,
          borderRadius: "50%",
          bgcolor: "rgba(255, 255, 255, 0.05)",
          display: { xs: "none", md: "block" },
        }}
      />
    </Box>
  );
}
