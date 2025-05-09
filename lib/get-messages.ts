export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default
  } catch (error) {
    return (await import(`../messages/vi.json`)).default
  }
}
