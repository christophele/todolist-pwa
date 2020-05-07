'use strict';

import page from 'page';
import checkConnectivity from './network.js';

import { saveLocalTodos, getLocalCard, getTodoToCreate, getTodoToUpdate, getTodoToDelete } from './interaction/idb.js';
import { getAllDistant } from './interaction/requests.js';
import { save, update, remove } from './interaction/dispatcher.js';

checkConnectivity({interval:5000});

let initTransfer = async () => {
    
    let todos = await getTodoToCreate();
    for (let todo of todos || []) {
        save(todo);
    }

    todos = await getTodoToUpdate();
    for (let todo of todos || []) {
        update(todo);
    }

    todos = await getTodoToDelete();
    for (let todo of todos || []) {
        remove(todo);
    }
}
 
document.addEventListener('connection-changed', e => {
  let root = document.documentElement;
  document.offline = !e.detail;

  if(!document.offline){
    initTransfer();
    root.style.setProperty('--app-blue', '#007eef');
  }else{
    root.style.setProperty('--app-blue', '#7D7D7D');
  }

});

const app = document.querySelector('#app');

page('/', async (ctx) => {

    let username = localStorage.getItem('username');
    if(!username){
        username = prompt('Comment vous appelez-vous ?');
        localStorage.setItem('username', username);
    }

    window.username = username;

    const module = await import('./views/Home.js');
    const Home = module.default;

    let todos = [];
    if(!document.offline){
        let fetchedTodos = await getAllDistant();
        todos = await saveLocalTodos(fetchedTodos);
    }else{
        todos = await getLocalTodos();
    }

    await initTransfer();

    app.innerHTML = '';
    Home(app, todos);
});

page('/details/:card', async (ctx) => {
    const module = await import('./views/Details.js');
    const Details = module.default;

    let cardId = ctx.params.card;
    let card = await getLocalCard(cardId);

    app.innerHTML = '';
    Details(app, card);
});

page();