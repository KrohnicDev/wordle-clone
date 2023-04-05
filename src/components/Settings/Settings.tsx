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
import './Settings.css'

export function Settings() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()
  const isOpen = Boolean(anchorEl)
  const { checkIncorrectChars, checkIncorrectWords } = useSettings()
  const { t } = useTranslation()

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
          inverted
          label={t('settings.validation.allowInvalidChars')}
          setting={checkIncorrectChars}
        />

        <SettingsSwitch
          inverted
          label={t('settings.validation.allowInvalidWords')}
          setting={checkIncorrectWords}
        />
      </Menu>
    </div>
  )
}

function LocaleSelect() {
  const { locale } = useSettings()
  const { t } = useTranslation()
  const label = t('settings.language.select')

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
      {label}
      <Select
        label={label}
        onChange={handleChange}
        value={locale.value}
        className='language-select'
      >
        {LOCALES.map((it) => (
          <MenuItem value={it} key={it}>
            {t(`settings.language.${it}`)}
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
