import { z } from "zod";

export const mealSchema = z.object({
  id: z.number(),
  slug: z.string(),
  title: z.string(),
  image: z.string(),
  summary: z.string(),
  instructions: z.string(),
  creator: z.string(),
  creator_email: z.string()
});

export const mealsListSchema = z.array(mealSchema);

export type MealSchema = z.infer<typeof mealSchema>;