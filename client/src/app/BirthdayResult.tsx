import React from 'react'
import { NextBirthday } from '../lib/api'
import { formatDate, isSameDate } from '../lib/date'

type Props = {
  person: NextBirthday
}
export const BirthDayResult: React.FC<Props> = ({ person }) => (
  <div className="text-center">
    <p>
      {person.name} is op {formatDate(person.next_birthday)} jarig en wordt dan {person.new_age}!
    </p>
    {isSameDate(new Date(person.next_birthday)) && (
      <p className="text-xl">
        🎉🥳 <span className="rainbow-text">En dat is vandaag! Van harte gefeliciteerd!</span> 🥳🎉
      </p>
    )}
  </div>
)
