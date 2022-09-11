import React, { useCallback, useEffect, useState } from 'react'
import { NextBirthday } from '../lib/api'
import { confetti } from '../lib/confetti'
import { isSameDate } from '../lib/date'
import { BirthDayResult } from '../routes/BirthdayResult'
import { JoinBirthdayForm } from '../routes/JoinBirthdayForm'
import { NextBirthdayForm } from './NextBirthdayForm'
import { Link, Outlet, useLocation } from 'react-router-dom'

type ViewType = 'join' | 'view'

export const App = () => {
  const [person, setPerson] = useState<NextBirthday | null>()
  const location = useLocation()

  useEffect(() => {
    if (person && isSameDate(new Date(person.next_birthday))) {
      void confetti()
    }
  }, [person])

  return (
    <main className="grid gap-4 p-4 max-w-screen-sm mx-auto">
      <h1 className="text-4xl text-center font-title text-black">Wie is er ookalweer jarig?</h1>

      <Outlet />

      {location.pathname !== '/' && (
        <Link className="text-blue-500 hover:text-blue-600 mr-auto" to="/">
          ← terug
        </Link>
      )}
    </main>
  )
}
