import Filament from 'filament'
import type {
  AmbientOcclusionOptions,
  DynamicResolutionOptions,
  Entity,
  Float3,
  QualityLevel,
  RNFCamera,
  Scene,
  View,
  Viewport,
} from 'react-native-filament'

function QualityLevelMapper(quality?: QualityLevel): Filament.View$QualityLevel {
  switch (quality) {
    case 'LOW':
      return Filament.View$QualityLevel.LOW
    case 'MEDIUM':
      return Filament.View$QualityLevel.MEDIUM
    case 'HIGH':
      return Filament.View$QualityLevel.HIGH
    case 'ULTRA':
      return Filament.View$QualityLevel.ULTRA
    default:
      return Filament.View$QualityLevel.LOW
  }
}

export function MapToRNF(
  filamentView: Filament.View,
  filamentEngine: Filament.Engine,
  camera: RNFCamera,
  scene: Scene,
): View {
  const mappedView: View = {
    camera,
    scene,
    getAspectRatio: function (): number {
      throw new Error('Function not implemented.')
    },
    getViewport: function (): Viewport {
      throw new Error('Function not implemented.')
    },
    setAmbientOcclusionOptions: function (options: AmbientOcclusionOptions): void {
      const newOptions: Filament.View$AmbientOcclusionOptions = {
        ...options,
        quality: QualityLevelMapper(options.quality ?? 'LOW'),
        lowPassFilter: QualityLevelMapper(options.lowPassFilter ?? 'MEDIUM'),
        upsampling: QualityLevelMapper(options.upsampling ?? 'LOW'),
      }
      filamentView.setAmbientOcclusionOptions(newOptions)
    },
    getAmbientOcclusionOptions: function (): AmbientOcclusionOptions {
      throw new Error('Function not implemented.')
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setDynamicResolutionOptions: function (options: DynamicResolutionOptions): void {
      throw new Error('Function not implemented.')
    },
    getDynamicResolutionOptions: function (): DynamicResolutionOptions {
      throw new Error('Function not implemented.')
    },
    screenSpaceRefraction: false,
    postProcessing: false,
    shadowing: false,
    antiAliasing: 'none',
    dithering: 'none',
    createAmbientOcclusionOptions: function (): AmbientOcclusionOptions {
      throw new Error('Function not implemented.')
    },
    createDynamicResolutionOptions: function (): DynamicResolutionOptions {
      throw new Error('Function not implemented.')
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    projectWorldToScreen: function (worldPosition: Float3): [x: number, y: number] {
      throw new Error('Function not implemented.')
    },
    pickEntity: function (x: number, y: number): Promise<Entity | null> {
      return new Promise((resolve) =>
        filamentView.pick(x, y, (entity) =>
          resolve({
            id: entity.renderable,
          }),
        ),
      )
    },
    temporalAntiAliasingOptions: {},
    release: function (): void {
      filamentEngine.destroyView(filamentView)
    },
    isValid: false,
  }

  return mappedView
}

export function MapToFilament(view: View): Filament.View {
  const mappedView: Filament.View = {
    pick: function (x: number, y: number, cb: Filament.PickCallback): void {
      view.pickEntity(x, y)
    },
    setCamera: function (camera: Filament.Camera): void {
      view.camera = camera
    },
    setColorGrading: function (colorGrading: Filament.ColorGrading): void {
      throw new Error('Function not implemented.')
    },
    setScene: function (scene: Filament.Scene): void {
      view.scene = scene
    },
    setViewport: function (viewport: Filament.float4): void {
      throw new Error('Function not implemented.')
    },
    setVisibleLayers: function (select: number, values: number): void {
      throw new Error('Function not implemented.')
    },
    setRenderTarget: function (renderTarget: Filament.RenderTarget): void {
      throw new Error('Function not implemented.')
    },
    setAmbientOcclusionOptions: function (options: Filament.View$AmbientOcclusionOptions): void {
      throw new Error('Function not implemented.')
    },
    setDepthOfFieldOptions: function (options: Filament.View$DepthOfFieldOptions): void {
      throw new Error('Function not implemented.')
    },
    setMultiSampleAntiAliasingOptions: function (
      options: Filament.View$MultiSampleAntiAliasingOptions,
    ): void {
      throw new Error('Function not implemented.')
    },
    setTemporalAntiAliasingOptions: function (
      options: Filament.View$TemporalAntiAliasingOptions,
    ): void {
      throw new Error('Function not implemented.')
    },
    setScreenSpaceReflectionsOptions: function (
      options: Filament.View$ScreenSpaceReflectionsOptions,
    ): void {
      throw new Error('Function not implemented.')
    },
    setBloomOptions: function (options: Filament.View$BloomOptions): void {
      throw new Error('Function not implemented.')
    },
    setFogOptions: function (options: Filament.View$FogOptions): void {
      throw new Error('Function not implemented.')
    },
    setVignetteOptions: function (options: Filament.View$VignetteOptions): void {
      throw new Error('Function not implemented.')
    },
    setGuardBandOptions: function (options: Filament.View$GuardBandOptions): void {
      throw new Error('Function not implemented.')
    },
    setStereoscopicOptions: function (options: Filament.View$StereoscopicOptions): void {
      throw new Error('Function not implemented.')
    },
    setAmbientOcclusion: function (ambientOcclusion: Filament.View$AmbientOcclusion): void {
      throw new Error('Function not implemented.')
    },
    getAmbientOcclusion: function (): Filament.View$AmbientOcclusion {
      throw new Error('Function not implemented.')
    },
    setBlendMode: function (mode: Filament.View$BlendMode): void {
      throw new Error('Function not implemented.')
    },
    getBlendMode: function (): Filament.View$BlendMode {
      throw new Error('Function not implemented.')
    },
    setPostProcessingEnabled: function (enabled: boolean): void {
      throw new Error('Function not implemented.')
    },
    setAntiAliasing: function (antialiasing: Filament.View$AntiAliasing): void {
      throw new Error('Function not implemented.')
    },
    setStencilBufferEnabled: function (enabled: boolean): void {
      throw new Error('Function not implemented.')
    },
    isStencilBufferEnabled: function (): boolean {
      throw new Error('Function not implemented.')
    },
  }

  return mappedView
}
