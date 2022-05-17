import React, { useState, useEffect } from 'react'
import { TTweet } from '../types/tweet'
import TimeAgo from 'react-timeago'
import {
  DotsHorizontalIcon,
  HeartIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from '@heroicons/react/solid'
import { useSession } from 'next-auth/react'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'

const Tweet = (props: TTweet) => {
  const { text, tag, username, userImg, image, timestamp, postPage, id, uid } =
    props
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState([])

  const { data: session } = useSession()
  const router = useRouter()

  console.log(likes)

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, 'tweets', uid, 'likes', session!.user.uid))
    } else {
      await setDoc(doc(db, 'tweets', uid, 'likes', session!.user.uid), {
        username: session!.user.name,
      })
    }
  }

  useEffect(
    () =>
      onSnapshot(collection(db, 'tweets', uid, 'likes'), (snapshot: any) =>
        setLikes(snapshot.docs)
      ),
    [db, uid]
  )

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like: any) => like.id === session!.user.uid) !== -1
      ),
    [likes]
  )

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
            {!postPage && <p className=" text-neutral-300">{text}</p>}
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
        <div
          className={`flex w-10/12 justify-between ${postPage && 'max-auto'}`}
        >
          {/* <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation()
              setTweetId(id)
              setIsOpen(true)
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-yellow-500" />
            </div>
            {comments.length > 0 && (
              <span className="text-sm group-hover:text-yellow-500">
                {comments.length}
              </span>
            )}
          </div> */}

          {session?.user.uid === id ? (
            <div
              className="group flex items-center space-x-1"
              onClick={(e) => {
                e.stopPropagation()
                deleteDoc(doc(db, 'tweets', uid))
                router.push('/')
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            <div className="group flex items-center space-x-1">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation()
              likePost()
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-red-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`text-sm group-hover:text-pink-600 ${
                  liked && 'text-pink-600'
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          {/* <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-yellow-500" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-yellow-500" />
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Tweet
