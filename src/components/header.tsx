import { Search } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { Bell } from './icons/bell'
import { Code } from './icons/code'

export function Header() {
  return (
    <div>
      <div className="grid h-14 grid-cols-3 items-center bg-[#181F25] p-3 text-zinc-50">
        <div />
        <div className="flex h-8 items-center gap-2 rounded bg-[#333B45] px-3 py-[0.375rem]">
          <Search className="size-3 text-gray-400" />
          <input
            className="h-full flex-1 bg-transparent outline-none placeholder:text-sm placeholder:text-gray-400"
            placeholder="Search..."
          />
          <span className="text-xs font-normal text-gray-400">⌘ K</span>
        </div>
        <div className="flex items-center gap-5 justify-self-end">
          <Code className="size-6" />
          <Bell className="size-6" />
          <AccountMenu />
        </div>
      </div>
    </div>
  )
}
