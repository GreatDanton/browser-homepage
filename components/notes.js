// script for creating notes directly in browser

// get ids from arrays of tasks
function getID(arr) {
    var id_arr = [];
    for (var i = 0; i < arr.length; i++) {
        var row = arr[i];
        var id = row.getElementsByTagName('input')[0].id;
        id_arr.push(id);
    }
    return id_arr;
}

// adding tasks to local storage (done and todo)
function saveTasksToLocalStorage() {
    localStorage.clear();
    getTasks();
    id_todo = getID(task_todo);
    id_done = getID(task_done);

    for (var i = 0; i < id_todo.length; i++) {
        localStorage.setItem(id_todo[i], "false");
    }

    for (i = 0; i < id_done.length; i++) {
        localStorage.setItem(id_done[i], "true");
    }
}

// add tasks from local storage to dom, trigger on notes button press
function addTasksToDOM() {
    // populate tasks area with data from local storage
    task_container.innerHTML = "";
    todo_done.innerHTML = 0;
    task_all = [];
    for (var i = 0; i < localStorage.length; i++) {
        var task_id = localStorage.key(i);
        var completed = localStorage.getItem(localStorage.key(i));
        var row;
        // build DOM
        if (completed == "true") {
            // create task with given id and push it to task_all array
            row = createTask(task_id);
            row.getElementsByTagName('input')[0].checked = true; // mark checkboxes (completed tasks)
            todo_done.innerHTML = parseInt(todo_done.innerText) + 1;
            task_all.push(row); // add task to global array (used for filtering later)
        } else {
            row = createTask(task_id);
            task_all.push(row); // add task to global array (for filtering)
        }
        // add task to task container
        task_container.appendChild(row);
    }

    // increase counter by number of tasks in local storage
    todo_items.innerHTML = localStorage.length;
}


// Notes button is added to front page, where the slides buttons are
var first_page_btns = document.getElementsByClassName('buttons-container')[0];
first_page_btns.innerHTML += '<div class="notes-launcher">Notes</div>';
// end of notes button import


var notes_launcher = document.getElementsByClassName('notes-launcher')[0];
var notes_modal = document.getElementsByClassName('notes-modal')[0];
var notes_close_modal = document.getElementById('notes-close-modal');

// show notes modal on notes button click
notes_launcher.addEventListener('click', function () {
    notes_modal.classList.add('visible');
    // remove scrolling ability of body when notes-modal is opened
    document.body.classList.add('noscroll');

    // focus input on modal open
    // using set timeout as a workaround, because you can't focus on element
    // if the modal is fading in/out (changing opacity, etc)
    setTimeout(function () {
        todo_input.focus();
    }, 100);

    // add tasks from localStorage to dom (see function above)
    addTasksToDOM();
});


// hide notes modal
function hideNotes() {
    notes_modal.classList.remove('visible');
    // add body scroll ability when notes-modal is closed
    document.body.classList.remove('noscroll');
    // on close button, clear localStorage and append all tasks in it (checked/unchecked)
    saveTasksToLocalStorage();
}

// click on close button, closes modal & Save tasks to local storage
notes_close_modal.addEventListener('click', function () {
    hideNotes();
});




// On save tasks btn click, save tasks to local storage
var saveTasksBtn = document.getElementsByClassName('btn-save-tasks')[0];
saveTasksBtn.addEventListener('click', function () {
    saveTasksToLocalStorage();
});


// append stuff from todo to notes-container

var todo_input = document.getElementsByClassName('todo-input')[0];
var todo_add_button = document.getElementById('add-task-btn');
var task_container = document.getElementsByClassName('notes-todo-list')[0];

// add button clicked, append task to tasks container
todo_add_button.addEventListener('click', function () {
    addTask();
});


