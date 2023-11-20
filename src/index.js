import { Projects } from './projects.js';
import { DOMprojects } from './DOMprojects.js';
import './style.css';

const main_content = document.getElementById('main-content');
const new_project_button = document.getElementById('create-new-project');
const projects_dropdown = new_project_button.parentElement;

function change_main_content (contents) {
    main_content.innerHTML = '';
    contents.forEach(element => {
        main_content.appendChild(element);
    });
}

const dom_manipulate = (function () {
    const new_project = (function() {
        new_project_button.addEventListener("click", function (e) {
            
            const project_name = (function() {
                return prompt("name?");
            })();

            Projects.new_project(project_name);
            DOMprojects.new_project(project_name);

            const len = DOMprojects.all_projects.length;
            const new_project = DOMprojects.all_projects[len - 1];

            projects_dropdown.insertBefore(DOMprojects.all_projects[len - 1].dom_project_in_dropdown, new_project_button);


            change_main_content(new_project.all_items);

        });
    })();
    const change_main_content_on_different_project = (function () {
        projects_dropdown.addEventListener("click", function(event) {
            const clickedElement = event.target;
            if (clickedElement.tagName == 'LI' && !(clickedElement.id == 'create-new-project')) {
                const index = clickedElement.getAttribute('data-index');
                console.log(index);
                change_main_content(DOMprojects.all_projects[index].all_items);
            }
        });
    })();
})();