import './fontawesome.js'
import { DOMprojects } from './DOMprojects.js';
//import { Projects } from './projects.js';
import { projectHTMLTemplate } from './projectHTMLTemplate.js';
import './style.css';
import { formatDistanceToNow, parseISO } from 'date-fns'

const main_content = document.getElementById('main-content');
const new_project_button = document.getElementById('create-new-project');
const projects_dropdown = new_project_button.parentElement;
const today_button = document.getElementById('today');
const upcoming_button = document.getElementById('upcoming');
const projects_button = document.getElementById('projects');
const edit_todo_info = document.getElementById('edit-todo-information');
const cancel_todo_changes_button = document.querySelector('#edit-todo-information #cancel-change');
const save_todo_changes_button = document.querySelector('#edit-todo-information #save-change');
let current_project_index = -1;
let previous_active_label = today_button;
let previous_active_project;
let dialog_action = 'NONE';
let dialog_action_index = -1;

function change_main_content (contents) {
    main_content.innerHTML = '';
    contents.forEach(element => {
        main_content.appendChild(element);
    });
}

function change_previous_active_label_to (current_label) {
    previous_active_label.classList.remove('currently-active');
    current_label.classList.add('currently-active');
    previous_active_label = current_label;
}

function change_previous_active_project_to (current_project) {
    if (typeof previous_active_project !== 'undefined') {
        previous_active_project.classList.remove('current');
    }
    current_project_index = current_project.getAttribute("data-index");
    current_project.classList.add('current');
    previous_active_project = current_project;
}

function change_main_content_with_project (project_index) {
    const project = DOMprojects.all_projects[project_index];
        change_main_content(projectHTMLTemplate.DOM);
        projectHTMLTemplate.change_project_name_to(project.name);
    projectHTMLTemplate.fill_items_wrapper_with(project.all_items);
}

function add_project_label_to_sidebar_dropdown (project) {
    projects_dropdown.insertBefore(project.dom_project_in_dropdown, new_project_button);
}


