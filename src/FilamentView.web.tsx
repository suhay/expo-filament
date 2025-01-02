import React, { type PropsWithChildren } from 'react'

import type { ViewStyle } from 'react-native'
import type { RenderCallback } from 'react-native-filament'
import type { PublicNativeProps } from 'react-native-filament/lib/typescript/src/react/FilamentView'

type ForwardProps = PublicNativeProps & {
  style?: ViewStyle
  renderCallback?: RenderCallback
}

export function FilamentView({
  children,
}: // renderCallback: renderCallbackProp,
// ...forwardProps
PropsWithChildren<ForwardProps>) {
  return null

  return <>{children}</>
}
