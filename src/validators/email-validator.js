export const EmailValidator = (value) =>
    /^\S{2,}@\S{2,}\.[a-zA-Z]{2,20}$/.test(value) ? null : 'Почта введена некорректно'
