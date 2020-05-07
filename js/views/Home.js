import item from '../components/item.js';
import { save } from '../interaction/dispatcher.js';

export default function Home(app, todos) {
    let pageTemplate = `
        <div class="container" id="page-content" style="margin-top: 20px;">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Awesome Todo list</h4>
                            <div class="list-wrapper">
                                <ul class="d-flex flex-column-reverse todo-list" id="todoListContainer"></ul>
                            </div>

                            <div class="add-items" style="margin-top: 10px; border-top: 1px solid #007bff; padding-top: 20px;"> 
                                <input type="text" class="form-control w-100 todo-list-input" style="margin-bottom: 10px" placeholder="Qu'allez vous faire aujourd'hui ${window.username} ?" id="addTodoItemNameInput">
                                <input type="text" class="form-control w-100 todo-list-input" style="margin-bottom: 10px" placeholder="Description" id="addTodoItemDescriptionInput">
                                <button class="add btn btn-primary w-100 font-weight-bold todo-list-add-btn" id="addTodoItemBtn">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    let pageElement = document.createElement('div');
    pageElement.innerHTML = pageTemplate;
    pageElement = pageElement.firstElementChild;

    app.appendChild(pageElement);

    let todoListContainer = pageElement.querySelector('#todoListContainer');

    todos.forEach((todo) => {
        let todoElement = item(todo);
        todoListContainer.appendChild(todoElement);
    });

    let button = pageElement.querySelector('#addTodoItemBtn');
    button.addEventListener('click', () => {

        let nameInput = pageElement.querySelector('#addTodoItemNameInput');
        let nameValue = nameInput.value;    

        let descInput = pageElement.querySelector('#addTodoItemDescriptionInput');
        let descValue = descInput.value;

        if(nameValue.length <= 0 && descValue.length <= 0){
            return;
        }

        let todo = {
            id: Date.now(),
            title: nameValue,
            desc: descValue,
            synced: true,
            updated: false,
            done: false,
            removed: false,
            date: Date.now()
        };

        let todoItemElement = item(todo);
        todoListContainer.appendChild(todoItemElement);
        
        save(todo);

        nameInput.value = '';
        descInput.value = '';
    });
}



