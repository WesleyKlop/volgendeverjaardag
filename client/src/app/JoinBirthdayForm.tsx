import React, { useState, useCallback, FormEvent, useEffect, useRef } from 'react'
import { submitBirthday } from '../lib/api'
import { MIN_CODE_LENGTH } from '../lib/config'
import { useFormValidity } from '../lib/hooks'
import { Button } from './Button'
import { Input } from './Input'

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
      props.onFinished()
    },
    [name, birthDate, code],
  )
  const { formRef, isValid } = useFormValidity([name, birthDate, code])

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-y-2 gap-x-1">
      <p>
        Wanneer je je aanmeld kan iedereen via de code die je invult er achter komen wanneer jij als
        volgende jarig bent.
      </p>
      <Input
        id="name-input"
        label="Jouw naam"
        placeholder="Jan"
        autoComplete="given-name"
        value={name}
        setValue={(v) => setName(v)}
        required
        type="text"
      />

      <Input
        id="birth-input"
        label="Jouw geboortedatum"
        placeholder="26-7-1986"
        autoComplete="bday"
        value={birthDate}
        setValue={(v) => setBirthDate(v)}
        required
        type="date"
      />

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
