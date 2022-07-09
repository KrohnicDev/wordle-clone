import {
  AppBar,
  Box,
  InputLabel,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import Select from '@mui/material/Select'
import { Container } from '@mui/system'
import { useTranslation } from 'react-i18next'
import './App.css'
import { WordleGame } from './components/WordleGame'
import { useLocale } from './hooks/useLocale'
import { isLocale, Locale } from './types'

export default function App() {
  const { locale, setLocale } = useLocale()
  const { t } = useTranslation()

  if (locale == null) {
    return null
  }

  return (
    <Container>
      <Box sx={{ p: 1, maxWidth: 350 }}>
        <Box>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                {t('title')}
              </Typography>
              <Select
                label={t('language.select')}
                onChange={(e) => {
                  const value = e.target.value
                  if (isLocale(value)) {
                    setLocale(value)
                  }
                }}
                value={locale}
              >
                <MenuItem value={Locale.FI}>{t('language.fi')}</MenuItem>
                <MenuItem value={Locale.EN}>{t('language.en')}</MenuItem>
              </Select>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ p: 1 }}>
          <WordleGame />
        </Box>
      </Box>
    </Container>
  )
}
