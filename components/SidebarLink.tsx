import React, { SVGProps } from 'react'

interface Props {
  title: string
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  active?: boolean
}

const SidebarLink = ({ title, Icon, active }: Props) => {
  return (
    <li
      className={`hoverAnimation group flex max-w-fit items-center space-x-4 rounded-full px-4 py-3 ${
        active && 'bg-[#d9d9d9] bg-opacity-10 font-bold'
      }`}
    >
      <Icon className="h-7 w-7" />
      <div className="hidden md:inline-flex">
        <span className="mr-2 group-hover:text-yellow-600 ">{title}</span>
      </div>
    </li>
  )
}

export default SidebarLink
