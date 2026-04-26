import React from "react";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { Container } from "./LayoutStyles";

interface LayoutProps {
  children: React.ReactNode;
  shortContent?: boolean;
}

export const Layout = ({ children, shortContent = false }: LayoutProps) => {
  return (
    <Container className={shortContent ? "short-content" : undefined}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </Container>
  );
};