// creates task in correct form based on provided id
function createTask(id) {
    // create row container
    var row = document.createElement('div');
    row.className = 'row';
    row.id = "row__" + id;

    // create input checkbox
    var input = document.createElement('input');
    input.id = id;
    input.className = 'strikethrough';
    input.setAttribute('type', 'checkbox');
    input.onclick = function () {
        // if empty => will become checked == done
        // if checked => will become unchecked == todo
        if (this.checked) {
            todo_done.innerHTML = parseInt(todo_done.innerText) + 1;
        } else {
            todo_done.innerHTML = parseInt(todo_done.innerText) - 1;
        }
    };

    // create label
    var label = document.createElement('label');
    label.setAttribute('for', id);
    label.innerText = id;

    // create edit btn
    var editBtn = document.createElement('button');
    editBtn.className = 'button todo-btn todo-edit';
    editBtn.innerText = 'Edit';

    // create delete btn
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'button todo-btn todo-delete';
    deleteBtn.innerText = 'Delete';

    // append to row container
    row.appendChild(input);
    row.appendChild(label);
    row.appendChild(editBtn);
    row.appendChild(deleteBtn);

    editBtn.onclick = function () {
        showEditModal();
        taskEditClick(this.parentNode);
    };

    deleteBtn.onclick = function () {
        id = "row__" + input.id;
        // on delete remove task from task_all array
        for (i = 0; i < task_all.length; i++) {
            if (task_all[i].id === id) {
                task_all.splice(i, 1);
                break;
            }
        }
        // remove element
        document.getElementById(id).remove();
        // update task counter
        if (input.checked) {
            todo_done.innerHTML = parseInt(todo_done.innerText) - 1;
        }
        todo_items.innerHTML = parseInt(todo_items.innerText) - 1;
    }; // end of delete button event

    return row;
}


// add task to taks container
function addTask() {
    var task = todo_input.value;
    var todo_input_msg = document.getElementById('todo-input-msg');

    // if there is text in input box, append task to task container
    if (task.length > 0) {
        // if element with same id already exists, show error message, otherwise
        // add todo item in todo container
        //
        var check = document.getElementById(task);
        if (check !== null) {
            todo_input_msg.innerHTML = 'This task already exists';
        } else {
            var newTask = createTask(task);
            // append new task to dom
            task_container.appendChild(newTask);

            task_all.push(newTask);
            todo_input.value = ''; // clear add task input
            todo_input_msg.innerHTML = ""; // clear error message
            task_all.push(newTask); // push task to task_all array
            // add one to all task counter
            todo_items.innerHTML = parseInt(todo_items.innerText) + 1;
        }
    } else {
        todo_input_msg.innerHTML = "Can't add empty task";
    }
}

// Handling task edit button. Opens up modal and handles correct saving
function taskEditClick(parent_node) {
    var parent_container = parent_node;
    var checkbox = parent_container.getElementsByTagName('input')[0];
    var label = parent_container.getElementsByTagName('label')[0];
    var input_text = checkbox.id;
    var edit_input = document.getElementById('todo-edit-input');
    var save_btn = document.getElementById('todo-modal-save');
    var delete_btn = parent_container.getElementsByClassName('todo-delete')[0];
    edit_input.value = input_text;

    // on save button click, change label to desired value
    save_btn.onclick = function () {
        var new_name = edit_input.value;
        // check if new_name already exists
        var check = document.getElementById(new_name);
        var error_field = document.getElementById('todo-edit-error');

        // if check does exist throw error
        if (new_name.length > 0) {
            if (check !== null) {
                error_field.innerHTML = 'This task already exists';
            } else {
                checkbox.id = new_name;
                label.setAttribute('for', new_name);
                label.innerHTML = new_name;
                hideEditModal();

                // rename task in array
                for (i = 0; i < task_all.length; i++) {
                    if (task_all[i].id === "row__" + input_text) {
                        task_all[i].id = "row__" + new_name;
                        break;
                    }
                }
            }
        } else {
            error_field.innerHTML = "Can't add empty task";
        }
    };
}


