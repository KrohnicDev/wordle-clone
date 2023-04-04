import { Settings as SettingsIcon } from '@mui/icons-material'
import {
  Button,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'
import { Locale, isLocale, LOCALES } from '../../types'

export function Settings() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()
  const isOpen = Boolean(anchorEl)
  const { t } = useTranslation()
  const { allowIncorrectChars, allowIncorrectWords } = useSettings()

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>
        <SettingsIcon color='secondary' />
      </Button>
      <Menu
        open={isOpen}
        onClose={() => setAnchorEl(undefined)}
        anchorEl={anchorEl}
      >
        <MenuItem>
          {t('language.select')}
          <LocaleSelect />
        </MenuItem>
        <MenuItem>
          Salli virheelliset kirjaimet
          <Switch
            checked={allowIncorrectChars.value}
            onClick={allowIncorrectChars.toggle}
          />
        </MenuItem>
        <MenuItem>
          Salli virheelliset sanat
          <Switch
            checked={allowIncorrectWords.value}
            onClick={allowIncorrectWords.toggle}
          />
        </MenuItem>
      </Menu>
    </div>
  )
}

function LocaleSelect() {
  const { locale } = useSettings()
  const { t } = useTranslation()

  function handleChange(e: SelectChangeEvent<Locale>) {
    const value = e.target.value
    if (isLocale(value)) {
      locale.set(value)
    } else {
      console.error('Unexpected locale', value)
    }
  }

  return (
    <Select
      label={t('language.select')}
      onChange={handleChange}
      value={locale.value}
    >
      {LOCALES.map((it) => (
        <MenuItem value={it} key={it}>
          {t(`language.${it}`)}
        </MenuItem>
      ))}
    </Select>
  )
}
