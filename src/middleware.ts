// middleware.ts

import { stackMiddlewares } from './middlewares/utils/stackMiddlewares'
import * as EnvMiddleware from './middlewares/WithEnv'
import { Middleware } from './middlewares/utils/types'

const middlewares: Middleware[] = [
    EnvMiddleware,
]

export default stackMiddlewares(middlewares)
