import React from 'react'
import classes from './meals-grid.module.css'
import MealItem from './meal-item';
import { MealSchema } from '@/lib/schemas/mealsSchema'

type MealsGridProps = {
  meals: MealSchema[];
}

export default function MealsGrid({meals}: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  )
}