import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { capitalizeWords, cn } from '@/lib/utils'

const statusTagVariants = cva(
  'text-xs font-bold px-3 py-1 rounded-full w-fit',
  {
    variants: {
      status: {
        ACTIVE: 'text-[#1F6CD1] bg-[#ECF3FD]',
        INACTIVE: 'bg-[#E6E9ED] text-[#434A54]',
      },
    },
  },
)

export type StatusTagProps = VariantProps<typeof statusTagVariants> &
  ComponentProps<'div'> & {
    status?: 'ACTIVE' | 'INACTIVE'
  }

export function StatusTag({ className, status, ...props }: StatusTagProps) {
  if (!status) return null

  return (
    <div className={cn(statusTagVariants({ className, status }))} {...props}>
      {capitalizeWords(status)}
    </div>
  )
}
