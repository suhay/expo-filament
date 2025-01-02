import type { Renderer, FrameRateOptions, SwapChain, View } from 'react-native-filament'

import { Mapper } from '.'

export function MapToRNF(
  filamentRenderer: Filament.Renderer,
  filamentEngine: Filament.Engine,
  filamentSwapChain: Filament.SwapChain,
): Renderer {
  const mappedRenderer: Renderer = {
    setFrameRateOptions: function (options: FrameRateOptions): void {
      throw new Error('Function not implemented.')
    },
    setClearContent: function (clear: boolean): void {
      throw new Error('Function not implemented.')
    },
    setPresentationTime: function (timestamp: number): void {
      throw new Error('Function not implemented.')
    },
    beginFrame: function (swapChain: SwapChain, timestamp: number): boolean {
      return filamentRenderer.beginFrame(swapChain)
    },
    render: function (view: View): void {
      if (!filamentSwapChain) {
        throw new Error('SwapChain is not set')
      }
      const mappedView = Mapper.View.MapToFilament(view)
      filamentRenderer.render(filamentSwapChain, mappedView)
    },
    endFrame: function (): void {
      filamentRenderer.endFrame()
    },
    release: function (): void {
      filamentEngine.destroyRenderer(filamentRenderer)
    },
    isValid: false,
  }

  return mappedRenderer
}
