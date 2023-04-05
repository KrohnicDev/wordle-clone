import { Settings } from '@mui/icons-material'
import { Button, Menu } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '../../hooks/useSettings'
import { LocaleSelect } from './LocaleSelect'
import './SettingsMenu.css'
import { SettingsSwitch } from './SettingsSwitch'

export function SettingsMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement>()
  const isOpen = Boolean(anchorEl)
  const { checkIncorrectChars, checkIncorrectWords } = useSettings()
  const { t } = useTranslation()

  return (
    <div>
      <Button
        onClick={(e) => {
          setAnchorEl(e.currentTarget)
          // Otherwise subsequent word submits would open the menu
          e.currentTarget.blur()
        }}
      >
        <Settings color='secondary' />
      </Button>
      <Menu
        open={isOpen}
        onClose={() => setAnchorEl(undefined)}
        anchorEl={anchorEl}
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
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
