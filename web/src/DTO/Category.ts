export class Category {
    public ParentCategoryIds: number[];
    public ChildCategories: Category[];
    public ParentCategories: Category[];

    public IdAlias!: string;
    public Name!: string;
    public SubName!: string;
    public Description!: string;
    public ShortDescription!: string;
    public ImageUrl!: string;
    public ReplacementPageUrl!: string;
    public Sorting!: number;
    public IsShowForRecipe!: boolean;
    public IsHidden!: boolean;

    constructor() {
        this.ParentCategoryIds = [];
        this.ChildCategories = [];
        this.ParentCategories = [];
    }
}