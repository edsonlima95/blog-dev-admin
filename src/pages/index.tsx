import { getCookie } from "cookies-next"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useContext, useEffect } from "react"
import Breadcrumb from "../components/Breadcrumb"
import { Layout } from "../components/Layout"
import { UserContext } from "../contexts/UserContext"

export default function Home() {

  const { profile, setUserProfile } = useContext(UserContext)

  return (
    <>
      <Layout>
       
          <h1 className="my-6 text-3xl">Dashboard</h1>


       </Layout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const token = getCookie('blog.token', ctx)

  if (!token) {

    return {
      redirect: {
        destination: '/login',
        permanent: false
      }


    }
  }

  return {
    props: {},
  }
}
