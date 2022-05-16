import { SparklesIcon } from '@heroicons/react/outline'
import { timeStamp } from 'console'
import {
  collection,
  CollectionReference,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase'
import Input from './Input'
import Tweet from './Tweet'
import { TTweet } from '../types/tweet'

const Feed = () => {
  const [tweets, setTweets] = useState<TTweet[]>([])

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'tweets'), orderBy('timestamp', 'desc')),
        (snapshot: any) => {
          const tweets: any = []
          snapshot.forEach((tweet: any) => {
            tweets.push(tweet.data())
          })
          setTweets(tweets)
        }
      ),

    [db]
  )

  return (
    <div className="ml-[88px] max-w-[598px] flex-grow border-x border-neutral-700 text-white lg:ml-[275px]">
      <div className="sticky top-0 z-50 flex items-center border-b border-neutral-700 bg-black py-2 px-3 text-white sm:justify-between">
        <h2 className="text-lg font-bold">Dritter feed</h2>
        <div className="hoverAnimation">
          <SparklesIcon className="h-5 w-5" />
        </div>
      </div>
      <Input />
      <div className="pb-72 ">
        {tweets.map((tweet: TTweet) => (
          <Tweet key={Number(tweet.timestamp)} {...tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feed
