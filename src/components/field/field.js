import { useEffect, useState } from 'react'
import { validate } from './utils'
import styles from './field.module.css'

export const Field = ({
    value,
    setValue,
    setIsValid,
    validators,
    dependencies = {},
    forceValidation = () => false,
	...props
}) => {
    const [error, setError] = useState(null)
    const [isDirty, setIsDirty] = useState()

    const validateField = (currentValue, shouldValidate) => {
		let error = null
		let isValid = false

		if (shouldValidate) {
			error = validate(currentValue, validators)
			isValid = error === null
        }

        setError(error)
		setIsValid(isValid)
    }

    useEffect(() => {
        validateField(value, isDirty)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...Object.values(dependencies)])

	// поле при изменении
    const onChange = ({ target }) => {
        setIsDirty(true)
        setValue(target.value)

        const isForceValidated = forceValidation(target.value)

        validateField(target.value, isForceValidated)
	}

	// когда поле теряет фокус
    const onBlur = () => validateField(value, isDirty)

	return (
		<div className={styles.input_and_error}>
			<input onChange={onChange} onBlur={onBlur} {...props} />
			{error && <span className={styles.errorLabel}>{error}</span>}
		</div>
	)
}
