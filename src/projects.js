function todo_item (name, due_date, priority, status) {
    const toggle_status = function() {
        if (this.status == 'undone') {
            this.status = 'done';
        } else {
            this.status = 'undone';
        }
    };
    return { name, due_date, priority, status, toggle_status };
};

function project (name, index) {
    const all_items = [];
    const new_item = function (item_name, due_date, priority) {
        all_items.push(todo_item(item_name, due_date, priority, 'undone'));
        localStorage.setItem(index, JSON.stringify(this)); 
    };
    const edit_item = function (item_index, item_name, due_date, priority, status) {
        all_items[item_index] = todo_item(item_name, due_date, priority, status);
        localStorage.setItem(index, JSON.stringify(this)); 
    };
    const remove_item = function (item_index) {
        all_items.splice(item_index, 1);
        localStorage.setItem(index, JSON.stringify(this)); 
    };
    const toggle_item_status = function (item_index) {
        all_items[item_index].toggle_status();
        localStorage.setItem(index, JSON.stringify(this)); 
    };
    return { name, index, all_items, new_item, edit_item, remove_item, toggle_item_status };
};

const Projects = (function() {
    const all_projects = [];
    const new_project = function (name, index) {
        // If the project was already in localStorage then just parse the value into new project
        if (localStorage.getItem(index)) { 
            all_projects.push(localStorage.getItem(index)); 
        }
        // When the project is freshly created
        else {
            all_projects.push(project(name, all_projects.length));
            localStorage.setItem(all_projects.length - 1, JSON.stringify(all_projects[all_projects.length - 1]));
        } 
    };
    const remove_project = function (project_index) {
        all_projects.splice(project_index, 1);
    };
    const change_project_name = function (project_index, new_name) {
        all_projects[project_index].name = new_name;
    };
    return {all_projects, new_project, remove_project, change_project_name};
})();

export {Projects};
