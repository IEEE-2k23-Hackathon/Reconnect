import React from 'react'
import Layout from '../components/Layout/Layout'
import { LoggedState } from '../context/auth';


const Home = () => {

  const isLoggedIn = LoggedState();
  console.log(isLoggedIn);
  const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('user')) : 0 ;
  console.log(currentUser.isCounselor);
  
  return (
    <Layout title={"DashBoard | Reconnect"}>
        <div>
          Demo
          {currentUser ? "_____" + currentUser.username : "____Nousers"}
          <br />
          Counselor : {JSON.stringify(currentUser.isCounselor)}
        </div>
    </Layout>
  )
}

export default Home
