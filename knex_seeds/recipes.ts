import recipes from "../src/content/recipes/all";
import RecipeCategories, { Category, RecipeCategory } from "../src/interfaces/RecipeCategories";
import RecipeTags, { Tag, RecipeTag } from "../src/interfaces/RecipeTags";

exports.seed = async function(knex, Promise) {
  await deleteAllEntries(knex);

  await createAllEntries(knex);
};

async function deleteAllEntries(knex) {
  console.log("Deleting recipes");
  await knex("recipes").del();

  console.log("Deleting recipe_categories");
  await knex("recipe_categories").del();

  console.log("Deleting recipes_recipe_tags");
  await knex("recipes_recipe_tags").del();

  console.log("Deleting recipe_tags");
  await knex("recipe_tags").del();
}

async function createAllEntries(knex) {
  console.log("Inserting recipe_categories");

  const categories = getAllCategories(RecipeCategories);
  await knex("recipe_categories").insert(categories.parentCategories);
  await knex("recipe_categories").insert(categories.childCategories);

  console.log("Inserting recipes");
  let recipeTags: any = {};

  for (let recipe of recipes) {
    // transform json params to strings
    let dbRecipe: any = recipe;

    dbRecipe.servings = JSON.stringify(recipe.servings);
    dbRecipe.ingredients = JSON.stringify(recipe.ingredients);
    dbRecipe.steps = JSON.stringify(recipe.steps);
    dbRecipe.notes = JSON.stringify(recipe.notes);

    // save tags for later insertion
    recipeTags[dbRecipe.slug] = recipe.tags;
    delete dbRecipe.tags;

    await knex("recipes").insert(recipe);
  }

  console.log("Inserting recipe_tags");

  const tags = getAllTags(RecipeTags);
  await knex("recipe_tags").insert(tags);
  
  console.log("Inserting recipes_recipe_tags");

  const recipesRecipeTags = getRecipeTagInserts(recipeTags);
  await knex("recipes_recipe_tags").insert(recipesRecipeTags);
}

function getAllCategories(categories: RecipeCategory) {
  let parentCategories: Category[] = [];
  let childCategories: Category[] = [];

  for (let category of Object.values(categories)) {
    if (category.parentCategory != null) {
      childCategories.push(category);
    } else {
      parentCategories.push(category);
    }
  }

  return {
    parentCategories,
    childCategories
  };
}

function getAllTags(tags: RecipeTag): Tag[] {
  return Object.values(tags);
}

function getRecipeTagInserts(recipeTags: any): any[] {
  let inserts: any[] = [];

  for (let slug of Object.keys(recipeTags)) {
    let tags = recipeTags[slug];

    if (tags != null && tags.length >= 1) {
      for (let tag of tags) {
        inserts.push({
          recipeSlug: slug,
          tagId: tag.id,
        });
      }
    }
  }

  return inserts;
}
