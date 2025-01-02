import Filament from 'filament'
import type {
  CameraManipulator,
  Choreographer,
  Engine,
  FilamentAsset,
  LightManager,
  Material,
  NameComponentManager,
  OrbitCameraManipulatorConfig,
  RenderableManager,
  Renderer,
  RNFCamera,
  Scene,
  SwapChain,
  TransformManager,
  View,
} from 'react-native-filament'
import type { IWorkletContext } from 'react-native-worklets-core'

import { Mapper } from '../mappers'

export interface TFilamentProxy {
  // loadAsset(path: string): Promise<FilamentBuffer>
  // createTestObject(): TestHybridObject
  // findFilamentView(viewTag: number): Promise<FilamentView>
  createEngine(canvas: HTMLCanvasElement, contextOptions?: object): Engine
  // createBullet(): BulletAPI
  // getCurrentDispatcher(): Dispatcher
  // createRecorder(width: number, height: number, fps: number, bitRate: number): TFilamentRecorder
  // readonly hasWorklets: boolean
  createWorkletContext: () => IWorkletContext
  createChoreographer(): Choreographer
}

export const FilamentProxy: TFilamentProxy = {
  createEngine: function (canvas: HTMLCanvasElement, contextOptions?: object) {
    const filamentEngine = Filament.Engine.create(canvas, contextOptions)
    const filamentScene = filamentEngine.createScene()

    const filamentSwapChain = filamentEngine.createSwapChain()
    const filamentCamera = filamentEngine.createCamera(Filament.EntityManager.get().create())
    const filamentView = filamentEngine.createView()
    filamentView.setCamera(filamentCamera)
    filamentView.setScene(filamentScene)

    const engine: Engine = {
      release: () => {
        Filament.Engine.destroy(filamentEngine)
      },
      setSurfaceProvider: function (surfaceProvider: SurfaceProvider): void {
        throw new Error('Function not implemented.')
      },
      createSwapChainForSurface: function (
        surface: SurfaceProvider,
        enableTransparentRendering: boolean,
      ): SwapChain {
        throw new Error('Function not implemented.')
      },
      createSwapChainForRecorder: function (recorder: TFilamentRecorder): SwapChain {
        throw new Error('Function not implemented.')
      },
      setSwapChain: function (swapChain: SwapChain): void {
        throw new Error('Function not implemented.')
      },
      loadAsset: function (buffer: FilamentBuffer): FilamentAsset {
        throw new Error('Function not implemented.')
      },
      loadInstancedAsset: function (buffer: FilamentBuffer, instanceCount: number): FilamentAsset {
        throw new Error('Function not implemented.')
      },
      setIndirectLight: function (
        iblBuffer: FilamentBuffer,
        intensity: number | undefined,
        irradianceBands: number | undefined,
      ): void {
        throw new Error('Function not implemented.')
      },
      createRenderer: function (): Renderer {
        const filamentRenderer = filamentEngine.createRenderer()
        return Mapper.Renderer.MapToRNF(filamentRenderer, filamentEngine, filamentSwapChain)
      },
      getScene: function (): Scene {
        return Mapper.Scene.MapToRNF(filamentScene, filamentEngine)
      },
      getCamera: function (): RNFCamera {
        return Mapper.Camera.MapToRNF(filamentCamera, filamentEngine)
      },
      getView: function (): View {
        return Mapper.View.MapToRNF(filamentView, filamentEngine, this.getCamera(), this.getScene())
      },
      createOrbitCameraManipulator: function (
        config: OrbitCameraManipulatorConfig,
      ): CameraManipulator {
        throw new Error('Function not implemented.')
      },
      createNameComponentManager: function (): NameComponentManager {
        throw new Error('Function not implemented.')
      },
      createTransformManager: function (): TransformManager {
        const tManager = filamentEngine.getTransformManager()
        return tManager
      },
      createRenderableManager: function (): RenderableManager {
        const rManager = filamentEngine.getRenderableManager()
        return rManager
      },
      createLightManager: function (): LightManager {
        const lightManager = filamentEngine.getLightManager()
        return lightManager
      },
      createMaterial: function (matcBuffer: FilamentBuffer): Material {
        return filamentEngine.createMaterial(matcBuffer)
      },
      createAndSetSkyboxByColor: function (
        colorInHex: string,
        showSun: boolean | undefined,
        envIntensity: number | undefined,
      ): void {
        throw new Error('Function not implemented.')
      },
      createAndSetSkyboxByTexture: function (
        buffer: FilamentBuffer,
        showSun: boolean | undefined,
        envIntensity: number | undefined,
      ): void {
        throw new Error('Function not implemented.')
      },
      clearSkybox: function (): void {
        throw new Error('Function not implemented.')
      },
      setAutomaticInstancingEnabled: function (enabled: boolean): void {
        throw new Error('Function not implemented.')
      },
      flushAndWait: function (): void {
        throw new Error('Function not implemented.')
      },
      isValid: false,
    }

    return engine
  },
  createWorkletContext: function (): IWorkletContext {
    return {
      name: 'FilamentWorkletContext',
      addDecorator: () => {},
      createRunAsync: (worklet) => {
        return async (...args) => {
          return worklet(...args)
        }
      },
      runAsync: async (worklet) => {
        return worklet()
      },
    }
  },
  createChoreographer: function (): Choreographer {
    throw new Error('Function not implemented.')
  },
}

export const FilamentWorkletContext = FilamentProxy.createWorkletContext()
