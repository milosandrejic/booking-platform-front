import { Box } from "@mui/material";

import {
  Hero,
  Footer,
  Header,
  Features,
  HowItWorks,
  CallToAction,
  Testimonials,
} from "@/components/landing";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <Box component="main">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
      </Box>
      <Footer />
    </Box>
  );
}
