import { createTheme } from "@mui/material/styles"

import { palette, typography } from "."
import { color } from "../design-tokens"

const muiTheme = createTheme({
  palette,
  typography,
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: "32px",
          height: "32px",

          fontSize: "15px",
          fontWeight: 500,
          lineHeight: "22px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: "1px",
          borderStyle: "solid",
          textTransform: "none",
        },
        startIcon: {
          marginLeft: 0,
          marginRight: "6px",
        },
        endIcon: {
          marginLeft: "6px",
          marginRight: 0,
        },
      },
      defaultProps: {
        disableRipple: true,
        variant: "primary",
        type: "button",
      },
      variants: [
        {
          props: { size: "largest" },
          style: {
            padding: "12px 16px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "22px",
          },
        },
        {
          props: { size: "large" },
          style: {
            padding: "8px 14px",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "22px",
          },
        },
        {
          props: { size: "medium" },
          style: {
            padding: "5px 10px",
            borderRadius: "6px",
            fontSize: "15px",
            fontWeight: 400,
            lineHeight: "20px",
          },
        },
        {
          props: { size: "small" },
          style: {
            padding: "3px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16px",
          },
        },
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: color.primary[6],
            borderColor: color.primary[6],
            color: color.gray[1],

            "&:hover, &:active": {
              backgroundColor: color.primary[5],
              borderColor: color.primary[5],
            },

            "&.Mui-disabled": {
              backgroundColor: color.primary[2],
              borderColor: color.primary[3],
              color: color.primary[4],
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            backgroundColor: color.gray[1],
            borderColor: color.gray[6],
            color: color.gray[11],

            "&:hover, &:active": {
              backgroundColor: color.primary[1],
              borderColor: color.primary[5],
              color: color.primary[6],
            },

            "&.Mui-disabled": {
              backgroundColor: color.gray[3],
              borderColor: color.gray[5],
              color: color.gray[6],
            },
          },
        },
        {
          props: { variant: "gray" },
          style: {
            backgroundColor: color.gray[10],
            borderColor: color.gray[6],
            color: color.gray[1],

            "&:hover, &:active": {
              backgroundColor: color.gray[11],
              borderColor: color.gray[11],
              color: color.gray[1],
            },

            "&.Mui-disabled": {
              backgroundColor: color.gray[3],
              borderColor: color.gray[5],
              color: color.gray[6],
            },
          },
        },
        {
          props: { variant: "link" },
          style: {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: color.primary[6],

            "&:hover, &:active": {
              color: color.primary[6],
            },

            "&.Mui-disabled": {
              color: color.gray[6],
            },
          },
        },
        {
          props: { variant: "text" },
          style: {
            backgroundColor: "transparent",
            borderColor: "transparent",
            color: color.gray[11],

            "&:hover, &:active": {
              backgroundColor: color.primary[1],
              borderColor: color.primary[1],
              color: color.primary[6],
            },

            "&.Mui-disabled": {
              color: color.gray[6],
            },
          },
        },
      ],
    },
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "16px",
          color: color.gray[4],
          borderRadius: "2px",

          "& + .MuiFormControlLabel-label": {
            marginLeft: "8px",
          },

          "&.Mui-checked": {
            color: color.primary[6],
          },
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        label: {
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: "22px",
        },
      },
    },
    MuiTypography: {},
  },
})

export default muiTheme
