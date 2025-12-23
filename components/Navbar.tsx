'use client'

import { useRouter } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

export default function Navbar() {
  const router = useRouter()

  const handleHomeClick = () => {
    router.push('/')
  }

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 500 }}>
            Mogi-Fet
          </Typography>
        </Box>
        <IconButton
          color="inherit"
          onClick={handleHomeClick}
          aria-label="home"
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <HomeIcon />
        </IconButton>
    
      </Toolbar>
    </AppBar>
  )
}

