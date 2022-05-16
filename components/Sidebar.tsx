import Image from 'next/image'
import React from 'react'
import SidebarLink from './SidebarLink'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
  DotsHorizontalIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession()

  return (
    <div className="fixed flex h-full w-[88px] flex-col p-3 lg:w-[275px] ">
      <div className="hoverAnimation flex items-center justify-center">
        <Image width={32} height={32} src="https://rb.gy/ogau5a" />
      </div>
      <ul className="mt-4 mb-2 flex flex-col items-center justify-center space-y-2 lg:items-start">
        <SidebarLink Icon={HomeIcon} title="Home" active />
        <SidebarLink Icon={HashtagIcon} title="Explore" />
        <SidebarLink Icon={BellIcon} title="Notifications" />
        <SidebarLink Icon={MailIcon} title="Messages" />
        <SidebarLink Icon={BookmarkIcon} title="Bookmarks" />
        <SidebarLink Icon={CollectionIcon} title="Lists" />
        <SidebarLink Icon={UserIcon} title="Profile" />
        <SidebarLink Icon={DotsCircleHorizontalIcon} title="More" />
      </ul>
      <button className="mt-4 hidden w-full rounded-full bg-yellow-600 py-3 text-lg font-bold text-white hover:bg-yellow-700 lg:inline">
        Tweet
      </button>
      <div
        className="hoverAnimation mt-auto flex w-full items-center lg:px-4"
        onClick={() => signOut()}
      >
        <img
          src={session?.user.image}
          alt=""
          className="mx-auto h-10 w-10 rounded-full lg:mx-0 "
        />
        <div className="hidden leading-5 md:ml-4 lg:inline">
          <h4 className="font-bold">{session?.user.name}</h4>
          <p className="text-neutral-500">@{session?.user.tag}</p>
        </div>
        <LogoutIcon className="hidden h-5 md:ml-auto lg:inline-flex" />
      </div>
    </div>
  )
}

export default Sidebar
