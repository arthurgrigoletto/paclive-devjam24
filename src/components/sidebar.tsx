import { Divider } from 'antd'

import { Config } from './icons/config'
import { Pin } from './icons/pin'
import { Ticket } from './icons/ticket'

export function Sidebar() {
  return (
    <div className="w-16 bg-[#434A54] px-2 py-4">
      <nav className="flex w-full flex-col items-center">
        <Pin className="size-5 text-white" />
        <Divider className="bg-[#CCD1D9]" />
        <div className="flex w-full flex-col items-center gap-5">
          <div className="flex size-12 items-center justify-center rounded-lg bg-black">
            <Ticket className="size-5 text-white" />
          </div>
          <Config className="size-5 text-white" />
        </div>
      </nav>
    </div>
  )
}
