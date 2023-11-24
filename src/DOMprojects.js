import { Projects } from './projects.js';

function todo_item (name, due_date, priority, status, index) {
    const item = document.createElement('div');
    item.setAttribute('class', `todo-item ${priority} ${status}`);
    item.setAttribute('data-index', index);
    item.innerHTML = `
        <div id = "left-side">
            <div id = "mark-done"><i class="fa-regular fa-circle"></i></div>
            <p>${name}</p>
        </div>
        <div id = "right-side">
            <span class = "time-span">${due_date}</span>
            <div id = "edit"><i class = "fa-solid fa-pen"></i></div>
            <div id = "remove"><i class="fa-solid fa-trash"></i></div>
        </div>
    `;
    return item;
};


function toggle_status (item) {
    if (item.classList.contains('undone')) {
        item.classList.remove('undone');
        item.classList.add('done');
    } else {
        item.classList.add('undone');
        item.classList.remove('done');
    }
}

function project (name, index) {
    const all_items = [];
    const new_item = function (item_name, due_date, priority) {
        Projects.all_projects[index].new_item(item_name, due_date, priority);
        
        all_items.push(todo_item(item_name, due_date, priority, 'undone', all_items.length));
        console.log(all_items);
        console.log(Projects.all_projects[index].all_items);
        return all_items[all_items.length - 1];
    };
    const remove_item = function (item_index) {
        Projects.all_projects[index].remove_item(item_index);
        all_items.splice(item_index, 1);
    };
    const toggle_item_status = function (item_index) {
        Projects.all_projects[index].toggle_item_status(item_index);
        toggle_status(all_items[item_index]);
    };
    const dom_project_in_dropdown = document.createElement('li');
    dom_project_in_dropdown.setAttribute('data-index', index);
    dom_project_in_dropdown.innerHTML = `
        <i class="fa-regular fa-file fa-fw"></i>
        <p>${name}</p>
    `;

    return { name, dom_project_in_dropdown, all_items, new_item, remove_item, toggle_item_status };
};

const DOMprojects = (function () {
    const all_projects = [];
    const new_project = function (name) {
        Projects.new_project(name);

        all_projects.push(project(name, all_projects.length));
        return all_projects[all_projects.length - 1];
    };
    const remove_project = function (project_index) {
        Projects.remove_project(project_index);
        
        all_projects.splice(project_index, 1);
    }
    return { all_projects, new_project, remove_project };
})();

export { DOMprojects };