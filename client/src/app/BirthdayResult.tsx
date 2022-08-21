import React from 'react'
import { NextBirthday } from '../lib/api'
import { formatDate } from '../lib/date'

type Props = {
  person: NextBirthday
}
export const BirthDayResult: React.FC<Props> = ({ person }) => (
  <div id="result">
    {person.name} is op {formatDate(person.next_birthday)} jarig en wordt dan {person.new_age}!
  </div>
)
