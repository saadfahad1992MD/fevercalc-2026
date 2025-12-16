// Vercel Edge Middleware for Geolocation-based Redirect
// This runs at the edge before the request reaches your app

export const config = {
  matcher: '/',
}

export default function middleware(request) {
  // Get the user's country from Vercel's geolocation header
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country') || 'SA'
  
  // Check if user has already been redirected this session
  const hasRedirected = request.cookies.get('fevercalc_geo_redirected')
  
  // Only redirect from root path and if not already redirected
  const url = new URL(request.url)
  if (url.pathname !== '/' || hasRedirected) {
    return
  }
  
  // Country to subdirectory mapping
  const countryRoutes = {
    'PH': '/ph',  // Philippines
    'ID': '/id',  // Indonesia
    'TR': '/tr',  // Turkey
    'MX': '/mx',  // Mexico
    'BR': '/br',  // Brazil
    'NG': '/ng',  // Nigeria
    'IN': '/in',  // India
    'EG': '/eg',  // Egypt
    // Saudi Arabia (SA) stays on root /
  }
  
  const targetPath = countryRoutes[country]
  
  if (targetPath) {
    // Create redirect response
    const redirectUrl = new URL(targetPath, request.url)
    const response = Response.redirect(redirectUrl, 307)
    
    // Set cookie to prevent redirect loop
    response.cookies.set('fevercalc_geo_redirected', 'true', {
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })
    
    return response
  }
  
  // No redirect needed (Saudi Arabia or unknown country)
  return
}
