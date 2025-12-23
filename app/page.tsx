'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Container, Typography, Button, Box } from '@mui/material'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Clear any existing form data when starting fresh
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('formData')
    }
  }, [])

  const handleStart = () => {
    router.push('/form/city')
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3,
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Mogi-Fet
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Get started by entering your city and name to receive weather and
          country information.
        </Typography>
        <Button variant="contained" size="large" onClick={handleStart}>
          Start Form
        </Button>
      </Box>
    </Container>
  )
}

