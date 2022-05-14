import { SparklesIcon } from '@heroicons/react/outline'
import React from 'react'
import Input from './Input'

const Feed = () => {
  return (
    <div className="ml-[88px] max-w-[598px] flex-grow border-x border-neutral-700 text-white lg:ml-[275px]">
      <div className="sticky top-0 z-50 flex items-center border-b border-neutral-700 bg-black py-2 px-3 text-white sm:justify-between">
        <h2 className="text-lg font-bold">Dritter feed</h2>
        <div className="hoverAnimation">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>
      <Input />
    </div>
  )
}

export default Feed
