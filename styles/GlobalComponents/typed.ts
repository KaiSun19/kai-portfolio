import * as React from "react";
import * as GlobalComponents from "./index";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  grid?: boolean;
  row?: boolean;
  nopadding?: boolean;
}

export interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  main?: boolean;
}

export interface SectionTextProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  colorAlt?: boolean;
  divider?: boolean;
}

export interface SectionSubTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: string;
}

export interface SecondaryBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $header?: boolean;
}

export interface ButtonBackProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: boolean;
  form?: boolean;
  disabled?: boolean;
}

export interface ButtonFrontProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  alt?: boolean;
  disabled?: boolean;
}

export interface LinkContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  large?: boolean;
}

export interface LinkIconImgProps extends React.HTMLAttributes<HTMLDivElement> {
  large?: boolean;
  nav?: boolean;
}

export const Section =
  GlobalComponents.Section as unknown as React.ComponentType<
    React.PropsWithChildren<SectionProps>
  >;

export const SectionTitle =
  GlobalComponents.SectionTitle as unknown as React.ComponentType<
    React.PropsWithChildren<SectionTitleProps>
  >;

export const SectionText =
  GlobalComponents.SectionText as unknown as React.ComponentType<
    React.PropsWithChildren<SectionTextProps>
  >;

export const SectionDivider =
  GlobalComponents.SectionDivider as unknown as React.ComponentType<
    React.PropsWithChildren<SectionDividerProps>
  >;

export const SectionSubText =
  GlobalComponents.SectionSubText as unknown as React.ComponentType<
    React.PropsWithChildren<SectionSubTextProps>
  >;

export const SecondaryBtn =
  GlobalComponents.SecondaryBtn as unknown as React.ComponentType<
    React.PropsWithChildren<SecondaryBtnProps>
  >;

export const ButtonBack =
  GlobalComponents.ButtonBack as unknown as React.ComponentType<
    React.PropsWithChildren<ButtonBackProps>
  >;

export const ButtonFront =
  GlobalComponents.ButtonFront as unknown as React.ComponentType<
    React.PropsWithChildren<ButtonFrontProps>
  >;

export const LinkContainer =
  GlobalComponents.LinkContainer as unknown as React.ComponentType<
    React.PropsWithChildren<LinkContainerProps>
  >;

export const LinkIconImg =
  GlobalComponents.LinkIconImg as unknown as React.ComponentType<
    React.PropsWithChildren<LinkIconImgProps>
  >;
