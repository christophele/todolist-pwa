import { saveLocalTodo, removeLocalTodo } from './idb.js';
import { addDistant, updateDistant, removeDistant } from './requests.js';

export async function save(todo) {

    if (!document.offline) {
        const result = await addDistant(todo);
        if (result !== false) {
            saveLocalTodo(todo);
            return;
        }
    }

    console.log('error network');
    todo.synced = false;
    saveLocalTodo(todo);
}

export async function update(todo) {

    if (!document.offline) {
        const result = await updateDistant(todo);
        if (result !== false) {
            saveLocalTodo(todo);
            return;
        }
    }

    console.log('error network');
    todo.synced = false;
    saveLocalTodo(todo);
}

export async function remove(todo) {

    if (!document.offline) {
        const result = await removeDistant(todo);
        if (result !== false) {
            removeLocalTodo(todo);
            return;
        }
    }

    console.log('error network');
    todo.synced = false;
    saveLocalTodo(todo);

}