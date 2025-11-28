import Image from "next/image";

import {
  Box,
  Button,
  Toolbar,
  Container
} from "@mui/material";

export function Header() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        bgcolor: "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: "space-between", py: 2 }}>
          <Box
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.svg"
              alt="BookingPlatform Logo"
              width={100}
              height={100}
              priority
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              size="large"
            >
              List Your Property
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                fontWeight: 600,
                borderColor: "white",
                borderWidth: 2,
                color: "white",
                "&:hover": {
                  borderColor: "white",
                  borderWidth: 2,
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
}
