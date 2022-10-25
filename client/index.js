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
    //fetch todos in DB from server endpoint
    const response = await fetch('/api/todos');

    //if response is good, return it
    if (response.ok) {
        const todos = await response.json();
        return todos;
    };
};

const createTodos =  async (taskObj) => {
    const dateCreated = new Date().toLocaleDateString('en-US');
    console.log(dateCreated);
    taskObj['dateCreated'] = dateCreated;

    const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(taskObj),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });

    if (response.ok) {
        const newTodo = response.json();
        return newTodo;
    };
    return false;
};

document.addEventListener('DOMContentLoaded', async () => {
    const existingTasks = await fetchTodos();
    //set constant body to the body of the document
    const body = document.querySelector('body');
    //create header
    createElement(body, 'Grad Assessment Practice', 'h1')

    //create form used for entering new todos
    const todoForm = document.createElement('form');
    todoForm.name = 'todo-form';
    todoForm.className = 'todo-form';
    todoForm.addEventListener('submit', async (e) => {
        // e.preventDefault();
        const task = {};

        //iterate through the form's elements and grab the elements' names. if they match author or description add to task object as key/value pairs
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].name === 'author' || e.target.elements[i].name === 'description') {
                task[e.target.elements[i].name] = e.target.elements[i].value;
            }
        }
        const test = await createTodos(task);
    });
    document.body.appendChild(todoForm);

    //create label and inputs for author field
    const formAuthorLabel = createElement(todoForm, null, 'label');
    formAuthorLabel.for = 'form-author';
    const formAuthorInput = createElement(todoForm, null, 'input');
    formAuthorInput.id = 'form-author';
    formAuthorInput.name = 'author';
    formAuthorInput.placeholder = 'Enter your name'

    //create label and input elements for description field
    const formDescriptionLabel = createElement(todoForm, null, 'label');
    formDescriptionLabel.for = 'form-description';
    const formDescriptionInput = createElement(todoForm, null, 'input');
    formDescriptionInput.id = 'form-description';
    formDescriptionInput.name = 'description';
    formDescriptionInput.placeholder = 'Task description';

    //create submit button for the form
    const formButton = createElement(todoForm, 'Create Task', 'button');
    formButton.type = 'submit';
    formButton.id = 'form-submit';

    //add all inputs and labels to form
    todoForm.appendChild(formAuthorLabel);
    todoForm.appendChild(formAuthorInput);
    todoForm.appendChild(formDescriptionLabel);
    todoForm.appendChild(formDescriptionInput);
    todoForm.appendChild(formButton);

    //create container for to do list
    const tasksContainer = createElement(body, null, 'div');
    tasksContainer.className = 'task-container';

    //add the header for the tasks
    const tasksHeader = createElement(tasksContainer, null, 'div');
    tasksHeader.className = 'task-header';
    
    const headers = ['Author', 'Description', 'Date Created'];
    for (const header of headers) {
        createElement(tasksHeader, header, 'h5');
    };

    //If there are existing tasks, create a to do list
    if (existingTasks.length) {

        for (const task of existingTasks) {
            const taskItem = createElement(tasksContainer, null, 'div');
            taskItem.className = 'task-item';
            createElement(taskItem, task.author, 'p');
            createElement(taskItem, task.description, 'p')
            createElement(taskItem, new Date(task.dateCreated).toDateString(), 'p')
        }
    };
});