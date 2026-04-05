import 'styled-components'
import type { Theme } from './theme'

declare module 'styled-components' {
  // DefaultTheme must be an interface for styled-components module augmentation
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- extends Theme only
  export interface DefaultTheme extends Theme {}
}
