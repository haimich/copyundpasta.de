import { Article } from "@/api/interfaces/Article";

export async function getArticles(knex, id): Promise<Article[]> {
  const articles = await knex
    .table("articles")
    .select("*");

  return articles;
}