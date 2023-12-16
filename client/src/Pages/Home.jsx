import React from 'react'
import Layout from '../components/Layout/Layout'
import { LoggedState } from '../context/auth';


const Home = () => {
  const currentUser = JSON.parse(localStorage.getItem('userinfo'));
  console.log(currentUser);
  return (
    <Layout title={"DashBoard | Reconnect"}>
        <div>
          Demo
          {currentUser ? currentUser.username : "____Nousers"}
        </div>
    </Layout>
  )
}

export default Home