const dom_manipulate = (function () {
    const toggle_dropdown_on_click = (function () {
        projects_button.addEventListener("click", function (event) {
            const folder_icon = document.querySelector("#projects > a > span.unicode-icon");
            if (projects_dropdown.style.display == 'none') {
                projects_dropdown.style.display = '';
                projects_dropdown.style.animation = 'fadeInSlideDown 200ms forwards';
                folder_icon.innerText = '📂'; 
            } else {
                projects_dropdown.style.display = 'none';
                projects_dropdown.style.animation = '';
                folder_icon.innerText = '📁'; 
            }
        });
    })();

    const new_project = (function() {
        new_project_button.addEventListener("click", function (e) {
            
            const project_name = (function() {
                return prompt("name?");
            })();

            if (!project_name) return;

            const len = DOMprojects.all_projects.length;
            const project = DOMprojects.new_project(project_name, len);

            add_project_label_to_sidebar_dropdown(project);
            change_previous_active_label_to(projects_button);
            change_previous_active_project_to(project.dom_project_in_dropdown);

            change_main_content(projectHTMLTemplate.DOM);
            projectHTMLTemplate.change_project_name_to(project.name);
            projectHTMLTemplate.fill_items_wrapper_with(project.all_items);
        });
    })();

    const remove_project = (function() {
        projects_dropdown.addEventListener("click", function(event) {
            const clickedElement = event.target.closest("#remove-project");
            if (clickedElement) {
                if (confirm("Are you sure you want to remove this project?")) {
                    const project = clickedElement.parentElement;
                    const index = project.getAttribute("data-index");
                    project.remove();
                    DOMprojects.remove_project(index);
                    // TODO: Return the 404 not found page if the current project is removed
                } 
            }
        });
    })();
    
    const click_project_label_to_change_main_content = (function () {
        projects_dropdown.addEventListener("click", function(event) {
            const clickedElement = event.target;
            const project_label = clickedElement.closest('#sidebar .dropdown > li');
            if (project_label && project_label.id != 'create-new-project') {
                change_previous_active_project_to(project_label);
                change_previous_active_label_to(projects_button);
                change_main_content_with_project(current_project_index);
            }
        });
    })();

    const edit_project_information = (function() {
        main_content.addEventListener("click", function (event) {
            const clickedElement = event.target;
            if (clickedElement.parentElement.id == 'edit-project') {
                const cancel_change = clickedElement.parentElement.querySelector("#cancel-project-change");
                const project_name_section = document.querySelector('#header-bar > h1 > #project-name');
                if (clickedElement.classList.contains('fa-pen')) {
                    clickedElement.classList.remove('fa-pen');
                    clickedElement.classList.add('fa-check');
                    cancel_change.style.display = 'block';
                    // make the project name section editable if it's in edit mode
                    project_name_section.contentEditable = 'true';
                    project_name_section.focus();
                } 
                else if (clickedElement.classList.contains('fa-check')) {
                    clickedElement.classList.remove('fa-check');
                    clickedElement.classList.add('fa-pen');
                    cancel_change.style.display = 'none';
                    // turn off editable content if it's out of edit mode
                    project_name_section.contentEditable = 'false';
                    // and change the project information with that given information
                    const project_name = project_name_section.innerText;
                    DOMprojects.change_project_name(current_project_index, project_name);
                } 
                else if (clickedElement.id == 'cancel-project-change') {
                    clickedElement.parentElement.querySelector('.fa-solid').classList.remove('fa-check');
                    clickedElement.parentElement.querySelector('.fa-solid').classList.add('fa-pen');
                    clickedElement.style.display = 'none';
                    // turn off editable content if it's out of edit mode
                    project_name_section.contentEditable = 'false';
                    // return the project name to orignal name
                    project_name_section.querySelector('p').innerText = DOMprojects.all_projects[current_project_index].name;
                }
            }
        });
    })();

    const new_todo_item = (function () {
        main_content.addEventListener("click", function(event) {
            const clickedElement = event.target;
            if (clickedElement.id == 'create-new-todo') {
                dialog_action = 'CREATE';
                // open dialog to get the item's information
                edit_todo_info.showModal();
            }
        });
    })();
    
    const mark_done_item = (function() {
        main_content.addEventListener("click", function(event) {
            const status_icon = event.target;
            const clickedElement = event.target.parentElement;
            if (clickedElement.id == 'mark-done') {
                if (status_icon.classList.contains('fa-regular', 'fa-circle')) {
                    status_icon.classList.remove('fa-regular', 'fa-circle');
                    status_icon.classList.add('fa-solid', 'fa-circle-check');
                } else {
                    status_icon.classList.remove('fa-solid', 'fa-circle-check');
                    status_icon.classList.add('fa-regular', 'fa-circle');
                }
                const item = clickedElement.parentElement.parentElement;
                const item_index = item.getAttribute("data-index");
                DOMprojects.all_projects[current_project_index].toggle_item_status(item_index);
            }
        });
    })();

    const edit_todo_item = (function() {
        main_content.addEventListener("click", function (event) {
            const clickedElement = event.target;
            if (clickedElement.id == "edit") {
                dialog_action = 'EDIT';
                // open dialog to get the item's information
                edit_todo_info.showModal();

                const item = clickedElement.closest('.todo-item');
                const index = item.getAttribute("data-index");

                // get the index of the todo item that trigger the dialog
                dialog_action_index = index;
            }
        });
    })();

    const handling_dialog_base_on_action = (function() {
        let name,
            due_date,
            priority;

        save_todo_changes_button.addEventListener("click", function (event) {
            event.preventDefault();
            name = edit_todo_info.querySelector('#item-name').value;
            due_date = edit_todo_info.querySelector('#due-date').value;
            priority = edit_todo_info.querySelector(`input[name="priority"]:checked`).value;

            due_date = formatDistanceToNow(parseISO(due_date), { addSuffix: true });

            // close the dialog after clicking the 'Save changes' button
            edit_todo_info.close();

            // reset the form
            edit_todo_info.querySelector('form').reset();

            // create new item with information given in dialog
            if (dialog_action == 'CREATE') {
                const new_item = DOMprojects.all_projects[current_project_index].new_item(name, due_date, priority, 'undone');
                projectHTMLTemplate.add_item(new_item);
            } 
            else if (dialog_action == 'EDIT'){
                DOMprojects.all_projects[current_project_index].edit_item(dialog_action_index, name, due_date, priority, 'undone');
            }
        });

        cancel_todo_changes_button.addEventListener("click", function (event) {
            event.preventDefault();
            // close the dialog
            edit_todo_info.close();
            // reset the form
            edit_todo_info.querySelector('form').reset();
        });
    })();

    const remove_todo_item = (function() {
        main_content.addEventListener("click", function(event) {
            const clickedElement = event.target;
            if (clickedElement.id == "remove") {
                const item = clickedElement.closest('.todo-item');
                const index = item.getAttribute("data-index");
                if (confirm("Delete this item?")) {
                    item.remove();
                    DOMprojects.all_projects[current_project_index].remove_item(index);
                    // console.log("item removed successfully!");
                }
            }
        });
    })();
})();

const load_local_storage_on_page_load = (function () {
    const load_project = (function() {
        for (let i = 0; i < localStorage.length; i++) {
            const project_in_storage = JSON.parse(localStorage.getItem(i));
            const project = DOMprojects.new_project(project_in_storage.name, i);
            add_project_label_to_sidebar_dropdown(project);
        }; 
    })();
     
    const load_todos_into_project = (function() {
        for (let i = 0; i < DOMprojects.all_projects.length; i++) {
            const todos = JSON.parse(localStorage.getItem(i)).items_details;
            todos.forEach((it) => {
                DOMprojects.all_projects[i].new_item(it.name, it.due_date, it.priority, it.status);
            }); 
        } 
    })();
})();
