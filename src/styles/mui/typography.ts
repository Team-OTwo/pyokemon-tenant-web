import { TypographyOptions } from "@mui/material/styles/createTypography"

import { typography as designTypography } from "../design-tokens"

export const typography: TypographyOptions = {
  fontFamily: "inherit",
  h1: designTypography.h1,
  h2: designTypography.h2,
  h3: designTypography.h3,
  h3Bold: designTypography.h3Bold,
  h4: designTypography.h4,
  h4Bold: designTypography.h4Bold,
  h5: designTypography.h5,
  h5Medium: designTypography.h5Medium,
  h5Bold: designTypography.h5Bold,
  body: designTypography.body,
  bodyMedium: designTypography.bodyMedium,
  bodyBold: designTypography.bodyBold,
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    h3Bold: React.CSSProperties
    h4Bold: React.CSSProperties
    h5Medium: React.CSSProperties
    h5Bold: React.CSSProperties
    body: React.CSSProperties
    bodyMedium: React.CSSProperties
    bodyBold: React.CSSProperties
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    h3Bold?: React.CSSProperties
    h4Bold?: React.CSSProperties
    h5Medium?: React.CSSProperties
    h5Bold?: React.CSSProperties
    body?: React.CSSProperties
    bodyMedium?: React.CSSProperties
    bodyBold?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h3Bold: true
    h4Bold: true
    h5Medium: true
    h5Bold: true
    body: true
    bodyMedium: true
    bodyBold: true
    body1: false
    body2: false
  }
}
