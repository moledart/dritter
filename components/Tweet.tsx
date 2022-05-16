import React from 'react'
import { TTweet } from '../types/tweet'
import TimeAgo from 'react-timeago'
import { DotsHorizontalIcon } from '@heroicons/react/outline'

const Tweet = (props: TTweet) => {
  const { text, tag, username, userImg, image, timestamp, postPage } = props

  console.log(postPage)

  return (
    <div className="flex cursor-pointer border-b border-neutral-700 p-3">
      {!postPage && (
        <img src={userImg} alt="" className="mr-4 h-11 w-11 rounded-full" />
      )}
      <div className="flex w-full flex-col space-y-2">
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img
              src={userImg}
              alt="Profile Pic"
              className="mr-4 h-11 w-11 rounded-full"
            />
          )}
          <div className="text-neutral-500">
            <div className="group inline-block">
              <h4
                className={`font-bold text-neutral-300 group-hover:underline ${
                  !postPage && 'inline-block'
                }`}
              >
                {username}
              </h4>
              <span className={`text-sm  ${!postPage && 'ml-1.5'} `}>
                @{tag}
              </span>
            </div>{' '}
            ·{' '}
            <span className="text-sm">
              <TimeAgo date={timestamp?.toDate()} />
            </span>
            {!postPage && <p className="mt-1 text-neutral-300">{text}</p>}
          </div>
          <div className="icon group ml-auto flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-neutral-500 group-hover:text-yellow-600" />
          </div>
        </div>
        {postPage && <p className="mt-1 text-neutral-300">{text}</p>}
        <img
          src={image}
          alt=""
          className="mr-2 max-h-[700px] rounded-2xl object-cover"
        />
      </div>
    </div>
  )
}

export default Tweet
