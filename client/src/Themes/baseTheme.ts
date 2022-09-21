import {ThemeOptions} from "@mui/material";

type BaseTheme = Omit<ThemeOptions, "palette">

const baseTheme: BaseTheme  = {
  components: {
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small"
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        fullWidth: true,
        size: "small"
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: "bold"
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: "contained"
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ff1a1a",
          height: "20px"
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "0px",
          paddingBottom: "0px !IMPORTANT"
        }
      }
    }
  },
  typography: {
    fontFamily: "Roboto",
    h1: {
      fontSize: "36px",
      fontWeight: "800"
    },
    h2: {
      fontSize: "32px",
      fontWeight: "800"
    },
    h3: {
      fontSize: "28px",
      fontWeight: "800"
    },
    h4: {
      fontSize: "24px",
      fontWeight: "800"
    },
    h5: {
      fontSize: "20px",
      fontWeight: "800"
    },
    h6: {
      fontSize: "16px",
      fontWeight: "800"
    }
  },
  transitions: {
    duration: {
      enteringScreen: 500
    }
  }
}

export default baseTheme
