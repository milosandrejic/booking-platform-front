import { Container, Box, Card, CardContent } from "@booking-platform-shared/ui";
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
            filter: "blur(6px)",
          }}
          priority
        />
      </Box>

      {/* Centered Login-style Card */}
      <Container maxWidth="md" sx={{ margin: "0 auto", height: "100vh" }}>
        <Card
          shadow="lg"
          sx={{
            width: 600,
            height: 400,
            margin: "100px auto 0"
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
