import { auth } from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    issuerBaseURL: 'https://dev-nrdya46540hut0v8.us.auth0.com',
    audience: 'http://localhost:5000',
    tokenSigningAlg: "RS256"
})

export default jwtCheck;