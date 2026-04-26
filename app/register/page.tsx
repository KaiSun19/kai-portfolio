"use client";

import { Grid } from "@mui/material";
import { Layout } from "../../layout/Layout";
import { Section, SectionTitle } from "../../styles/GlobalComponents/typed";
import { StyledTextField } from "../../components/ContactMe/ContactMe";
import Button from "../../styles/GlobalComponents/Button";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const Register = () => {
  const { setUser, setAuthAlertOpen } = useAuth();
  const router = useRouter();

  const [registerLoading, setRegisterLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isRegisterDisabled = useMemo(() => {
    return registerLoading || !username.trim() || !password.trim();
  }, [registerLoading, username, password]);

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isRegisterDisabled) return;

    const formData = {};

    Array.from(e.currentTarget.elements).forEach(
      (field: Element & { name?: string; value?: string }) => {
        if (!field.name) return;
        formData[field.name] = field.value;
      },
    );

    try {
      setRegisterLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setRegisterLoading(false);
        setUser(formData["username"]);
        const { token } = await res.json();
        sessionStorage.setItem("authToken", token);
        router.push("/");
        setAuthAlertOpen("Sign up successful");
      }
    } catch (error) {
      setRegisterLoading(false);
      console.error("Register error:", error);
      setAuthAlertOpen("Sign up failed");
    }
  }

  return (
    <Layout shortContent={true}>
      <Section>
        <SectionTitle>Register</SectionTitle>
        <form method="post" onSubmit={handleOnSubmit}>
          <Grid container spacing={3} className="register-form-grid">
            <Grid size={{ xs: 12, md: 12 }}>
              <StyledTextField
                placeholder="Username"
                variant="outlined"
                name="username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
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
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                fullWidth
                required
                className="contact-input"
              />
            </Grid>
            <Grid
              size={{ xs: 12, md: 12 }}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" disabled={isRegisterDisabled}>
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Section>
    </Layout>
  );
};

export default Register;
