"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineBranches,
} from "react-icons/ai";
import { DiCssdeck } from "react-icons/di";
import { GoGear } from "react-icons/go";

import {
  Container,
  Div1,
  Div2,
  Div3,
  Div4,
  NavLink,
  SocialIcons,
  Span,
} from "./HeaderStyles";
import { SecondaryBtn } from "../../styles/GlobalComponents";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import AlertFlash from "../Alert/Alert";
import HeaderMenu from "../Menu/Menu";

const Header = () => {
  const { user, setUser, authAlertOpen, setAuthAlertOpen } = useAuth();
  const router = useRouter();

  const [menuRef, setMenuRef] = useState(null);

  const handleMenuOpen = (e) => {
    if (menuRef) {
      setMenuRef(null);
    } else {
      setMenuRef(e.currentTarget);
    }
  };

  const handleAuthAlertClose = () => {
    setAuthAlertOpen(false);
  };

  const logout = async () => {
    router.push("/");
    setUser(null);
    sessionStorage.clear();
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.ok) {
      console.log("Logged out");
      setAuthAlertOpen(true);
    }
    return;
  };

  const goToWidgets = () => {
    router.push("/widgets");
  };

  const menuElements = user
    ? [
        {
          label: "Widgets",
          icon: <AiOutlineBranches size="2rem" />,
          action: () => {
            goToWidgets();
          },
        },
        {
          label: "Log Out",
          icon: <AiOutlineLogout size="2rem" />,
          action: async () => {
            await logout();
          },
        },
      ]
    : [
        {
          label: "Log In",
          icon: <AiOutlineLogin size="2rem" />,
          action: async () => {
            router.push("/login");
          },
        },
        {
          label: "Register",
          action: async () => {
            router.push("/register");
          },
        },
      ];

  return (
    <Container>
      <Div1>
        <Link
          href="/"
          style={{ display: "flex", justifyContent: "center", color: "white" }}
        >
          <DiCssdeck size="3rem" />
          <Span>kaidev</Span>
        </Link>
      </Div1>
      <Div2>
        <li>
          <NavLink href="#projects">Projects</NavLink>
        </li>
        <li>
          <NavLink href="#tech">Technologies</NavLink>
        </li>
        <li>
          <NavLink href="#about">About</NavLink>
        </li>
        <li>
          <NavLink href="#contact">Contact</NavLink>
        </li>
      </Div2>
      <Div3>
        <SocialIcons href="https://github.com/KaiSun19">
          <AiFillGithub size="3rem" />
        </SocialIcons>
        <SocialIcons href="https://www.linkedin.com/in/yuankai-sun-2a26011b8/">
          <AiFillLinkedin size="3rem" />
        </SocialIcons>
      </Div3>

      <Div4>
        <>
          <SecondaryBtn $header onClick={handleMenuOpen}>
            <GoGear size="3rem" />
          </SecondaryBtn>
          <HeaderMenu
            open={menuRef !== null}
            onCloseHandler={handleMenuOpen}
            anchor={menuRef}
          >
            {menuElements}
          </HeaderMenu>
        </>
      </Div4>
      <AlertFlash
        open={authAlertOpen}
        onCloseHandler={handleAuthAlertClose}
        type="info"
        message={authAlertOpen}
      />
    </Container>
  );
};

export default Header;
