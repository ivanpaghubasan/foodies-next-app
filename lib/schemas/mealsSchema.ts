import { z } from "zod";

export const mealSchema = z.object({
  id: z.number().optional(),
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

export const mealInputSchema = z.object({
  title: z.string(),
  image: z.instanceof(File),
  summary: z.string(),
  instructions: z.string(),
  creator: z.string().min(1, "Name field is required"),
  creator_email: z.string(),
});
export type MealInputSchema = z.infer<typeof mealInputSchema>;