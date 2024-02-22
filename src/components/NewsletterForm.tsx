'use client'

import { useRouter } from 'next/navigation'
import {
  ButtonHTMLAttributes,
  FormEvent,
  HTMLProps,
  createContext,
  useContext,
  useState,
} from 'react'
import { Button } from './Button'
import type { ButtonProps, variantStyles } from './Button'

type ClientFormProps = HTMLProps<HTMLFormElement>

const FormContext = createContext<{ formState: number }>({ formState: 0 })

export const ClientForm = ({ children, ...props }: ClientFormProps) => {
  const router = useRouter()
  const [formState, setFormState] = useState(3)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    console.log('target', event.target as HTMLFormElement)
    console.log(...formData)
    for (var entry in formData.keys()) {
      console.log(entry)
    }

    try {
      setFormState(1)
      const response = await fetch('/api/newsletterRegistration', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: formData,
      })

      if (response.status == 403) {
        setFormState(4)
      } else {
        const res = await response.json()
        if (res.data == 'success') {
          setFormState(2)
          router.push('/thank-you')
        } else {
          setFormState(3)
        }
      }
    } catch (err) {
      setFormState(3)
      console.error(err)
    }
  }

  return (
    <FormContext.Provider value={{ formState }}>
      <form {...props} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export const ClientFormInput = (props: HTMLProps<HTMLInputElement>) => {
  const { formState } = useContext(FormContext)
  return (
    <input
      {...props}
      type="email"
      name="email"
      placeholder="Email address"
      aria-label="Email address"
      required
      disabled={formState == 1}
    />
  )
}

type ClientFormSubmitButtonProps = {
  variant?: keyof typeof variantStyles
} & ButtonHTMLAttributes<HTMLButtonElement>

export const ClientFormSubmitButton = ({
  children,
  ...props
}: ClientFormSubmitButtonProps) => {
  const { formState } = useContext(FormContext)
  return (
    <Button {...props} type="submit" disabled={formState == 1}>
      {formState != 1 ? (
        <div className="w-7">{children}</div>
      ) : (
        <div className="w-7">
          <div className="flex items-center justify-center text-center">
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
    </Button>
  )
}
