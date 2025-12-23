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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'

export default function NamePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCityNotFoundDialog, setShowCityNotFoundDialog] = useState(false)

  useEffect(() => {
    // Load saved data from sessionStorage
    if (typeof window !== 'undefined') {
      const savedData = sessionStorage.getItem('formData')
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData)
          if (parsed.city) {
            setCity(parsed.city)
          }
          if (parsed.name) {
            setName(parsed.name)
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  }, [])

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setName(newName)

    // Save to sessionStorage on every change
    if (typeof window !== 'undefined') {
      const existingData = sessionStorage.getItem('formData')
      const formData = existingData ? JSON.parse(existingData) : {}
      formData.name = newName
      sessionStorage.setItem('formData', JSON.stringify(formData))
    }
  }

  const handleSubmit = async () => {
    if (!name.trim() || !city.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Import the server action
      const { submitFormData } = await import('@/app/actions')
      const result = await submitFormData({ name: name.trim(), city: city.trim() })

      if (result.success && result.data) {
        // Save result to sessionStorage for the result page
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('formResult', JSON.stringify(result.data))
        }
        router.push('/result')
      } else {
        // Check if it's a city not found error
        if (result.errorType === 'CITY_NOT_FOUND') {
          setShowCityNotFoundDialog(true)
          setIsSubmitting(false)
        } else {
          alert(result.error || 'An error occurred. Please try again.')
          setIsSubmitting(false)
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
      setIsSubmitting(false)
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
          minHeight: 'calc(100vh - 64px)',
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
            Step 2: Enter Your Name
          </Typography>

          {city && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>City:</strong> {city}
              </Typography>
            </Alert>
          )}

          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            autoFocus
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => router.push('/form/city')}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              disabled={!name.trim() || !city.trim() || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* City Not Found Dialog */}
      <Dialog
        open={showCityNotFoundDialog}
        onClose={() => setShowCityNotFoundDialog(false)}
        aria-labelledby="city-not-found-dialog-title"
        aria-describedby="city-not-found-dialog-description"
      >
        <DialogTitle id="city-not-found-dialog-title">
          City Not Found
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="city-not-found-dialog-description">
            We couldn't find the city "{city}". Please try entering a different
            city name or check your spelling.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setShowCityNotFoundDialog(false)
              router.push('/form/city')
            }}
            variant="contained"
            autoFocus
          >
            Go Back to City Page
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

