export const PasswordSymbolsValidator = (value) =>
	/^\S+$/.test(value) &&
	/[a-zA-Z]+/.test(value) &&
    /[0-9]+/.test(value) &&
    // не буквы и не цифры
	/\W+/.test(value) ? null : 'Пароль должен содержать: буквы, цифры и символы'
