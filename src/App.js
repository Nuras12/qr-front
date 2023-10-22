import React, { Component, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Qr = React.lazy(() => import('./views/pages/qr/QrMain'))
const QrChoose = React.lazy(() => import('./views/pages/qr/QrChoose'))

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/qr" name="QR Page" element={<Qr />} />
            <Route exact path="/qr/choose/:id" name="QR Page" element={<QrChoose />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
