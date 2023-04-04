import { AppBar, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Settings from '../Settings'

export function Header() {
  const { t } = useTranslation()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>
        <Settings />
      </Toolbar>
    </AppBar>
  )
}
