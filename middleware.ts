import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  //checks current route pathname
  const path = req.nextUrl.pathname;
 
  // 3. gets username from authToken in local storage
  const token = req.cookies.get('authToken');
  let username;
  if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]))
      username = decodedToken.username;
  }
 
  // 4. Redirect to /widgets if the user is an admin
  if (username !== 'Kai') {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/widgets'],
}