import { Paper } from '@mantine/core'

interface WrapperProps {
  children: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return <Paper color={`#111111`}>{children}</Paper>
}
