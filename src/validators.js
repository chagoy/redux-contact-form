export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';
// Uses a regular expression (regex) to check whether it looks enough like an
// email address.  Broken down:
// ^ Matches the start the text
// \S+ Matches one or more non-whitespace characters before the @
// @ A literal at sign
// \S+ Matches one or more non-whitespace characters after the @
// $ Matches the end of the text
export const email = value =>
    /^\S+@\S+$/.test(value) ? undefined : 'Must be a valid email address';
export const fiveCharacters = value => value.length === 5 ? undefined : 'The tracking number must be 5 characters long';
export const isANumber = value => parseInt(value) !== NaN ? undefined : 'The tracking number is all numbers';