import type { Todo } from './types'

export function Layout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>To-Do App</title>
        <script src="https://unpkg.com/htmx.org@2.0.4"></script>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: system-ui, sans-serif; background: #f5f5f5; color: #333; }
          .container { max-width: 600px; margin: 2rem auto; padding: 0 1rem; }
          h1 { margin-bottom: 1.5rem; }
          form { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
          input[type="text"] {
            flex: 1; padding: 0.5rem 0.75rem; border: 1px solid #ccc;
            border-radius: 4px; font-size: 1rem;
          }
          button { padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; }
          .btn-add { background: #2563eb; color: white; }
          .btn-add:hover { background: #1d4ed8; }
          .btn-delete { background: #dc2626; color: white; font-size: 0.85rem; padding: 0.25rem 0.5rem; }
          .btn-delete:hover { background: #b91c1c; }
          ul { list-style: none; }
          li { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem; background: white; border-radius: 4px; margin-bottom: 0.5rem; }
          .completed span { text-decoration: line-through; color: #999; }
          span { flex: 1; }
        `}</style>
      </head>
      <body>
        <div class="container">
          <h1>To-Do App</h1>
          {children}
        </div>
      </body>
    </html>
  )
}

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li class={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        hx-patch={`/todos/${todo.id}`}
        hx-target="closest li"
        hx-swap="outerHTML"
      />
      <span>{todo.title}</span>
      <button
        class="btn-delete"
        hx-delete={`/todos/${todo.id}`}
        hx-target="closest li"
        hx-swap="delete"
      >
        Delete
      </button>
    </li>
  )
}

export function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </ul>
  )
}

export function TodoForm() {
  return (
    <form hx-post="/todos" hx-target="#todo-list" hx-swap="innerHTML">
      <input type="text" name="title" placeholder="What needs to be done?" required />
      <button type="submit" class="btn-add">Add</button>
    </form>
  )
}
