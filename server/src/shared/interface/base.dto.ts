export interface BaseDTO<Entity, DTO> {
  to(dto: DTO, existing?: Entity): Entity | Promise<Entity>;
  from(entity: Entity): DTO;
}
