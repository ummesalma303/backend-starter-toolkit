import globalErrorHandler from '#middlewares/globalErrorHandler.js'
import { middleware } from '#middlewares/middlewares.js'
import notFound from '#middlewares/notFound.js'
import logger from '#utils/logger.js'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'
import path from 'path'
import { pinoHttp } from 'pino-http'

const app: Application = express()

// Middleware setup
app.use(pinoHttp({ logger }))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(express.static(path.join(process.cwd(), '../', 'public')))
/* ------------------------------------ Error Handling ----------------------------------- */
app.use(globalErrorHandler)
app.use(notFound)
app.get('/', middleware)

export default app
