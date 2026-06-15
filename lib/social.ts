export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}
