/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name:Kayden Nguyen Student ID: 122582208 Date: 04/02/2023
*
*  Vercel App (Deployed) Link: https://web-422-a6-tan.vercel.app/
*
********************************************************************************/ 

import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';
import RouteGuard from '@/components/RouteGuard';

const App = ({ Component, pageProps }) => {
  return (
    <RouteGuard>
    <Layout>
      <SWRConfig value={{
        fetcher:
          async url => {
          const res = await fetch(url)

          if (!res.ok) {
          const error = new Error('An error occurred while fetching the data.')
        error.info = await res.json()
        error.status = res.status
        throw error
          }
        return res.json()
        }
      }}>{(
          <Component {...pageProps} />
        )}
      </SWRConfig>
    </Layout>
    </RouteGuard>
  )  
}
export default App


  