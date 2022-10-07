import React from 'react'
import { submitBirthday } from '../lib/api'
import { MIN_CODE_LENGTH } from '../lib/config'
import { Button } from '../app/Button'
import { Input } from '../app/Input'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

type FormValues = {
  name: string;
  birthDate: Date;
  code: string;
  url: string;
}

const extractValidCode = (code: string | null): string | undefined => {
  if (!code || code.length < MIN_CODE_LENGTH) {
    return
  }
  return code
}

const ALLOWED_ORIGINS = [
  'lijstje.nl'
]

export const JoinBirthdayForm = () => {
  const [searchParams] = useSearchParams()
  const { handleSubmit, register, formState } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      code: extractValidCode(searchParams.get('code')),
    },
  })
  const navigate = useNavigate()

  const submitForm = handleSubmit(async (data) => {
    console.log(data)
    await submitBirthday(data)
    navigate('/')
  })

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-y-2 gap-x-1">
      <p>
        Wanneer je je aanmeld kan iedereen via de code die je invult er achter komen wanneer jij als
        volgende jarig bent.
      </p>

      <Input
        {...register('name', {
          required: true,
        })}
        id="name-input"
        label="Jouw naam"
        placeholder="Jan"
        autoComplete="given-name"
        type="text"
      />

      <Input
        {...register('birthDate', {
          required: true,
          valueAsDate: true,
        })}
        id="birth-input"
        label="Jouw geboortedatum"
        placeholder="26-7-1986"
        autoComplete="bday"
        type="date"
      />

      <Input
        {...register('code', {
          required: true,
          minLength: MIN_CODE_LENGTH,
        })}
        id="code-input"
        label="Jouw groepscode"
        autoComplete="off"
        type="text"
      />

      <Input
        {...register("url", {
          required: true,
          validate: (value) => {
            try {
              const url = new URL(value);
              return ALLOWED_ORIGINS.includes(url.origin);
            } catch {
              return false;
            }
          }
        })}
        id="code-input"
        label="Jouw verlanglijstje"
        autoComplete="off"
        type="url"
        placeholder="https://lijstje.nl/[jouw lijstje]"
      />

      <Button type="submit" disabled={!formState.isValid}>
        Feest{formState.isValid ? '! 🥳' : '?'}
      </Button>
    </form>
  )
}
