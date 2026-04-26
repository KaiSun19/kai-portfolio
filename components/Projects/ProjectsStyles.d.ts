import * as React from "react";

export const Img: React.ComponentType<
  React.ImgHTMLAttributes<HTMLImageElement>
>;
export const GridContainer: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
>;
export const BlogCard: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>;
export const TitleContent: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>;

export interface HeaderThreeProps extends React.HTMLAttributes<HTMLHeadingElement> {
  $title?: boolean;
  $color?: string;
}
export const HeaderThree: React.ComponentType<
  React.PropsWithChildren<HeaderThreeProps>
>;

export const Hr: React.ComponentType<React.HTMLAttributes<HTMLHRElement>>;
export const Intro: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>;
export const CardInfo: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>
>;
export const UtilityList: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>
>;
export const ExternalLinks: React.ComponentType<
  React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>;
export const TagList: React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>
>;
