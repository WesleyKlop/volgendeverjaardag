import classNames from 'classnames'
import React from 'react'

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  id: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, className, ...props }, ref) => (
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
    </div>
  ),
)
