import { Grid} from "@mui/material";
import { Layout } from '../layout/Layout';
import { Section, SectionText, SectionTitle } from '../styles/GlobalComponents';
import { StyledTextField } from "../components/ContactMe/ContactMe";
import Button from '../styles/GlobalComponents/Button';
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import React from "react";

const Widgets = () => {

    const { user, loading} = useAuth();
    const router = useRouter();

  return (
    <Layout>
      <Section>
        <SectionTitle>Widgets</SectionTitle>
        <SectionText>A collection of tools that I was too curious not to make</SectionText>
      </Section>
    </Layout>
  );
};

export default Widgets;