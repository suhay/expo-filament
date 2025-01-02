import type { Float3, RNFCamera } from 'react-native-filament'

export function MapToRNF(
  filamentCamera: Filament.Camera,
  filamentEngine: Filament.Engine,
): RNFCamera {
  const mappedCamera: RNFCamera = {
    release: () => {
      filamentEngine.destroyCameraComponent(filamentCamera as any)
    },
    lookAtCameraManipulator: () => {},
    lookAt: function (eye: Float3, center: Float3, up: Float3): void {
      filamentCamera.lookAt(eye, center, up)
    },
    setLensProjection: function (
      focalLengthInMillimeters: number,
      aspect: number,
      near: number,
      far: number,
    ): void {
      filamentCamera.setLensProjection(focalLengthInMillimeters, aspect, near, far)
    },
    setProjection: function (fov: number, aspect: number, near: number, far: number): void {
      filamentCamera.setProjection(fov, 0, 0, 0, 0, near, far)
    },

    isValid: false,
  }

  return mappedCamera
}
