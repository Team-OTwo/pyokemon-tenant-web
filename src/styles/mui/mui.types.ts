declare module "@mui/material/Button" {
  interface ButtonPropsSizeOverrides {
    largest: true
  }

  interface ButtonPropsVariantOverrides {
    primary: true
    secondary: true
    gray: true
    link: true
    outlined: false
    contained: false
  }
}
