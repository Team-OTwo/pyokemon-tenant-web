import { ThemeConfig } from "antd"
import { AliasToken } from "antd/es/theme/internal"

import { color } from "../design-tokens"

// Antd doesn't generate gray classes, this is a workaround to hack them in anyway:
// https://stackoverflow.com/questions/71372137/antd-configprovider-not-generating-same-colors-as-provided-on-color-palettes
interface AppAliasToken extends AliasToken {
  gray1: string
  gray2: string
  gray3: string
  gray4: string
  gray5: string
  gray6: string
  gray7: string
  gray8: string
  gray9: string
  gray10: string
  gray11: string
  gray12: string
  gray13: string
}

interface AppThemeConfig extends ThemeConfig {
  token: Partial<AppAliasToken>
}

const antdTheme: AppThemeConfig = {
  token: {
    fontFamily: "inherit",
    colorText: color.gray[11],
    colorPrimary: color.primary[6],

    gray1: color.gray[1],
    gray2: color.gray[2],
    gray3: color.gray[3],
    gray4: color.gray[4],
    gray5: color.gray[5],
    gray6: color.gray[6],
    gray7: color.gray[7],
    gray8: color.gray[8],
    gray9: color.gray[9],
    gray10: color.gray[10],
    gray11: color.gray[11],
    gray12: color.gray[12],
    gray13: color.gray[13],
  },
  components: {
    Table: {
      borderColor: color.gray[4],
      cellFontSizeSM: 13,
      headerBorderRadius: 0,
      headerBg: color.gray[2],
    },
  },
}

export default antdTheme
