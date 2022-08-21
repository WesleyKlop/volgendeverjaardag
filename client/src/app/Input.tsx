import classNames from 'classnames'
import React from 'react'
type Props = {
  id: string
  value: string
  setValue: (v: string) => void
  label: string
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input: React.FC<Props> = ({ label, id, value, setValue, className, ...args }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      id={id}
      className={classNames(
        className,
        'mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md',
      )}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      {...args}
    />
  </div>
)
