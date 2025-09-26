'use server';

import { redirect } from "next/navigation";
import { mealInputSchema } from "../schemas/mealsSchema";
import { saveMeal } from "../services/mealsService";
import { MealFormState } from "@/types/mealsTypes";

export async function createMeal(initialState: MealFormState, formData: FormData) {
  const raw = {
    title: formData.get('title'),
    image: formData.get('image'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }
  
  const validatedFields = mealInputSchema.safeParse(raw);
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  await saveMeal(validatedFields.data);
  redirect('/meals');
}