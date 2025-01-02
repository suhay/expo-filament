import {
  type FilamentProviderProps,
  FilamentScene as NativeFilamentScene,
} from 'react-native-filament'

export function FilamentScene({ children, ...viewProps }: FilamentProviderProps) {
  return <NativeFilamentScene {...viewProps}>{children}</NativeFilamentScene>
}
