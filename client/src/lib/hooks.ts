import React, { useRef, useState, useEffect } from 'react'

export const useFormValidity = (deps: React.DependencyList) => {
  const [isValid, setValidity] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setValidity(formRef.current?.checkValidity() ?? false)
  }, deps)
  return { formRef, isValid }
}
