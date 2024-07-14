import { useEffect, useRef, useState } from 'react'
import styles from './app.module.css'
import { Field } from './components/field/field';
import {
	EmailValidator,
	PasswordMinValidator,
	PasswordSymbolsValidator
} from './validators'

export const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passcheck, setPasscheck] = useState('')

  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isPasscheckValid, setIsPasscheckValid] = useState(false)

  const submitButtonRef = useRef(null)

  const onSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password })
  }

  const isFormValid = isEmailValid && isPasswordValid && isPasscheckValid

  useEffect(() => {
		if (isFormValid) {
			submitButtonRef.current.focus()
		}
  }, [isFormValid])

  return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Field
					type='email'
					name='email'
					placeholder='Введите email...'
					value={email}
					setValue={setEmail}
					setIsValid={setIsEmailValid}
					validators={[EmailValidator]}
				/>
				<Field
					type='password'
					name='password'
					placeholder='Введите пароль...'
					value={password}
					setValue={setPassword}
					setIsValid={setIsPasswordValid}
					validators={[
						PasswordMinValidator,
						PasswordSymbolsValidator
					]}
				/>
				<Field
					type='password'
					name='passcheck'
					placeholder='Повторите пароль...'
					value={passcheck}
					setValue={setPasscheck}
					setIsValid={setIsPasscheckValid}
					validators={[
						(value) =>
							value === password ? null : 'Пароли не совпадают'
					]}
					dependencies={{ password }}
					forceValidation={(value) => value.length > 0 && value.length >= password.length}
				/>
				<button
					type='submit'
					disabled={!isFormValid}
					ref={submitButtonRef}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
  )
}
