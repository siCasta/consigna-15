import { Router } from 'express'
import { getRandom } from '../controllers/randoms.js'

const router = Router()

router.get('/', getRandom)

export default router
