export default function generatePassword(passwordLength) {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomChar =
      characters[Math.floor(Math.random() * characters.length)];
    password += randomChar;
  }
  return password;
}
