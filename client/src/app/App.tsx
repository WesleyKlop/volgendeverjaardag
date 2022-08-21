import React, { useCallback, useState } from 'react'
import { NextBirthday } from '../lib/api'
import { BirthDayResult } from './BirthdayResult'
import { JoinBirthdayForm } from './JoinBirthdayForm'
import { NextBirthdayForm } from './NextBirthdayForm'

type ViewType = 'join' | 'view'

export const App = () => {
  const [person, setPerson] = useState<NextBirthday | null>()
  const [currentView, setCurrentView] = useState<ViewType>('view')

  const reset = useCallback(() => {
    setCurrentView('view')
    setPerson(null)
  }, [])

  return (
    <main className="grid gap-4 p-4">
      <h1 className="text-4xl text-center font-title text-black">Wie is er ookalweer jarig?</h1>

      {currentView === 'view' && !person && (
        <>
          <NextBirthdayForm onResult={(r) => setPerson(r)} />

          <p>
            De volgende verjaardag in jouw vriendengroep snel vinden?&nbsp;
            <a
              className="text-blue-500 hover:text-blue-600"
              href="#"
              onClick={() => setCurrentView('join')}
            >
              Registreer
            </a>
            .
          </p>
        </>
      )}
      {currentView === 'join' && <JoinBirthdayForm onFinished={() => setCurrentView('view')} />}
      {person && <BirthDayResult person={person} />}
      {(currentView !== 'view' || person) && (
        <a className="text-blue-500 hover:text-blue-600 mr-auto" href="#" onClick={() => reset()}>
          ← terug
        </a>
      )}
    </main>
  )
}
