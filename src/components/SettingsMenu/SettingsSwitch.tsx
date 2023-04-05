import { MenuItem, Switch } from '@mui/material'
import { BooleanSetting } from '../../types'

type Props = {
  label: string
  setting: BooleanSetting
  inverted?: boolean
}

export function SettingsSwitch({ label, setting, inverted }: Props) {
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
