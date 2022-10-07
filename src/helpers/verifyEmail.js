const MIN_PASSWORD_LENGTH = 7;
export default function verifyEmail(email, password) {
  const validRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i;
  return password.length < MIN_PASSWORD_LENGTH
    || !email.match(validRegex);
}
