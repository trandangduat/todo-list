import './fontawesome.js'
import { DOMprojects } from './DOMprojects.js';
import { Projects } from './projects.js';
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

const dom_manipulate = (function () {

    const toggle_dropdown_on_click = (function () {
        projects_button.addEventListener("click", function (event) {
            const folder_icon = document.querySelector("#projects > a > i");
            if (projects_dropdown.style.display == 'none') {
                projects_dropdown.style.display = '';
                projects_dropdown.style.animation = 'fadeInSlideDown 200ms forwards';
                folder_icon.classList.remove('fa-folder');
                folder_icon.classList.add('fa-folder-open');
            } else {
                projects_dropdown.style.display = 'none';
                projects_dropdown.style.animation = '';
                folder_icon.classList.remove('fa-folder-open');
                folder_icon.classList.add('fa-folder');
            }
        });
    })();

    const new_project = (function() {
        new_project_button.addEventListener("click", function (e) {
            
            const project_name = (function() {
                return prompt("name?");
            })();

            DOMprojects.new_project(project_name);

            const len = DOMprojects.all_projects.length;
            const new_project = DOMprojects.all_projects[len - 1];

            projects_dropdown.insertBefore(new_project.dom_project_in_dropdown, new_project_button);

            change_previous_active_label_to(projects_button);
            change_previous_active_project_to(new_project.dom_project_in_dropdown);

            change_main_content(projectHTMLTemplate.DOM);
            projectHTMLTemplate.change_project_name_to(new_project.name);
            projectHTMLTemplate.fill_items_wrapper_with(new_project.all_items);
        });
    })();
    
    const change_main_content_on_different_project = (function () {
        projects_dropdown.addEventListener("click", function(event) {
            const clickedElement = event.target;
            if (clickedElement.tagName == 'LI' && !(clickedElement.id == 'create-new-project')) {
                change_previous_active_project_to(clickedElement);
                change_previous_active_label_to(projects_button);
                
                const project = DOMprojects.all_projects[current_project_index];
                // console.log("You're currently at project with index: " + current_project_index);
                
                projectHTMLTemplate.change_project_name_to(project.name);
                projectHTMLTemplate.fill_items_wrapper_with(project.all_items);

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
                    project_name_section.innerText = DOMprojects.all_projects[current_project_index].name;
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

            due_date = formatDistanceToNow(parseISO(due_date));

            // close the dialog after clicking the 'Save changes' button
            edit_todo_info.close();

            // reset the form
            edit_todo_info.querySelector('form').reset();

            // create new item with information given in dialog
            if (dialog_action == 'CREATE') {
                const new_item = DOMprojects.all_projects[current_project_index].new_item(name, due_date, priority);
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