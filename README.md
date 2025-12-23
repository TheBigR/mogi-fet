# Mogi-Fet

A multi-page form application built with Next.js 16, React 19, and Material UI that collects user information and displays weather and country data.

## Features

- **Multi-Page Form**: Step-by-step form with state persistence using sessionStorage
- **Weather Data**: Fetches real-time weather information for the entered city
- **Country Information**: Displays comprehensive country data including population, region, languages, capital, currency, and flag
- **Material UI**: Beautiful, responsive UI built with Material UI components
- **Design Tokens**: Centralized design system with reusable tokens
- **Server Actions**: Uses Next.js Server Actions for data fetching

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Material UI (MUI) v6
- App Router
- Server Actions

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
ACCUWEATHER_API_KEY=your_accuweather_api_key_here
```

You can get an API key from [AccuWeather](https://developer.accuweather.com/).

**Note**: The app includes a demo API key for testing, but for production use, you should use your own API key.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
mogi-fet/
├── app/
│   ├── actions.ts              # Server actions for form submission
│   ├── form/
│   │   ├── city/
│   │   │   └── page.tsx        # Page A: City input
│   │   └── name/
│   │       └── page.tsx        # Page B: Name input
│   ├── result/
│   │   ├── page.tsx            # Result page (Server Component)
│   │   └── ResultContent.tsx   # Result content (Client Component)
│   ├── layout.tsx              # Root layout with MUI ThemeProvider
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── design-tokens/
│   └── theme.ts                # Design tokens
├── lib/
│   └── theme.ts                # MUI theme configuration
└── package.json
```

## Features Breakdown

### Page A - City Input
- Material UI TextField for city input
- State persists to sessionStorage on every change
- "Next" button navigates to Page B
- Form validation ensures city is entered

### Page B - Name Input
- Material UI TextField for name input
- Displays the saved city from Page A
- "Back" button to return to Page A
- "Submit" button triggers server action

### Server Action
- Receives name and city from the form
- Step 1: Fetches location data from AccuWeather Location API to get location key and country code
- Step 2: Fetches current weather conditions from AccuWeather using the location key
- Step 3: Fetches country data from REST Countries API using the country code from AccuWeather
- Returns combined data object

### Result Page
- Displays user name and city
- Shows weather information (temperature, description, humidity, wind speed, etc.)
- Displays country information (name, population, region, languages, capital, currency, flag)
- All using Material UI components

## Design Tokens

The application uses a centralized design token system located in `design-tokens/theme.ts`. These tokens are used to configure the MUI theme, ensuring consistency across the application.

## API Integration

### Location & Weather API
- **Service**: AccuWeather
- **Endpoints**: 
  - Location Search: `/locations/v1/cities/search`
  - Current Conditions: `/currentconditions/v1/{locationKey}`
- **Fallback**: Mock data if API key is not provided or request fails

### Country API
- **Service**: REST Countries API
- **Endpoint**: Country by Alpha Code (using country code from AccuWeather location data)
- **Fallback**: Mock data if request fails

## License

MIT

