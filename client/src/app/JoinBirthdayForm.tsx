import React, { useState, useCallback, FormEvent } from 'react'
import { submitBirthday } from '../api'

type JoinBirthdayFormProps = {
  onFinished: () => void
}

export const JoinBirthdayForm = (props: JoinBirthdayFormProps) => {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [code, setCode] = useState('')
  const handleSubmit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      await submitBirthday({
        name,
        birthDate,
        code,
      })
      // props.onFinished()
    },
    [name, birthDate, code],
  )

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-y-2 gap-x-1">
      <label htmlFor="name-input">Jouw naam</label>
      <input
        className="px-2 py-1 rounded-sm border mx-2"
        placeholder="Jan"
        id="name-input"
        type="text"
        autoComplete="given-name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />
      <label htmlFor="birth-input">Jouw geboortedatum</label>
      <input
        className="px-2 py-1 rounded-sm border mx-2"
        placeholder="26-7-1986"
        id="birth-input"
        type="date"
        autoComplete="bday"
        value={birthDate}
        onChange={(e) => setBirthDate(e.currentTarget.value)}
      />
      <label htmlFor="code-input">Jouw groepscode</label>
      <input
        className="px-2 py-1 rounded-sm border mx-2"
        placeholder="jouw-code"
        id="code-input"
        type="text"
        autoComplete="off"
        autoFocus
        value={code}
        onChange={(e) => setCode(e.currentTarget.value)}
      />
      <button type="submit" className="col-span-2">
        Feest!
      </button>
    </form>
  )
}
