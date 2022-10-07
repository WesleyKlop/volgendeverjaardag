import React, { useCallback, useEffect, useState } from 'react'
import { fetchNextBirthday, NextBirthday } from '../lib/api'
import { confetti } from '../lib/confetti'
import { formatDate, isSameDate } from '../lib/date'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../app/Button'

type Params = {
  code: string
}
export const BirthDayResult: React.FC = () => {
  const [isLoading, setLoading] = useState(true)
  const [birthdays, setBirthdays] = useState<NextBirthday[]>([])
  const [isToday, setToday] = useState(false)
  const [isShowingAll, setShowingAll] = useState(false)
  const { code } = useParams<Params>()
  const navigate = useNavigate()

  const updatePerson = async (code: string) => {
    if (!code) {
      navigate('/')
      return
    }
    const result = await fetchNextBirthday(code)
    setLoading(false)

    if (!result) {
      return
    }

    setBirthdays(result)
    const today = isSameDate(new Date(result[0]?.nextBirthday))
    setToday(today)
    if (today) {
      await confetti()
    }
  }

  useEffect(() => {
    if (typeof code === 'string') {
      setLoading(true)
      void updatePerson(code)
    }
  }, [code])

  const showAll = useCallback(async () => {
    setLoading(true)
    const result = await fetchNextBirthday(code!, true)
    if (result)
      setBirthdays(result)
    setLoading(false)
    setShowingAll(true)
  }, [code])

  if (isLoading) {
    return <div>Laden...</div>
  }

  return birthdays ? (
    <div className="text-center">
      {birthdays.map((birthday) => (
        <p key={birthday.name}>
          {birthday.name} is op {formatDate(birthday.nextBirthday)} jarig en word dan {birthday.age}
          !
        </p>
      ))}
      {isToday && (
        <p className="text-xl">
          🎉🥳&nbsp;
          <button className="rainbow-text" type="button" onClick={() => confetti()}>
            En dat is vandaag! Van harte gefeliciteerd!
          </button>
          &nbsp;🥳🎉
        </p>
      )}
      {!isShowingAll && (<Button className="mt-4" onClick={showAll}>Bekijk wie nog meer jarig is</Button>)}
    </div>
  ) : (
    <div>Niemand gevonden</div>
  )
}
