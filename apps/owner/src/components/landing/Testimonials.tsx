import { Star } from "@mui/icons-material";
import {
  Box,
  Grid,
  Avatar,
  Container,
  Typography
} from "@mui/material";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Villa Owner, Bali",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "This platform has transformed my property business. I've increased my bookings by 300% in just 6 months!",
  },
  {
    name: "Michael Chen",
    role: "Apartment Owner, Tokyo",
    image: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    text: "The management tools are intuitive and powerful. I can handle multiple properties effortlessly.",
  },
  {
    name: "Emma Rodriguez",
    role: "Hotel Owner, Barcelona",
    image: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    text: "Excellent support team and great visibility for my properties. Highly recommend to fellow owners!",
  },
];

export function Testimonials() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
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
            What our partners say
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Join thousands of satisfied property owners
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {
            testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Box
                  sx={{
                    p: 4,
                    height: "100%",
                    bgcolor: "white",
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box sx={{ display: "flex", mb: 2 }}>
                    {
                      [...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} sx={{ color: "warning.main", fontSize: 20 }} />
                      ))}
                  </Box>

                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, fontStyle: "italic" }}
                  >
                    &quot;{testimonial.text}&quot;
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar
                      src={testimonial.image}
                      alt={testimonial.name}
                      sx={{ width: 56, height: 56 }}
                    />

                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
