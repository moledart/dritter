import React, { useState, useRef, useEffect } from 'react'

import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'

const Input = () => {
  const [input, setInput] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef<HTMLInputElement>(null)

  const addEmoji = (e) => {
    let sym = e.unified.split('-')
    let codesArray = []
    // console.log(sym)

    // sym.forEach((el) => codesArray.push('0x' + el))
    // let emoji = String.fromCodePoint(...codesArray)
    // setInput(input + emoji)
  }

  const addImageToPost = () => {}

  return (
    <div className={`flex space-x-3 border-b border-neutral-700 p-3`}>
      <img
        src="https://i.kym-cdn.com/photos/images/facebook/001/885/161/8fa.jpg"
        alt=""
        className="h-10 w-10 cursor-pointer rounded-full"
      />
      <div className="w-full ">
        <div className={``}>
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
                className="letf-1 absolute top-1 cursor-pointer rounded-full bg-neutral-900 p-2 hover:bg-neutral-700"
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
                {/* <Picker theme="dark" onSelect={(e) => addEmoji(e)} /> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Input
