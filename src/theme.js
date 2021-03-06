import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "antiquewhite",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#282828",
  fontColor: "#ffff",
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body};
	}
 `;
