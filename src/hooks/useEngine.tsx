import { useDisposableResource } from 'react-native-filament'
import { type IWorkletContext, useWorklet } from 'react-native-worklets-core'

import { FilamentProxy } from '../web/FilamentProxy'

export interface EngineProps {
  canvas: HTMLCanvasElement | null
  context: IWorkletContext
}

export function useEngine({ canvas, context }: EngineProps) {
  const createEngine = useWorklet(context, () => {
    'worklet'

    if (canvas == null) {
      return undefined
    }

    return FilamentProxy.createEngine(canvas)
  })

  const engine = useDisposableResource(createEngine)
  return engine
}
