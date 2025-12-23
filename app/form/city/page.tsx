'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material'

export default function CityPage() {
  const router = useRouter()
  const [city, setCity] = useState('')

  useEffect(() => {
    // Load saved city from sessionStorage if available
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('formData')
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData)
          if (parsed.city) {
            setCity(parsed.city)
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [])

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = event.target.value
    setCity(newCity)

    // Save to sessionStorage on every change
    if (typeof window !== 'undefined') {
      const existingData = sessionStorage.getItem('formData')
      const formData = existingData ? JSON.parse(existingData) : {}
      formData.city = newCity
      sessionStorage.setItem('formData', JSON.stringify(formData))
    }
  }

  const handleNext = () => {
    if (city.trim()) {
      router.push('/form/name')
    }
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
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Step 1: Enter Your City
          </Typography>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            value={city}
            onChange={handleCityChange}
            placeholder="e.g., New York, London, Tokyo"
            autoFocus
          />
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleNext}
            disabled={!city.trim()}
          >
            Next
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}

