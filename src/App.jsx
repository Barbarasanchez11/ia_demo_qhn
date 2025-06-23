import React, { useState, useEffect } from 'react'
import AppRoutes from './routes/Routes'


const AppRoutes = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route path="/" element={<Home />} />
      </ReactRoutes>
    </Router>
  )
}

export default App;