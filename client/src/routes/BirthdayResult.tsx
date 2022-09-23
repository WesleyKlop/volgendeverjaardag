import React, { useEffect, useState } from 'react'
import { fetchNextBirthday, NextBirthday } from '../lib/api'
import { confetti } from '../lib/confetti'
import { formatDate, isSameDate } from '../lib/date'
import { useNavigate, useParams } from 'react-router-dom'

type Params = {
  code: string
}
export const BirthDayResult: React.FC = () => {
  const [person, setPerson] = useState<NextBirthday>()
  const [isToday, setToday] = useState(false)
  const { code } = useParams<Params>()
  const navigate = useNavigate()

  const updatePerson = async (code: string) => {
    if (!code) {
      navigate('/')
      return
    }
    const result = await fetchNextBirthday(code)

    if (result) {
      setPerson(result)
      setToday(isSameDate(new Date(result.next_birthday)))
    }
  }

  useEffect(() => {
    if (typeof code === 'string') {
      void updatePerson(code)
    }
  }, [code])

  return person ? (
    <div className="text-center">
      <p>
        {person.name} is op {formatDate(person.next_birthday)} jarig en wordt dan {isToday ? person.curr_age : person.new_age}!
      </p>
      {isToday && (
        <p className="text-xl">
          🎉🥳&nbsp;
          <button className="rainbow-text" type="button" onClick={() => confetti()}>
            En dat is vandaag! Van harte gefeliciteerd!
          </button>
          &nbsp;🥳🎉
        </p>
      )}
    </div>
  ) : (
    <div>Niemand gevonden</div>
  )
}
