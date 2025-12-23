'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  Divider,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import PublicIcon from '@mui/icons-material/Public'
import LanguageIcon from '@mui/icons-material/Language'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import FlagIcon from '@mui/icons-material/Flag'

interface WeatherData {
  temperature?: number
  description?: string
  humidity?: number
  windSpeed?: number
  feelsLike?: number
  pressure?: number
}

interface CountryData {
  name: string
  population: number
  region: string
  languages: string[]
  capital: string
  currency: string
  flag: string
}

interface FormResult {
  name: string
  city: string
  weather: WeatherData
  countryData: CountryData
}

export default function ResultContent() {
  const router = useRouter()
  const [result, setResult] = useState<FormResult | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedResult = sessionStorage.getItem('formResult')
      if (savedResult) {
        try {
          const parsed = JSON.parse(savedResult)
          setResult(parsed)
        } catch (e) {
          console.error('Error parsing result:', e)
          router.push('/')
        }
      } else {
        router.push('/')
      }
    }
  }, [router])

  if (!result) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    )
  }

  const { name, city, weather, countryData } = result

  return (
    <Container maxWidth="lg" sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      <Box
        sx={{
          py: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 2 }}>
          Your Results
        </Typography>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Grid container spacing={2}>
            {/* User Information */}
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="h6">User Information</Typography>
                </Box>
                <Divider sx={{ mb: 1.5 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="h6">{name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="primary" fontSize="small" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        City
                      </Typography>
                      <Typography variant="h6">{city}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

            {/* Weather Information */}
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'info.main', width: 32, height: 32 }}>
                      <ThermostatIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h6">Weather</Typography>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {weather.temperature !== undefined && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Temperature
                      </Typography>
                      <Typography variant="h6">
                        {weather.temperature}°C
                      </Typography>
                    </Box>
                  )}
                  {weather.description && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                      <Chip
                        label={weather.description}
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  )}
                  {weather.humidity !== undefined && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Humidity
                      </Typography>
                      <Typography variant="body1">{weather.humidity}%</Typography>
                    </Box>
                  )}
                  {weather.windSpeed !== undefined && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Wind Speed
                      </Typography>
                      <Typography variant="body1">
                        {weather.windSpeed} m/s
                      </Typography>
                    </Box>
                  )}
                  {weather.feelsLike !== undefined && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Feels Like
                      </Typography>
                      <Typography variant="body1">
                        {weather.feelsLike}°C
                      </Typography>
                    </Box>
                  )}
                  {weather.pressure !== undefined && (
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Pressure
                      </Typography>
                      <Typography variant="body1">
                        {weather.pressure} hPa
                      </Typography>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

            {/* Country Information */}
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'success.main', width: 32, height: 32 }}>
                      <PublicIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="h6">Country Information</Typography>
                  </Box>
                  <Divider sx={{ mb: 1.5 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Country Name
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      {countryData.flag && (
                        <Box
                          component="img"
                          src={countryData.flag}
                          alt={`${countryData.name} flag`}
                          sx={{
                            width: '40px',
                            height: '30px',
                            objectFit: 'cover',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 0.5,
                          }}
                        />
                      )}
                      <Typography variant="h6">{countryData.name}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Population
                    </Typography>
                    <Typography variant="body1">
                      {countryData.population.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Region
                    </Typography>
                    <Chip label={countryData.region} color="secondary" variant="outlined" />
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <LanguageIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Languages
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {countryData.languages.map((lang, index) => (
                        <Chip
                          key={index}
                          label={lang}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <AttachMoneyIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        Currency
                      </Typography>
                    </Box>
                    <Typography variant="body1">{countryData.currency}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Capital
                    </Typography>
                    <Typography variant="body1">{countryData.capital}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', pb: 2 }}>
          <Chip
            label="Start Over"
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.clear()
              }
              router.push('/')
            }}
            color="primary"
            variant="outlined"
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </Box>
    </Container>
  )
}

