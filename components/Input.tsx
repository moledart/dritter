import React, { useState, useRef, useEffect } from 'react'

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'

import { db, storage } from '../firebase'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'

const Input = () => {
  const [input, setInput] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<any>('')
  const [showEmojis, setShowEmojis] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const filePickerRef = useRef<HTMLInputElement>(null)

  const sendPost = async () => {
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, 'tweets'), {
      // id: session.user.uid,
      // username: session.user.name,
      // userImg: session.user.image,
      // tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    })

    const ImageRef = ref(storage, `posts/${docRef.id}/image`)

    if (selectedImage) {
      await uploadString(ImageRef, selectedImage, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(ImageRef)
        await updateDoc(doc(db, 'tweets', docRef.id), {
          image: downloadUrl,
        })
      })
    }

    setLoading(false)
    setInput('')
    setSelectedImage('')
    setShowEmojis(false)
  }

  const addImageToPost = (e: React.FormEvent<HTMLInputElement>) => {
    const image = e.currentTarget.files
    const reader = new FileReader()

    if (image) {
      reader.readAsDataURL(image[0])
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result)
    }
  }

  return (
    <div
      className={`flex space-x-3 border-b border-neutral-700 p-3 ${
        loading && 'opacity-60'
      }`}
    >
      <img
        src="https://i.kym-cdn.com/photos/images/facebook/001/885/161/8fa.jpg"
        alt=""
        className="h-10 w-10 cursor-pointer rounded-full"
      />
      <div className="w-full ">
        <div className={`${selectedImage && 'pb-7'} ${input && 'space-y-2'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How's it going?"
            name=""
            id=""
            maxLength={140}
            className="w-full resize-none rounded-xl bg-neutral-900 py-2 px-3 outline-none"
          />

          {selectedImage && (
            <div className="relative">
              <div
                onClick={() => setSelectedImage('')}
                className="absolute left-1 top-1 cursor-pointer rounded-full bg-neutral-900 p-1 hover:bg-neutral-700"
              >
                <XIcon className="h-5 w-5" />
              </div>
              <img
                src={selectedImage}
                alt=""
                className="max-h-80 rounded-2xl object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center space-x-3">
            <div
              className="icon"
              onClick={() => filePickerRef.current?.click()}
            >
              <PhotographIcon className="h-6" />
              <input
                type="file"
                hidden
                name=""
                id=""
                onChange={addImageToPost}
                ref={filePickerRef}
              />
            </div>
            <div className="icon rotate-90">
              <ChartBarIcon className="h-6" />
            </div>
            <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className="h-6" />
            </div>
            <div className="icon">
              <CalendarIcon className="h-6" />
            </div>
            {showEmojis && (
              <div>
                {/* <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme="dark"
                /> */}
              </div>
            )}
          </div>
          <button
            disabled={!input.trim() && !selectedImage}
            onClick={sendPost}
            className={`rounded-full bg-yellow-600 px-4 py-2 text-lg font-bold text-white hover:bg-yellow-700 disabled:cursor-default disabled:opacity-60 disabled:hover:bg-yellow-600`}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  )
}

export default Input
