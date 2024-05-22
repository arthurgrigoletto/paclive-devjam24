import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'

import { getProfile } from '@/api/get-profile'
import { Dialog } from '@/components/ui/dialog'
import { useAuth } from '@/context/auth'
import { getInitials } from '@/lib/utils'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
  const router = useRouter()
  const navigate = useNavigate()
  const auth = useAuth()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
    select(data) {
      return {
        ...data,
        initials: getInitials(data.name),
      }
    },
  })

  function handleLogout() {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: '/' })
      })
    })
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="size-6 rounded-full text-xs font-bold"
            size="icon"
          >
            {isLoadingProfile ? <Skeleton /> : profile?.initials}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={15}
          className="w-56 rounded-sm border border-slate-700 bg-[#181F25] text-white"
        >
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <button
              className="w-full cursor-pointer hover:rounded-none"
              onClick={() => handleLogout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
