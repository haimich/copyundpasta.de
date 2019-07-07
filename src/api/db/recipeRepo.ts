import { Recipe } from "@/interfaces/Recipe";
import KnexUtil from "../utils/KnexUtil";
import StringUtil from "../utils/StringUtil";

export default class RecipeRepo {

  public static async getRecipe(slug: string): Promise<Recipe> {
    const knex = KnexUtil.getConnection();
    
    const entries = await knex
      .table("recipes")
      .select("recipes.*", "recipes_recipe_tags.tagId")
      .leftJoin("recipes_recipe_tags", "recipes.slug", "=", "recipes_recipe_tags.recipeSlug")
      .where("recipes.slug", slug);

    if (entries == null || entries.length === 0) {
      return null;
    }

    let recipe: any = {};

    recipe.slug = entries[0].slug;
    recipe.title = entries[0].title;
    recipe.categoryId = entries[0].categoryId;
    recipe.previewImageUrl = entries[0].previewImageUrl;
    recipe.createdAt = entries[0].createdAt;
    recipe.modifiedAt = entries[0].modifiedAt;

    recipe.servings = StringUtil.parseJsonString(entries[0].servings, null);
    recipe.ingredients = StringUtil.parseJsonString(entries[0].ingredients, []);
    recipe.steps = StringUtil.parseJsonString(entries[0].steps, []);
    recipe.notes = StringUtil.parseJsonString(entries[0].notes, []);

    // gather tags
    let tagIds = {};

    for (let entry of entries) {
      if (entry.tagId != null && entry.tagId !== "") {
        tagIds[entry.tagId] = true;
      }
    }

    recipe.tags = Object.keys(tagIds);

    return recipe;
  }

  public static async getRating(slug: string): Promise<number> {
    const knex = KnexUtil.getConnection();
    
    const entries = await knex
      .table("recipe_ratings")
      .select("*")
      .where("recipe_ratings.recipeSlug", slug);

    if (entries == null || entries.length === 0) {
      return null;
    }

    let ratingSum = 0;

    for (const entry of entries) {
      ratingSum += entry.rating;
    }

    let avg = ratingSum / entries.length;

    return Math.round(avg * 10) / 10;
  }

  public static rateRecipe(recipeSlug: string, rating: number, uniqueIdentifier: string): Promise<void> {
    const knex = KnexUtil.getConnection();

    return knex
      .insert({
        recipeSlug,
        rating,
        uniqueIdentifier,
      })
      .into("recipe_ratings");
  }

}
