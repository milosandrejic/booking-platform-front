import { Home as HomeIcon } from "@mui/icons-material";
import {
  Box,
  Grid,
  Link,
  Container,
  Typography
} from "@mui/material";

const footerLinks = {
  Company: ["About Us", "Careers", "Press", "Blog"],
  Support: ["Help Center", "Safety Information", "Cancellation Options", "Trust & Safety"],
  Partner: ["List Your Property", "Partner Help", "Become an Affiliate", "Partner Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"],
};

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "grey.900",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <HomeIcon sx={{ fontSize: 32, color: "primary.light" }} />
              <Typography variant="h6" fontWeight={700}>
                BookingPlatform
              </Typography>
            </Box>

            <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              The world&apos;s leading property rental platform. List your property and
              reach millions of travelers worldwide.
            </Typography>
          </Grid>

          {
            Object.entries(footerLinks).map(([category, links]) => (
              <Grid size={{ xs: 6, sm: 3, md: 2 }} key={category}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {category}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {
                    links.map((link) => (
                      <Link
                        key={link}
                        href="#"
                        color="grey.400"
                        underline="hover"
                        sx={{
                          fontSize: "0.875rem",
                          "&:hover": { color: "white" },
                        }}
                      >
                        {link}
                      </Link>
                    ))}
                </Box>
              </Grid>
            ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: 1,
            borderColor: "grey.800",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} BookingPlatform. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
