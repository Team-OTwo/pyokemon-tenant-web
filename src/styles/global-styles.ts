import { createGlobalStyle } from "styled-components"

import cssAntd from "./antd/styled-css"

const styled = { createGlobalStyle }

const GlobalStyles = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    border: 0 solid #e5e7eb;
  }

  :root {
    --container-width: 1440px;

    --header-height: 70px;
    --footer-height: 3.5rem;

    --header-spacing-left: 28px;
    --header-spacing-right: 28px;

    --body-spacing-left: 40px;
    --body-spacing-right: 40px;
  }

  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    font-family: "Spoqa Han Sans Neo", sans-serif;
    font-feature-settings: normal;
    font-variation-settings: normal;

    -webkit-tap-highlight-color: transparent;
  }

  body {
    margin: 0;
    line-height: inherit;

    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    min-height: 100svh;
  }

  #root {
    min-height: 100svh;
  }

  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  input:where([type="button"]),
  input:where([type="reset"]),
  input:where([type="submit"]) {
    appearance: button;
    background-color: transparent;
    background-image: none;
  }

  summary {
    display: list-item;
  }

  blockquote,
  dd,
  dl,
  figure,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  pre {
    margin: 0;
  }

  fieldset {
    margin: 0;
  }

  fieldset,
  legend {
    padding: 0;
  }

  menu,
  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  dialog {
    padding: 0;
  }

  textarea {
    resize: vertical;
  }

  [role="button"],
  button {
    cursor: pointer;
  }

  :disabled {
    cursor: default;
  }

  audio,
  canvas,
  embed,
  iframe,
  img,
  object,
  svg,
  video {
    display: block;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  [hidden] {
    display: none;
  }

  // antd styles override
  ${cssAntd}
`

export default GlobalStyles
