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
} from '@heroicons/react/outline'

const Sidebar = () => {
  return (
    <div className="fixed hidden h-full flex-col items-center p-2  sm:flex md:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0">
        <Image width={32} height={32} src="https://rb.gy/ogau5a" />
      </div>
      <ul className="mt-4 mb-2 flex flex-col space-y-2">
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
      <div className="hoverAnimation mt-auto flex w-full items-center  py-3 md:px-4">
        <img
          src="https://i.kym-cdn.com/photos/images/facebook/001/885/161/8fa.jpg"
          alt=""
          className="h-10 w-10 rounded-full"
        />
        <div className="hidden leading-5 md:ml-4 md:inline">
          <h4 className="font-bold">moledart</h4>
          <p className="text-neutral-500">@moledart</p>
        </div>
        <DotsHorizontalIcon className="hidden h-5 md:ml-10 md:inline-flex" />
      </div>
    </div>
  )
}

export default Sidebar
