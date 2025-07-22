import { DefaultTheme } from "styled-components"

import { color, typography, zIndex } from "../design-tokens"

const styledComponentsTheme: DefaultTheme = {
  colors: {
    white: color.white,
    black: color.black,

    background: color.background,
    foreground: color.foreground,

    danger: color.character.danger,
    warning: color.character.warning,
    success: color.character.success,
    link: color.character.link,

    primary: color.primary,
    gray: color.gray,
    volcano: color.volcano,
    red: color.red,
    orange: color.orange,
    gold: color.gold,
    yellow: color.yellow,
    lime: color.lime,
    green: color.green,
    cyan: color.cyan,
    blue: color.blue,
    geekblue: color.geekblue,
    purple: color.purple,
    magenta: color.magenta,
  },
  typography: {
    h1: typography.h1,
    h2: typography.h2,
    h3: typography.h3,
    h3Bold: typography.h3Bold,
    h4: typography.h4,
    h4Bold: typography.h4Bold,
    h5: typography.h5,
    h5Medium: typography.h5Medium,
    h5Bold: typography.h5Bold,
    body: typography.body,
    bodyMedium: typography.bodyMedium,
    bodyBold: typography.bodyBold,
  },
  zIndex: {
    header: zIndex.header,
    dialog: zIndex.dialog,
    popover: zIndex.popover,
  },
}

export default styledComponentsTheme
