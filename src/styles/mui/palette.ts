import { PaletteOptions } from "@mui/material"

import { color } from "../design-tokens"

export const palette: PaletteOptions = {
  background: {
    default: color.background,
  },
  text: {
    primary: color.foreground,
  },
  primary: {
    main: color.primary[6],
  },
  success: {
    main: color.character.success,
  },
  warning: {
    main: color.character.warning,
  },
  error: {
    main: color.character.danger,
  },
}
