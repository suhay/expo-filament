import Filament from 'filament'
import type { Entity, FilamentAsset, Scene } from 'react-native-filament'

export function MapToRNF(filamentScene: Filament.Scene, filamentEngine: Filament.Engine): Scene {
  const mappedScene: Scene = {
    addEntity: function (entity: Entity): void {
      const mappedEntity = Filament.EntityManager.get().create()
      filamentScene.addEntity(mappedEntity)
    },
    removeEntity: function (entity: Entity): void {
      filamentScene.remove(entity.id)
    },
    addEntities: function (entities: Entity[]): void {
      filamentScene.addEntities(entities)
    },
    removeEntities: function (entities: Entity[]): void {
      filamentScene.removeEntities(entities)
    },
    addAssetEntities: function (asset: FilamentAsset): void {
      throw new Error('Function not implemented.')
    },
    removeAssetEntities: function (asset: FilamentAsset): void {
      throw new Error('Function not implemented.')
    },
    entityCount: 0,
    release: function (): void {
      filamentEngine.destroyScene(filamentScene)
    },
    isValid: false,
  }

  return mappedScene
}
