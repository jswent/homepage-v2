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
import { variantStyles } from './Button'
import clsx from 'clsx'

enum FormState {
  READY,
  LOADING,
  ERR,
}

const FormContext = createContext<{ formState: FormState }>({
  formState: FormState.READY,
})

type ClientFormProps = HTMLProps<HTMLFormElement>

export const ClientForm = ({ children, ...props }: ClientFormProps) => {
  const router = useRouter()
  const [formState, setFormState] = useState(FormState.READY)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    try {
      setFormState(FormState.LOADING)
      const response = await fetch('/api/newsletterRegistration', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        body: formData,
      })

      if (response.status == 403) {
        setFormState(FormState.ERR)
      } else {
        const res = await response.json()
        if (res.data == 'success') {
          router.push('/thank-you?status=subscription-confirmed')
        } else {
          setFormState(FormState.ERR)
        }
      }
    } catch (err) {
      setFormState(FormState.ERR)
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
      disabled={formState == FormState.LOADING}
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
    <Button {...props} type="submit" disabled={formState == FormState.LOADING}>
      {formState != FormState.LOADING ? (
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

export const ClientFormError = ({
  className,
  ...props
}: HTMLProps<HTMLDivElement>) => {
  const { formState } = useContext(FormContext)
  return formState == FormState.ERR ? (
    <div {...props} className={clsx('text-red-500', className)}>
      An error occurred. Please try again or come back later.
    </div>
  ) : (
    <></>
  )
}
