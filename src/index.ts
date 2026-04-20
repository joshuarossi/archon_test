import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({ msg: 'Hello world' })
})

export default app
