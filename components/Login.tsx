import React from 'react'
import { InferGetServerSidePropsType } from 'next'
import { getServerSideProps } from '../pages'
import Image from 'next/image'
import { signIn } from 'next-auth/react'

const Login = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(providers)
  return (
    <div className="flex flex-col items-center space-y-20 pt-48">
      <Image src="https://rb.gy/ogau5a" width={150} height={150} />
      <div>
        {Object.values(providers).map((provider: any) => (
          <div key={(provider as any).name}>
            <button
              onClick={() => {
                signIn(provider.id, { callbackUrl: '/' })
              }}
              className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
            >
              <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-52 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-yellow-600 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
                Sign in with {provider.name}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Login
