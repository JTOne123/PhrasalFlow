import { Category } from "./Category";
import { Entity } from "./Entity";

export class Data {
    public Version!: number;
    public Language!: string;
    public AppName!: string;
    public Recipes: Entity[];
    public Categories: Category[];
  
    constructor() {
      this.Recipes = [];
      this.Categories = [];
    }
  }