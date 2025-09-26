'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import classes from './nav-link.module.css';

type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return <Link href={href} className={path.startsWith(href) ? twMerge(classes.link, classes.active) : classes.link }>{children}</Link>;
}
