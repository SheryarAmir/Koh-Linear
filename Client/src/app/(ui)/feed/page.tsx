import React from 'react'
import SubLayout from './layout'
import { Topbar } from '../components/topbar'
import { Sidebar } from '../components/sidebar'
const page = () => {
  return (
    <SubLayout>
    <div>
<Topbar />
<Sidebar/>

      
    </div>
    </SubLayout>
  )
}

export default page