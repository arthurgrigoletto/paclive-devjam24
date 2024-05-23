import { useQuery } from '@tanstack/react-query'
import { useNavigate, useRouter } from '@tanstack/react-router'
import { Dropdown, type MenuProps } from 'antd'
import { LogOut } from 'lucide-react'
import { useCallback, useMemo } from 'react'

import { getProfile } from '@/api/get-profile'
import { useAuth } from '@/context/auth'
import { getInitials } from '@/lib/utils'

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

  const handleLogout = useCallback(() => {
    auth.logout().then(() => {
      router.invalidate().finally(() => {
        navigate({ to: '/' })
      })
    })
  }, [auth, router, navigate])

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: '0',
        className: 'pointer-events-none',
        label: (
          <div className="flex flex-col">
            <span>{profile?.name}</span>
            <span className="text-xs font-normal">{profile?.email}</span>
          </div>
        ),
      },
      {
        type: 'divider',
      },
      {
        key: '1',
        label: (
          <button
            className="flex w-full items-center font-bold"
            onClick={() => handleLogout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </button>
        ),
      },
    ],
    [profile, handleLogout],
  )

  return (
    <Dropdown trigger={['click']} menu={{ items }}>
      <button className="size-6 rounded-full bg-[#8C96A3] text-xs font-bold text-white">
        {isLoadingProfile ? <Skeleton /> : profile?.initials}
      </button>
    </Dropdown>
  )
}
