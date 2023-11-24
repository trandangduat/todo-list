import './fontawesome.js'
import { DOMprojects } from './DOMprojects.js';
import { Projects } from './projects.js';
import { projectHTMLTemplate } from './projectHTMLTemplate.js';
import './style.css';

const main_content = document.getElementById('main-content');
const new_project_button = document.getElementById('create-new-project');
const projects_dropdown = new_project_button.parentElement;
const today_button = document.getElementById('today');
const upcoming_button = document.getElementById('upcoming');
const projects_button = document.getElementById('projects');
let current_project_index = -1;
let previous_active_label = today_button;
let previous_active_project;

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
                folder_icon.classList.remove('fa-folder');
                folder_icon.classList.add('fa-folder-open');
            } else {
                projects_dropdown.style.display = 'none';
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
                console.log("You're currently at project with index: " + current_project_index);
                
                projectHTMLTemplate.change_project_name_to(project.name);
                projectHTMLTemplate.fill_items_wrapper_with(project.all_items);

            }
        });
    })();

    const new_todo_item = (function() {
        main_content.addEventListener("click", function(event) {
            const clickedElement = event.target;
            if (clickedElement.id == 'create-new-todo') {
                const name = prompt('todo name?');
                const due_date = prompt('due date?');
                const priority = prompt('priority?');
                const new_item = DOMprojects.all_projects[current_project_index].new_item(name, due_date, priority);
                projectHTMLTemplate.add_item(new_item);

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
                console.log(Projects.all_projects[current_project_index].all_items);
            }
        });
    })();
})();