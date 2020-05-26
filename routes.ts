import { Router } from 'https://deno.land/x/oak/mod.ts'
import { getBooks } from './controllers/books.ts'

const router = new Router()

router.get('/api/v1/books', getBooks)

export default router