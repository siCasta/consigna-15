import { Router } from 'express'
import { getInfo } from '../controllers/info.js'

const router = Router()

router.get('/', getInfo)

export default router
