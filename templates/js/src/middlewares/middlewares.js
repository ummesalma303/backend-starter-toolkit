import logger from '#utils/logger.js'

export const middleware = (req, res) => {
    res.send('Hello World!')
    logger.info('Response sent')
}
