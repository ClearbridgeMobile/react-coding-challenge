import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Temp from './Temp'
import Gallery from './Gallery'
import ArtView from './ArtView'
import Dummy from './Dummy'
import Comments from './Comments'

const Path = () => {
  return (
    <BrowserRouter>
        <Temp/>
        <Routes>
        <Route path="/temp" element={<Comments/>}/>
        <Route path="/" element={<Dummy/>}/>
        <Route path="/app/:page" element={<Gallery/>}/>
        <Route path="/inapp/:id/:page" element={<ArtView/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Path