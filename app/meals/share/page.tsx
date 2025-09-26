'use client';

import { useActionState } from 'react';
import ImagePicker from '@/components/meals/image-picker';
import classes from './page.module.css';
import { createMeal } from '@/lib/actions/mealsAction';
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { MealFormState } from '@/types/mealsTypes';


const initialState: MealFormState = {
  success: false,
  errors: {}
}

export default function ShareMealPage() {
  const [state, formAction] = useActionState<MealFormState, FormData>(createMeal, initialState);

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={formAction}>
          <p>
            <label htmlFor="name">Your name</label>
            <input type="text" id="name" name="name" required />
          </p>
          {state.errors?.creator && (
            <p className="text-red-500 text-sm">{state.errors.creator[0]}</p>
          )}
          <p>
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" name="email" required />
          </p>
          {state.errors?.creator_email && (
            <p className="text-red-500 text-sm">{state.errors.creator_email[0]}</p>
          )}
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          {state.errors?.title && (
            <p className="text-red-500 text-sm">{state.errors.title[0]}</p>
          )}
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          {state.errors?.summary && (
            <p className="text-red-500 text-sm">{state.errors.summary[0]}</p>
          )}
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          {state.errors?.instructions && (
            <p className="text-red-500 text-sm">{state.errors.instructions[0]}</p>
          )}
          <ImagePicker 
            label="image"
            name="image"
          />
          {state.errors?.image && (
            <p className="text-red-500 text-sm">{state.errors.image[0]}</p>
          )}
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}