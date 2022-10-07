import classNames from 'classnames'
import React from 'react'
import { FieldError } from 'react-hook-form'

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement> & {
  label: string
  id: string
  error?: FieldError
  info?: string;
}

const formatValidationMessage = (error: FieldError) => {
  if (error.message) {
    return error.message
  }

  switch (error.type) {
    case 'required':
      return 'Dit veld is verplicht'
    case 'minLength':
      return 'Invoer is niet lang genoeg'
  }
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, className, error, info, ...props }, ref) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={classNames(
          className,
          'mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs font-light text-red-500 mt-0.5">{formatValidationMessage(error)}</p>
      ) : (
        info && (
          <p className="text-xs font-light mt-0.5">{info}</p>
        ))}
    </div>
  ),
)
