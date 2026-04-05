import { Label, Root, Value } from './StatCounter.styled'

export type StatCounterProps = {
  value: string
  label: string
  /** When true, shows a vertical divider on the left (use for 2nd+ items in a row). */
  showDivider?: boolean
}

export function StatCounter({
  value,
  label,
  showDivider = false,
}: StatCounterProps) {
  return (
    <Root $showDivider={showDivider}>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Root>
  )
}
