import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getInitials(name: string) {
  const names = name.trim().split(/\s+/)
  return names
    .map((n) => n.at(0))
    .join('')
    .toUpperCase()
}

export function capitalizeWords(str?: string) {
  if (!str) {
    return null
  }

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
