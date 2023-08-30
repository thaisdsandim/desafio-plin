import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['pt', 'en', 'es'],
 
  defaultLocale: ''
});
 
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};