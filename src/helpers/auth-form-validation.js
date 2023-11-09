export function validateEmail(email) {
  if (!email) {
    return { status: true, text: "Email is required" };
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!emailRegex.test(email)) {
    return { status: true, text: "Invalid email address" };
  }

  return { status: false, text: "" };
}

export function validatePassword(password) {
  if (!password) {
    return { status: true, text: '"Password is required"' };
  }

  if (password.length < 6) {
    return { status: true, text: "Password must be at least 6 characters" };
  }

  const englishLettersRegex = /^[A-Za-z]+$/;
  if (!englishLettersRegex.test(password)) {
    return {
      status: true,
      text: "Password must contain only English letters",
    };
  }

  const uppercaseLetterRegex = /[A-Z]/;
  if (!uppercaseLetterRegex.test(password)) {
    return {
      status: true,
      text: "Password must contain at least one uppercase letter",
    };
  }

  return { status: false, text: "" };
}
