const createElement = (parent, textContent, elementType) => {
    //create a new element of type elementType
    const newElement = document.createElement(elementType);

    //set innerHTML of the new element to textContent
    newElement.innerHTML = textContent;

    //append the new element to the parent node and return it
    parent.appendChild(newElement);
    return newElement;
};

const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    if (response.ok) {
        const todos = await response.json();
        console.log(todos);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
    //set constant body to the body of the document
    const body = document.querySelector('body');
    //create header
    createElement(body, 'Grad Assessment Practice', 'h1')

    const todoForm = document.createElement('form');
    todoForm.name = 'todo-form';
    todoForm.className = 'todo-form';
    document.body.appendChild(todoForm);

    const formAuthorLabel = createElement(todoForm, null, 'label');
    formAuthorLabel.for = 'form-author';
    const formAutherInput = createElement(todoForm, null, 'input');
    formAutherInput.id = 'form-author';

});