import React from 'react'
import classnames from 'classnames'

const BASE_CLASSES = 'py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white'
const ACTIVE_CLASSES = 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
const DISABLED_CLASSES = 'disabled:bg-slate-300 disabled:shadow-none disabled:text-slate-100'

type Props = {
  type?: 'submit' | 'button'
  disabled?: boolean
  children?: React.ReactNode
  className?: string
}
export const Button: React.FC<Props> = ({ type, disabled, children, className }) => (
  <button
    type={type}
    disabled={disabled}
    className={classnames(BASE_CLASSES, ACTIVE_CLASSES, DISABLED_CLASSES, className)}
  >
    {children}
  </button>
)
