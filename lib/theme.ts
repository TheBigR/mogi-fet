'use client'

import { createTheme } from '@mui/material/styles'
import { designTokens } from '@/design-tokens/theme'

export const theme = createTheme({
  palette: {
    primary: {
      main: designTokens.colors.primary.main,
      light: designTokens.colors.primary.light,
      dark: designTokens.colors.primary.dark,
      contrastText: designTokens.colors.primary.contrastText,
    },
    secondary: {
      main: designTokens.colors.secondary.main,
      light: designTokens.colors.secondary.light,
      dark: designTokens.colors.secondary.dark,
      contrastText: designTokens.colors.secondary.contrastText,
    },
    background: {
      default: designTokens.colors.background.default,
      paper: designTokens.colors.background.paper,
    },
    text: {
      primary: designTokens.colors.text.primary,
      secondary: designTokens.colors.text.secondary,
      disabled: designTokens.colors.text.disabled,
    },
    error: {
      main: designTokens.colors.error.main,
      light: designTokens.colors.error.light,
      dark: designTokens.colors.error.dark,
    },
    warning: {
      main: designTokens.colors.warning.main,
      light: designTokens.colors.warning.light,
      dark: designTokens.colors.warning.dark,
    },
    info: {
      main: designTokens.colors.info.main,
      light: designTokens.colors.info.light,
      dark: designTokens.colors.info.dark,
    },
    success: {
      main: designTokens.colors.success.main,
      light: designTokens.colors.success.light,
      dark: designTokens.colors.success.dark,
    },
  },
  typography: {
    fontFamily: designTokens.typography.fontFamily,
    h1: designTokens.typography.h1,
    h2: designTokens.typography.h2,
    h3: designTokens.typography.h3,
    h4: designTokens.typography.h4,
    h5: designTokens.typography.h5,
    h6: designTokens.typography.h6,
    body1: designTokens.typography.body1,
    body2: designTokens.typography.body2,
  },
  shape: {
    borderRadius: designTokens.borderRadius.medium,
  },
  spacing: designTokens.spacing.unit,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.medium,
          textTransform: 'none',
          padding: `${designTokens.spacing.sm}px ${designTokens.spacing.md}px`,
          boxShadow: designTokens.shadows.small,
          '&:hover': {
            boxShadow: designTokens.shadows.medium,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: designTokens.borderRadius.medium,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.large,
          boxShadow: designTokens.shadows.medium,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: designTokens.borderRadius.medium,
        },
      },
    },
  },
})

