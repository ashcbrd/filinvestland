"use client";

import { Button, Container, Stack } from "@mui/material";
import MainNavigation from "@/components/navigation/MainNavigation";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <>
      <MainNavigation className="bg-royal-dark-blue bg-opacity-40" />
      <div className="pb-32 pt-64">
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <h1 className="mt-6 text-center text-6xl font-bold text-oxford-blue">
            Oops, Something went wrong!
          </h1>
          <p
            className="mt-6 text-center text-white"
            style={{
              background: "#FF5555",
              width: "fit-content",
              margin: "32px auto",
              padding: "8px 32px",
              borderRadius: 25,
            }}
          >
            Error: {error?.message}
          </p>
          <Stack
            direction="row"
            gap={2}
            justifyItems="center"
            sx={{ justifyContent: "center" }}
          >
            <Button
              variant="contained"
              sx={{ bgcolor: "#012B72" }}
              size="large"
              onClick={() => reset()}
            >
              Retry
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#012B72" }}
              size="large"
              onClick={() => history.back()}
            >
              Go Back
            </Button>
          </Stack>
          <p className="mt-12 text-center text-sm">
            If the problem persists or you need further assistance, please reach
            out to our{" "}
            <a
              className="text-red-500 hover:cursor-pointer"
              href="https://beta.filinvestland.com/contact-us"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "underline" }}
            >
              Support Team
            </a>
            . Our team is here to help you resolve this issue as quickly as
            possible.
          </p>
        </Container>
      </div>
    </>
  );
};

export default error;
