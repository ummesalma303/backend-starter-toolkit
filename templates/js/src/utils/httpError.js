import { errorObjectFunc } from './errorObjects.js'

const httpError = (nextFunc, err, req, errorStatusCode = 500) => {
    const errorObj = errorObjectFunc(err, req, errorStatusCode)
    nextFunc(errorObj)
}

export { httpError }
