import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Dritter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1265px] ">
        <Sidebar />
        {/* Feed */}
        {/* Widgets */}
        {/* Modal */}
      </main>
    </div>
  )
}

export default Home
