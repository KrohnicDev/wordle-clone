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
import { Locale, isLocale, LOCALES, BooleanSetting } from '../../types'

export function Settings() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()
  const isOpen = Boolean(anchorEl)
  const { checkIncorrectChars, checkIncorrectWords } = useSettings()

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
        <LocaleSelect />

        <SettingsSwitch
          label='Salli virheelliset kirjaimet'
          setting={checkIncorrectChars}
          inverted
        />

        <SettingsSwitch
          label='Salli virheelliset sanat'
          setting={checkIncorrectWords}
          inverted
        />
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
    <MenuItem>
      {t('language.select')}
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
    </MenuItem>
  )
}

function SettingsSwitch({
  label,
  setting,
  inverted,
}: {
  label: string
  setting: BooleanSetting
  inverted?: boolean
}) {
  return (
    <MenuItem>
      {label}
      <Switch
        checked={inverted ? !setting.isEnabled : setting.isEnabled}
        onClick={setting.toggle}
      />
    </MenuItem>
  )
}
