import { IEntity } from "./IEntity";

export class IntEntity implements IEntity<number> {
  public Id!: number;
}