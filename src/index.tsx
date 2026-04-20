import { Hono } from 'hono'
import { getTodos, addTodo, toggleTodo, deleteTodo } from './store'
import { Layout, TodoList, TodoItem, TodoForm } from './views'

const app = new Hono()

app.get('/', (c) => {
  const todos = getTodos()
  return c.html(
    <Layout>
      <TodoForm />
      <TodoList todos={todos} />
    </Layout>
  )
})

app.post('/todos', async (c) => {
  let body: Record<string, string | File>
  try {
    body = await c.req.parseBody()
  } catch {
    return c.text('Invalid request body', 400)
  }
  const title = typeof body['title'] === 'string' ? body['title'].trim() : ''
  if (!title) {
    return c.text('Title is required', 400)
  }
  addTodo(title)
  const todos = getTodos()
  return c.html(<TodoList todos={todos} />)
})

app.patch('/todos/:id', (c) => {
  const id = c.req.param('id')
  const todo = toggleTodo(id)
  if (!todo) {
    return c.text('Not found', 404)
  }
  return c.html(<TodoItem todo={todo} />)
})

app.delete('/todos/:id', (c) => {
  const id = c.req.param('id')
  const deleted = deleteTodo(id)
  if (!deleted) {
    return c.text('Not found', 404)
  }
  return c.text('')
})

export default app
