import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale = locale || 'vi';

  try {
    return {
      locale: resolvedLocale,
      messages: (await import(`../messages/${resolvedLocale}.json`)).default,
      timeZone: 'Asia/Ho_Chi_Minh'
    };
  } catch (error) {
    // Fallback to default locale if requested locale is not found
    return {
      locale: 'vi',
      messages: (await import(`../messages/vi.json`)).default,
      timeZone: 'Asia/Ho_Chi_Minh'
    };
  }
}); 