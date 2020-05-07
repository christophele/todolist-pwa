import {update, remove} from '../interaction/dispatcher.js';

export default function card(todo) {

    let todoTemplate = `
        <li class="${todo.done ? 'completed' : ''}">
            <div class="form-check" id="${todo.id}"> 
                <label class="form-check-label"> 
                    <input class="checkbox" type="checkbox" ${todo.done ? 'checked' : ''} > <i class="input-helper"></i>
                </label>
            </div>
            <a href="/details/${todo.id}">${todo.title}</a>
            <i class="remove js-remove-item mdi mdi-close-circle-outline"></i>
        </li>`;
            
    let todoElement = document.createElement('div');
    todoElement.innerHTML = todoTemplate;
    todoElement = todoElement.firstElementChild;
    
    todoElement.querySelector('.js-remove-item').addEventListener('click', () => {
        if(confirm('Supprimer le todo ?')){
            todo.removed = true;
            remove(todo);
            todoElement.remove();
        }
    });

    let checkbox = todoElement.querySelector('input');

    todoElement.querySelector('.form-check').addEventListener('click', () => {

        if(todoElement.classList.contains('completed')){
            todo.done = false;
            checkbox.removeAttribute('checked');
            todoElement.classList.remove('completed');
        }else{
            todo.done = true;
            checkbox.setAttribute('checked', 'checked');
            todoElement.classList.add('completed');
        }

        update(todo);
    });
    
    return todoElement;    
}