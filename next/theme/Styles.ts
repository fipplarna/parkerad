import { Color } from "types/ColorTypes";

export const colors = {
  primary: "#5a9462" as Color,
  secondary: "#94704b" as Color,
  highlight: "#244729" as Color,
  text: "#F5F5F5" as Color,
  dark: "#222222" as Color,
  light: "#F5F5F5" as Color,
  lightTint: "rgba(255, 255, 255, 0.5)" as Color,
  darkTint: "rgba(0, 0, 0, 0.5)" as Color,
};

export const stdUnits = {
  px: 16,
};

export const shadows = {
  boxShadow: "5px 5px 5px rgb(57, 57, 57)",
};

export const borders = {
  solidBorder: "solid 1px",
};

export const animations = {
  linkHover: `@keyframes linkHover {
    from {
      color: unset;
    }
    to {
      color: ${colors.highlight};
    }
  }`,
};
