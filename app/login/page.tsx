"use client";

import { Grid } from "@mui/material";
import { Layout } from "../../layout/Layout";
import {
  Section,
  SectionText,
  SectionTitle,
} from "../../styles/GlobalComponents";
import { StyledTextField } from "../../components/ContactMe/ContactMe";
import Button from "../../styles/GlobalComponents/Button";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const { setUser, setAuthAlertOpen } = useAuth();
  const router = useRouter();

  const [loginLoading, setLoginLoading] = useState(false);

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = {};
    Array.from(e.currentTarget.elements).forEach(
      (field: Element & { name?: string; value?: string }) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      },
    );

    try {
      setLoginLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setLoginLoading(false);
        setUser(formData["username"]);
        const { token } = await res.json();
        sessionStorage.setItem("authToken", token);
        router.push("/");
        setAuthAlertOpen("Log in successful");
      }
    } catch (error) {
      setLoginLoading(false);
      console.error("Login error:", error);
      setAuthAlertOpen("Log in failed");
    }
  }

  return (
    <Layout shortContent={true}>
      <Section>
        <SectionTitle>Log In</SectionTitle>
        <SectionText>
          This is my personal log in to access my random widgets I thought of
          making off the top of my head .
        </SectionText>
        <form method="post" onSubmit={handleOnSubmit}>
          <Grid container spacing={3} className="login-form-grid">
            <Grid size={{ xs: 12, md: 12 }}>
              <StyledTextField
                placeholder="Username"
                variant="outlined"
                name="username"
                fullWidth
                required
                className="contact-input"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 12 }}>
              <StyledTextField
                type="password"
                placeholder="Password"
                variant="outlined"
                name="password"
                fullWidth
                required
                className="contact-input"
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 12 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" disabled={loginLoading}>
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
      </Section>
    </Layout>
  );
};

export default Login;
