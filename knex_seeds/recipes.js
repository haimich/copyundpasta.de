
exports.seed = async function(knex, Promise) {
  await deleteAllEntries(knex);

  await createAllEntries(knex);
};

async function deleteAllEntries(knex) {
  console.log("Deleting recipes recipe tags");
  await knex("recipes_recipe_tags").del();

  console.log("Deleting recipes");
  await knex("recipes").del();

  console.log("Deleting recipes tags");
  await knex("recipe_tags").del();

  console.log("Deleting child categories");
  await knex("recipe_categories")
    .whereNotNull("parentCategory")
    .del();

  console.log("Deleting remaining categories");
  await knex("recipe_categories").del();
}

async function createAllEntries(knex) {
  console.log("Inserting recipe categories");
  const recipeCategories = getRecipeCategories();
  await knex("recipe_categories").insert(recipeCategories);

  console.log("Inserting recipe tags");
  const recipeTags = getRecipeTags();
  await knex("recipe_tags").insert(recipeTags);

  console.log("Inserting recipes");
  const recipes = getRecipes();
  await knex("recipes").insert(recipes);

  console.log("Inserting tags for recipes");
  // get id of first recipe
  const firstRecipes = await knex.table("recipes").first("id")

  const recipesRecipeTags = [
    {
      recipeId: firstRecipes.id,
      tagId: "resteverwertung",
    },
  ];

  await knex("recipes_recipe_tags").insert(recipesRecipeTags);
}

function getRecipeCategories() {
  return [
    {
      id: "herzhaft",
      name: "Herzhaft",
    },
    {
      id: "pizza",
      name: "Pizza",
    },
    {
      id: "flammkuchen",
      name: "Flammkuchen",
      parentCategory: "pizza",
    },
    {
      id: "pasta",
      name: "Pasta",
    },
    {
      id: "brot",
      name: "Brot",
    },
  ]
}

function getRecipeTags() {
  return [
    {
      id: "resteverwertung",
      name: "Resteverwertung",
    },
    {
      id: "quicky",
      name: "Quick & Yummy",
    },
  ];
}

function getRecipes() {
  const servings = JSON.stringify({
    unit: "quantity",
    amount: 10,
  });

  const ingredients = JSON.stringify([
    {
      unit: "gram",
      amount: 500,
      name: "Mehl",
    },
    {
      unit: "gram",
      amount: 30,
      name: "Hefe",
    },
    {
      unit: "gram",
      amount: 30,
      name: "Zucker",
    },
    {
      unit: "quantity",
      amount: 2,
      name: "Eier",
    },
    {
      unit: "liter",
      amount: 0.25, // display as 1/4!
      name: "Milch",
    },
    {
      name: "Salz",
    },
    {
      unit: "gram",
      amount: 80,
      name: "Butter",
    },
  ]);

  const directions = JSON.stringify({
    steps: [
      {
        type: "step",
        content: "Hefeteig zubereiten und gehen lassen.",
      },
      {
        type: "step",
        content: "Dampfnudeln mit Mamas Bäckerknettechnik formen.",
      },
      {
        type: "step",
        content: "auf einem bemehlten Blech abermals gehen lassen.",
      },
      {
        type: "step",
        content: "Schmalz (oder Margarine) in einer gut verschließbaren Pfanne erhitzen.",
      },
      {
        type: "step",
        content: "nicht zu wenig Salz auf dem Pfannenboden verteilen.",
      },
      {
        type: "step",
        content: "Dampfnudeln hineinsetzen, eine Tasse heißes Wasser vorsichtig seitlich reinlaufen lassen.",
      },
      {
        type: "step",
        content: "Ca. 10 min. auf kleiner Flamme garen lassen."
      },
    ]
  });

  const notes = JSON.stringify([
    "Die Dampfnudeln sind fertig, wenn es im Topf knistert (dann ist das gesamte Wasser verdampft)",
  ]);

  const ratings = JSON.stringify([
    {
      date: 1558877368,
      value: 4.5,
    },
    {
      date: 1558877368,
      value: 5,
    },
  ]);

  return [
    {
      title: "Oma Hilda's Dampfnudeln",
      slug: "oma-hilds-dampfnudeln",
      categoryId: "herzhaft",
      previewImageUrl: "https://recipecontent.fooby.ch/14006_3-2_480-320.jpg",
      description: "Das Originalrezept meiner Uroma Hilda, das definitiv Eindruck bei euren Gästen macht!",
      servings,
      ingredients,
      directions,
      notes,
      ratings,
    },
  ]
}