export const isEmailValid = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};
export const isPasswordValid = (password: string) => {
  const minLength: number = 12;

  if (password.length < minLength) {
    return false;
  }

  // Vérification de la complexité du mot de passe (par exemple, au moins une lettre majuscule, une lettre minuscule et un chiffre)
  const containsUppercase = /[A-Z]/.test(password);
  const containsLowercase = /[a-z]/.test(password);
  const containsDigit = /\d/.test(password);
  const containsSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

  // Retourne vrai si le mot de passe respecte les critères de complexité
  return (
    containsUppercase &&
    containsLowercase &&
    containsDigit &&
    containsSpecialChar
  );
};
