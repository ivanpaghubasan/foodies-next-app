import React from 'react'
import classes from './page.module.css';
import Image from 'next/image';
import { getMeal } from '@/lib/services/mealsService';
import { notFound } from 'next/navigation';


type PageProps = {
  params: Promise<{
    mealSlug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { mealSlug } = await params;
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary
  }
}

export default async function MealDetailPage({ params }: PageProps) {
  const { mealSlug } = await params;
  const meal = await getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill alt='An image of a meal'/>
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
          __html: meal.instructions
        }}></p>
      </main>
    </>
  )
}