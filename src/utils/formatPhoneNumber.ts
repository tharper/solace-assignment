export function formatPhoneNumber(phone: number | string) {
  const str = phone.toString();
  return str.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
} 