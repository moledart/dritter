import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Login from '../components/Login'
import Sidebar from '../components/Sidebar'

const Home: NextPage = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession()

  if (!session) return <Login providers={providers} />

  return (
    <div className="">
      <Head>
        <title>Dritter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mx-auto flex min-h-screen max-w-[1265px] ">
        <Sidebar />
        <Feed />
        {/* Widgets */}
        {/* Modal */}
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      providers,
      session,
    },
  }
}
