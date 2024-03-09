import { Category } from "./Category";
import { IntEntity } from "./IntEntity";

export class Entity extends IntEntity {
    public Name!: string;
    public HeaderDescription!: string;
    public FooterDescription!: string;
    public RecipeInstructions: string[];
    public ImageUrls: string[];
    public CategoryIds: number[];
    public PrepTime?: number;
    public TotalTime?: number;
    public IsHidden!: boolean;
    public Sorting!: number;
    public Categories: Category[];
  
    constructor() {
      super();
      this.RecipeInstructions = [];
      this.ImageUrls = [];
      this.CategoryIds = [];
      this.Categories = [];
    }
  }