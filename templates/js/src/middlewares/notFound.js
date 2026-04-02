import responseMessage from '#constant/responseMessage.js'
import { httpError } from '#utils/httpError.js'
export default (req, res, next) => {
    try {
        throw new Error(responseMessage.NOT_FOUND(`route`))
    } catch (error) {
        httpError(next, error, req, 404)
    }
}
