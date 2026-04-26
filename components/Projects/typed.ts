import * as React from "react";
import * as PS from "./ProjectsStyles";

export interface HeaderThreeProps extends React.HTMLAttributes<HTMLHeadingElement> {
  $title?: boolean;
  $color?: string;
}

export const Img = PS.Img as unknown as React.ComponentType<
  React.ImgHTMLAttributes<HTMLImageElement>
>;

export const GridContainer = PS.GridContainer as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLElement>>
>;

export const BlogCard = PS.BlogCard as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>;

export const TitleContent = PS.TitleContent as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>;

export const HeaderThree = PS.HeaderThree as unknown as React.ComponentType<
  React.PropsWithChildren<HeaderThreeProps>
>;

export const Hr = PS.Hr as unknown as React.ComponentType<
  React.HTMLAttributes<HTMLHRElement>
>;

export const Intro = PS.Intro as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>;

export const CardInfo = PS.CardInfo as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>
>;

export const UtilityList = PS.UtilityList as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>
>;

export const ExternalLinks = PS.ExternalLinks as unknown as React.ComponentType<
  React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>
>;

export const TagList = PS.TagList as unknown as React.ComponentType<
  React.PropsWithChildren<React.HTMLAttributes<HTMLUListElement>>
>;
