import React, { useState, useCallback, FormEvent } from 'react'
import { fetchNextBirthday, NextBirthday } from '../lib/api'
import { MIN_CODE_LENGTH } from '../lib/config'
import { useFormValidity } from '../lib/hooks'
import { Button } from './Button'
import { Input } from './Input'

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
  const { formRef, isValid } = useFormValidity([code])

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Input
        id="code-input"
        label="Jouw groepscode"
        setValue={(v) => setCode(v)}
        required
        minLength={MIN_CODE_LENGTH}
        autoComplete="off"
        autoFocus
        type="text"
        value={code}
        inputMode="numeric"
      />

      <Button type="submit" disabled={!isValid}>
        Feest{isValid ? '! 🥳' : '?'}
      </Button>
    </form>
  )
}
