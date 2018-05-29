import express from 'express'

import methods from './rover'

const router = express.Router()

router.use('/rover', methods)

export default router