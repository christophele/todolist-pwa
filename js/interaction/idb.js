import { openDB } from 'idb';

export async function initDB() {
  const version = window.config;
  const db = await openDB('todo', version || 1, {
    upgrade(db) {
      // Create a store of objects
      const store = db.createObjectStore('todos', {
        keyPath: 'id',
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex('synced', 'synced');
      store.createIndex('updated', 'updated');
      store.createIndex('deleted', 'deleted');
      store.createIndex('done', 'done');
      store.createIndex('date', 'date');
    },
  });
  return db;
}

export async function saveLocalTodos(data) {
  const db = await initDB();
  const tx = db.transaction('todos', 'readwrite');
  tx.store.clear();
  data.forEach(item => {
    tx.store.put(item);
  });
  await tx.done;
  return await db.getAll('todos');
}

export async function saveLocalTodo(data) {
  const db = await initDB();
  const tx = db.transaction('todos', 'readwrite');
  await tx.store.put(data);
  await tx.done;
  return await db.getAllFromIndex('todos', 'deleted', 'false');
}

export async function getLocalTodo() {
  const db = await initDB();
  return await db.getAllFromIndex('todos', 'deleted', 'false');
}

export async function removeLocalTodo(todo) {
  const db = await initDB();
  await db.delete('todos', todo.id);
  return await db.getAllFromIndex('todos', 'deleted', 'false');
}

export async function getLocalCard(cardId) {
  const db = await initDB();
  return await db.get('todos', parseInt(cardId));
}

//

export async function getTodoToCreate() {
  const db = await initDB();
  return (await db.getAllFromIndex('todos', 'synced', 'false'))
    .filter(todo => todo.removed === false && todo.updated === false);
}

export async function getTodoToUpdate() {
  const db = await initDB();
  return (await db.getAllFromIndex('todos', 'synced', 'false'))
    .filter(todo => todo.removed === false && todo.updated === true);
}

export async function getTodoToDelete() {
  const db = await initDB();
  return (await db.getAllFromIndex('todos', 'synced', 'false'))
    .filter(todo => todo.removed === true && todo.updated === false);
}