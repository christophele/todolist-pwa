import { save } from '../interaction/dispatcher.js';

export default function Details(app, todo) {
    let pageTemplate = `
    <div class="container" id="page-content" style="margin-top: 20px;">
        <div class="row d-flex justify-content-center">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <a href="/">< Retour</a>
                        <h2>${todo.title}</h2>
                        <p>${todo.desc}</p>
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
}