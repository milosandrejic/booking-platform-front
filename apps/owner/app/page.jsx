import { Typography, Container, Button, Box, Avatar, Card, TextField, CardContent } from "@booking-platform-shared/ui";
import Image from "next/image";

export default function Home() {
  return (
    <Box sx={{
      minHeight: "100vh",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* Background Image with Blur */}
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
      }}>
        <Image
          src="/images/auth-bg.jpg"
          alt="Background"
          fill
          style={{
            objectFit: "cover",
            filter: "blur(8px)",
            transform: "scale(1.1)"
          }}
          priority
        />
        {/* Dark overlay for better text readability */}
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        }} />
      </Box>

      {/* Centered Login-style Card */}
      <Container maxWidth="md" sx={{ margin: "0 auto", height: "100vh" }}>
        <Card
          sx={{
            width: 400,
            height: 600
          }}
        >
          <CardContent>
            content
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
