import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

  let initialsArray = [...name.matchAll(rgx)] || [];

  const initials = (
    (initialsArray.shift()?.[1] || '') + (initialsArray.pop()?.[1] || '')
  ).toUpperCase();

  return initials;
}
