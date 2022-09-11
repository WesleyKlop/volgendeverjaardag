import React, { StrictMode } from 'react'
import { App } from './app/App'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home'
import { JoinBirthdayForm } from './routes/JoinBirthdayForm'
import { BirthDayResult } from './routes/BirthdayResult'

const $app = document.querySelector<HTMLDivElement>('#app')!

const root = createRoot($app)
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="join" element={<JoinBirthdayForm />} />
          <Route path="code/:code" element={<BirthDayResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

export {}
