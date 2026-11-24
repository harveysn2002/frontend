export function whatsappLink(number: string, message: string) {
  const digits = number.replace(/\D/g, "");
  const text = message.trim();
  if (!text) return `https://wa.me/${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function isExternalUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}
