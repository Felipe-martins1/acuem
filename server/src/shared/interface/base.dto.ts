export interface BaseDTO<Entity, DTO> {
  to(existing?: Entity): Entity;
  from(entity: Entity): DTO;
}
