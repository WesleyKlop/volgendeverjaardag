import React, { useState, useCallback, FormEvent } from 'react'
import { fetchNextBirthday, NextBirthday } from '../lib/api'
import { MIN_CODE_LENGTH } from '../lib/config'
import { useFormValidity } from '../lib/hooks'
import { Button } from './Button'
import { Input } from './Input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type FormValues = {
  code: string
}

export const NextBirthdayForm = () => {
  const { handleSubmit, register, formState } = useForm<FormValues>({
    mode: 'onChange',
  })
  const navigate = useNavigate()

  const submitForm = handleSubmit(({ code }) => {
    navigate(`/code/${code}`)
  })

  return (
    <form onSubmit={submitForm} className="flex flex-col gap-6">
      <Input
        {...register('code', {
          required: true,
          minLength: MIN_CODE_LENGTH,
        })}
        id="code-input"
        label="Jouw groepscode"
        autoComplete="off"
        autoFocus
        type="text"
      />

      <Button type="submit" disabled={!formState.isValid}>
        Feest{formState.isValid ? '! 🥳' : '?'}
      </Button>
    </form>
  )
}
