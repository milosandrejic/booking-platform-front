import {
  Box,
  Card,
  Grid,
  Container,
  Typography,
  CardContent
} from "@mui/material";
import {
  Shield,
  Support,
  Payments,
  Analytics,
  TrendingUp,
  CalendarMonth
} from "@mui/icons-material";

const features = [
  {
    icon: TrendingUp,
    title: "Increase Your Earnings",
    description:
      "Reach millions of travelers worldwide and maximize your property's potential revenue.",
  },
  {
    icon: CalendarMonth,
    title: "Easy Booking Management",
    description:
      "Manage your calendar, rates, and availability from one intuitive dashboard.",
  },
  {
    icon: Shield,
    title: "Secure & Safe",
    description:
      "Your property and payments are protected with industry-leading security measures.",
  },
  {
    icon: Support,
    title: "24/7 Support",
    description:
      "Get help whenever you need it with our dedicated partner support team.",
  },
  {
    icon: Payments,
    title: "Fast Payments",
    description:
      "Receive your earnings quickly and securely with multiple payment options.",
  },
  {
    icon: Analytics,
    title: "Powerful Analytics",
    description:
      "Track your performance with detailed insights and reporting tools.",
  },
];

export function Features() {
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
            Why list with us?
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Everything you need to successfully manage and grow your property
            business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {
            features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Card
                    sx={{
                      height: "100%",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: 4,
                      },
                    }}
                  > 
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          bgcolor: "primary.main",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 3,
                        }}
                      >
                        <Icon sx={{ fontSize: 32 }} />
                      </Box>

                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        {feature.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Box>
  );
}
