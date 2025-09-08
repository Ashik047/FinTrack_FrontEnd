import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Account from './pages/Account'
import PageNotFound from './pages/PageNotFound'
import Layout from './pages/Layout'
import History from './pages/History'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='account' element={<Account />} />
          <Route path='history' element={<History />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
