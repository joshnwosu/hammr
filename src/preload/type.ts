export interface CustomAPI {
  send: (channel: string, ...args: any[]) => void
  receive: (channel: string, listener: (...args: any[]) => void) => void
}
