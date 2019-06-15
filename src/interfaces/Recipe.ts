import { IngredientPreparation, RecipeUnit, RecipeServingsUnit } from "@/interfaces/RecipeIngredients";

export interface Ingredient {
  id: string;
  name: string;
  namePlural?: string;
}

export interface RecipeIngredientGroup extends RecipeIngredientEntry {
  isGroup: true;
  title: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeIngredient extends RecipeIngredientEntry {
  unit?: RecipeUnit;
  amount?: number;
  amountFrom?: number;
  amountTo?: number;
  ingredient: Ingredient;
  preparation?: IngredientPreparation;
}

export interface RecipeIngredientEntry { }

export interface RecipeStepGroup extends RecipeStepEntry {
  isGroup: true;
  title: string;
  steps: RecipeStep[];
}

export interface RecipeStep extends RecipeStepEntry {
  type: "step";
  content: string;
}

export interface RecipeStepEntry { }

export interface RecipeRating {
  date: number;
  value: number;
}

export interface RecipeServings {
  amount: number;
  unit: RecipeServingsUnit;
}

export interface Recipe {
  slug: string;
  title: string;
  categoryId: string;
  previewImageUrl: string;
  servings: RecipeServings;
  description: string;
  ingredients: (RecipeIngredientGroup|RecipeIngredient)[];
  steps: (RecipeStepGroup|RecipeStep)[];
  notes: string[];
  ratings?: RecipeRating[];
  createdAt?: string;
  modifiedAt?: string;
};