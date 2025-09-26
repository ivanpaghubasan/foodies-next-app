import sql from "better-sqlite3";
import { mealSchema, MealSchema, mealsListSchema } from "../schemas/mealsSchema";
const db = sql('meals.db');

export async function getMeals():Promise<MealSchema[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error('Loading meals failed');
  const result = db.prepare('SELECT * FROM meals').all();
  const parsed = mealsListSchema.safeParse(result);
  if (!parsed.success) {
    throw new Error("Invalid data from DB: " + JSON.stringify(parsed.error.issues));
  }
  
  return parsed.data;
}

export async function getMeal(slug: string):Promise<MealSchema> {
  const result = db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
  const parsed = mealSchema.safeParse(result);
   if (!parsed.success) {
    throw new Error("Invalid data from DB: " + JSON.stringify(parsed.error.issues));
  }

  return parsed.data;
}