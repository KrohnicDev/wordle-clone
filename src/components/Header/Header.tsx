import { AppBar, Toolbar, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LocaleSelect from '../LocaleSelect'

export function Header() {
  const { t } = useTranslation()
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {t('title')}
        </Typography>
        <LocaleSelect />
      </Toolbar>
    </AppBar>
  )
}
