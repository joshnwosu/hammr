import { CustomAPI } from './types'
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPI
  }
}
