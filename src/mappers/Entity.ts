import Filament from 'filament'
import type { Entity } from 'react-native-filament'

export function MapToRNF(entity: Filament.Entity): Entity {
  const mappedEntity: Entity = {
    id: entity.getId(),
  }
  return mappedEntity
}
