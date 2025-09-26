import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import crypto from "crypto";
import path from "path";
import fs from "node:fs";
import { MealInputSchema, mealSchema, MealSchema, mealsListSchema } from "../schemas/mealsSchema";

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

export async function saveMeal(meal: MealInputSchema):Promise<void> {
  const slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = path.extname(meal.image.name);
  const fileName = `${crypto.randomUUID()}${extension}`;
  
  const arrayBuffer = await meal.image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  fs.writeFile(`public/images/${fileName}`, buffer, (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });

  const mealDbInput = mealSchema.parse({
    slug,
    title: meal.title,
    image: `/images/${fileName}`,
    summary: meal.summary,
    instructions: meal.instructions,
    creator: meal.creator,
    creator_email: meal.creator_email
  });

  await db.prepare(`
    INSERT INTO meals 
      (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (
      @slug,
      @title,
      @image,
      @summary,
      @instructions,
      @creator,
      @creator_email
    )
  `).run(mealDbInput);

}