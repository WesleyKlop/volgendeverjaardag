import React, { useState } from 'react'
import { NextBirthday } from '../api'
import { JoinBirthdayForm } from './JoinBirthdayForm'
import { NextBirthdayForm } from './NextBirthdayForm'

type ViewType = 'join' | 'view'

const formatDate = (date: string) => {
  const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' })
  return formatter.format(new Date(date))
}

export const App = () => {
  const [person, setPerson] = useState<NextBirthday | null>()
  const [currentView, setCurrentView] = useState<ViewType>('view')

  return (
    <main>
      <h1 className="text-4xl">Wie is er ookalweer jarig?</h1>

      {currentView === 'view' && !person && (
        <>
          <NextBirthdayForm onResult={(r) => setPerson(r)} />
          <div>
            <p>De volgende verjaardag in jouw groep snel vinden?</p>
            <a href="#" onClick={() => setCurrentView('join')}>
              registreer
            </a>
          </div>
        </>
      )}
      {currentView === 'join' && (
        <>
          <JoinBirthdayForm onFinished={() => setCurrentView('view')} />
        </>
      )}
      {person && (
        <div id="result">
          {person.name} is op {formatDate(person.next_birthday)} jarig en wordt dan {person.new_age}
          !
        </div>
      )}
    </main>
  )
}
