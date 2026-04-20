import type { Todo } from './types'

const todos: Todo[] = []

export function getTodos(): Todo[] {
  return todos
}

export function addTodo(title: string): Todo {
  const todo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  }
  todos.push(todo)
  return todo
}

export function toggleTodo(id: string): Todo | null {
  const todo = todos.find((t) => t.id === id)
  if (!todo) return null
  todo.completed = !todo.completed
  return todo
}

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex((t) => t.id === id)
  if (index === -1) return false
  todos.splice(index, 1)
  return true
}
