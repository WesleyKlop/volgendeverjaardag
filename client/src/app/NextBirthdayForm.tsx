import React, { useState, useCallback, FormEvent } from 'react'
import { fetchNextBirthday, NextBirthday } from '../api'
import { Birthday } from '../birthday'

type NextBirthdayFormProps = {
  onResult: (result: NextBirthday | null) => void
}

export const NextBirthdayForm = (props: NextBirthdayFormProps) => {
  const [code, setCode] = useState('')
  const handleSubmit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault()
      const nextBirthday = await fetchNextBirthday(code)
      props.onResult(nextBirthday)
    },
    [code],
  )

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Feest!</button>
    </form>
  )
}
