const createElement = (parent, textContent, elementType) => {
    //create a new element of type elementType
    const newElement = document.createElement(elementType);

    //set innerHTML of the new element to textContent
    newElement.innerHTML = textContent;

    //append the new element to the parent node and return it
    parent.appendChild(newElement);
    return newElement;
};

const createModal = (parent, author, description, id) => {
    //create wrapper modal
    const modal = createElement(parent, null, 'div');
    modal.className = 'modal';

    //create modal content container
    const modalContent = createElement(modal, null, 'div');
    modalContent.className = 'modal-content';

    //create heading
    createElement(modalContent, 'EDIT TASK', 'h4');

    //generate form to edit data
    const editTaskForm = createElement(modalContent, null, 'form');
    editTaskForm.name = 'edit-form';
    editTaskForm.className = 'edit-form';
    editTaskForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const editedTask = {};

        for (const element of e.target.elements) {
            if (element.name === 'author') {
                if (element.value.trim().length === 0 || element.value === author) continue;
                editedTask['author'] = element.value;
            }
            if (element.name === 'description') {
                if (element.value.trim().length === 0 || element.value === description) continue;
                editedTask['description'] = element.value;
            }
        }

        if (Object.keys(editedTask).length) {
            const editResponse = await editTodo(id, editedTask);
            if (editResponse) {
                window.location.reload();
            }
        }
    });

    const editAuthorLabel = createElement(editTaskForm, null, 'label');
    editAuthorLabel.for = 'edit-author';
    const editAuthorInput = createElement(editTaskForm, null, 'input');
    editAuthorInput.id = 'edit-author';
    editAuthorInput.name = 'author';
    editAuthorInput.placeholder = 'Enter new author'

    //create label and input elements for description field
    const editDescriptionLabel = createElement(editTaskForm, null, 'label');
    editDescriptionLabel.for = 'edit-description';
    const editDescriptionInput = createElement(editTaskForm, null, 'input');
    editDescriptionInput.id = 'edit-description';
    editDescriptionInput.name = 'description';
    editDescriptionInput.placeholder = 'Enter new description';

    //create container for the edit and cancel buttons
    const editButtonContainer = createElement(editTaskForm, null, 'div');
    editButtonContainer.className = 'edit-button-container';

    const editButton = createElement(editButtonContainer, 'Submit', 'button');
    editButton.type = 'submit';
    editButton.id = 'edit-submit';

    const cancelButton = createElement(editButtonContainer, 'Cancel', 'button');
    cancelButton.type = 'button';
    cancelButton.id = 'cancel-submit';
    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        //remove the modal from the DOM
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    })
}

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

const editTodo = async (id, taskObj) => {
    //send edit request
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(taskObj),
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json', 
        },
    });

    return response.ok;
}

const deleteTodo = async (id) => {
    //send delete request to backend
    const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
        }
    });

    //return whether the request was successful or not
    return response.ok;
};

document.addEventListener('DOMContentLoaded', async () => {
    const existingTasks = await fetchTodos();
    console.log('Page loaded ', existingTasks)
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
        };

        //if either author or description field is empty return immediately
        if (!task['author'] || !task['description']) return;
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
    
    const headers = ['Author', 'Description', 'Date Created', '', ''];
    for (const header of headers) {
        createElement(tasksHeader, header, 'h5');
    };

    //If there are existing tasks, create a to do list
    if (existingTasks.length) {

        for (const task of existingTasks) {
            //create div for each todo
            const taskItem = createElement(tasksContainer, null, 'div');
            taskItem.className = 'task-item';
            taskItem.id = `task ${task._id}`;

            //add author
            const author = createElement(taskItem, task.author, 'p');

            //add description
            const description = createElement(taskItem, task.description, 'p');
        
            //add date created
            createElement(taskItem, new Date(task.dateCreated).toDateString(), 'p');
            

            //add button to delete task
            const deleteButtonContainer = createElement(taskItem, null, 'div');
            deleteButtonContainer.className = 'button-container';
            const deleteButton = createElement(deleteButtonContainer, 'Delete', 'button');
            deleteButton.className='delete-button';
            deleteButton.addEventListener('click', async(e) => {
                //store result of response in result variable
                const result = await deleteTodo(`${task._id}`);

                //if response comes back true, reload the page to re-fetch data
                if (result) {
                    //remove grandparent node if response was successful
                    e.target.parentNode.parentNode.remove();
                    // window.location.reload();
                }
            });

            //add edit button
            const editButtonContainer = createElement(taskItem, null, 'div');
            editButtonContainer.className = 'button-container';
            const editButton = createElement(editButtonContainer, 'Edit', 'button');
            editButton.className='edit-button';
            editButton.addEventListener('click', (e) => {
                createModal(body, task.author, task.description, task._id);
            });
        }
    };

});