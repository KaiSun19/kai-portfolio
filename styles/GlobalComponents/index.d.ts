import * as React from "react";

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

export const Section: React.ComponentType<
  React.PropsWithChildren<SectionProps>
>;
export const SectionTitle: React.ComponentType<
  React.PropsWithChildren<SectionTitleProps>
>;
export const SectionText: React.ComponentType<
  React.PropsWithChildren<SectionTextProps>
>;
export const SectionDivider: React.ComponentType<
  React.PropsWithChildren<SectionDividerProps>
>;
export const SectionSubText: React.ComponentType<
  React.PropsWithChildren<SectionSubTextProps>
>;
export const SecondaryBtn: React.ComponentType<
  React.PropsWithChildren<SecondaryBtnProps>
>;
export const ButtonBack: React.ComponentType<
  React.PropsWithChildren<ButtonBackProps>
>;
export const ButtonFront: React.ComponentType<
  React.PropsWithChildren<ButtonFrontProps>
>;
export const LinkContainer: React.ComponentType<
  React.PropsWithChildren<LinkContainerProps>
>;
export const LinkIconImg: React.ComponentType<
  React.PropsWithChildren<LinkIconImgProps>
>;