// MODALS
var todo_edit_modal = document.getElementById('todo-edit-modal');
var todo_overlay = document.getElementById('todo-overlay');
// helper function for showing edit modal and overlay


// show task edit modal window
function showEditModal() {
    todo_edit_modal.classList.add('visible');
    todo_overlay.classList.add('visible');
}

// helper function for hiding modal and overlay
function hideEditModal() {
    todo_overlay.classList.remove('visible');
    todo_edit_modal.classList.remove('visible');
}

// hide modal on overlay click
todo_overlay.addEventListener('click', function () {
    hideEditModal();
});


// on X click hide todo edit modal
document.getElementById('todo-edit-modal-close').onclick = function () {
    hideEditModal();
};


// cancel button clicked
document.getElementById('todo-modal-cancel').onclick = function () {
    hideEditModal();
};


// if add task input is focused and enter is pressed, add task to tasks container
todo_input.onkeypress = function (e) {
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13') {
        addTask();
    }
};

// FILTERING

// get all tasks when the page is loaded, turn it into array
// FIX THIS
var task_all = []; //Array.prototype.slice.call(task_container.querySelectorAll('div'));
var task_done = [];
var task_todo = [];
//var task_all = Array.prototype.slice.call(task_container.querySelectorAll('div'));


// parse tasks from notes container, put them in correct array for filtering
function getTasks() {
    // for row in notes-container, add unchecked into task todo,
    // checked into task_done
    task_todo = [];
    task_done = [];
    for (i = 0; i < task_all.length; i++) {
        checked = task_all[i].firstElementChild.checked;
        if (checked) {
            task_done.push(task_all[i]);
        } else {
            task_todo.push(task_all[i]);
        }
    }
}

// add active class to picked button, remove active class from other buttons
function btnChangeActiveClass(element) {
    var parent = element.parentNode;
    var btn = parent.getElementsByClassName('button-active')[0];
    btn.classList.remove('button-active');
    element.classList.add('button-active');
}

// FILTER TASKS
// Display all tasks (done and todo)
document.getElementById('task-filter-all').addEventListener('click', function () {
    btnChangeActiveClass(this);
    getTasks();
    task_container.innerHTML = "";
    for (i = 0; i < task_all.length; i++) {
        task_container.appendChild(task_all[i]);
    }
});


// Display only task not done yet (todo tasks)
document.getElementById('task-filter-todo').addEventListener('click', function () {
    btnChangeActiveClass(this);
    getTasks();
    task_container.innerHTML = "";
    for (i = 0; i < task_todo.length; i++) {
        task_container.appendChild(task_todo[i]);
    }
});

// Display done tasks only
document.getElementById('task-filter-done').addEventListener('click', function () {
    btnChangeActiveClass(this);
    getTasks();
    task_container.innerHTML = "";
    for (i = 0; i < task_done.length; i++) {
        task_container.appendChild(task_done[i]);
    }
});

// Clear done tasks
document.getElementById('task-clear-done').addEventListener('click', function () {
    getTasks();
    task_all = task_todo;
    task_done = [];
    task_container.innerHTML = "";
    for (i = 0; i < task_all.length; i++) {
        task_container.append(task_all[i]);
    }
    // update tasks counter
    todo_done.innerHTML = task_done.length;
    todo_items.innerHTML = task_all.length;

    // remove active border around clear task button
    this.classList.remove('button-active');

    // add active class to all button
    var allBtn = document.getElementById('task-filter-all');
    btnChangeActiveClass(allBtn);
});


// COUNTER
todo_done = document.getElementById('todo-done');
todo_items = document.getElementById('todo-items');


// close notes modals if escape is pressed
document.addEventListener('keypress', function (e) {
    if (e.key === "Escape") {
        // if task edit modal is opened => close it
        if (todo_edit_modal.classList.contains('visible')) {
            hideEditModal();
        }
        // if notes parent container is the only one opened => close it
        else if (notes_modal.classList.contains('visible')) {
            hideNotes();
        }
    }
});