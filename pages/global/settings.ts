export const settings = {
  apiBaseUrl: (
    process.env.NODE_ENV === 'development' ? 
    'http://localhost:3000/api' : 
    'https://mysaves-eight.vercel.app/api'
  )
}