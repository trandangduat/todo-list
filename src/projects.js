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

function project (name) {
    const all_items = [];
    const new_item = function (item_name, due_date, priority) {
        all_items.push(todo_item(item_name, due_date, priority, 'undone'));
    };
    const edit_item = function (item_index, item_name, due_date, priority, status) {
        all_items[item_index] = todo_item(item_name, due_date, priority, status);
    };
    const remove_item = function (item_index) {
        all_items.splice(item_index, 1);
    };
    const toggle_item_status = function (item_index) {
        all_items[item_index].toggle_status();
    };
    return { name, all_items, new_item, edit_item, remove_item, toggle_item_status };
};

const Projects = (function() {
    const all_projects = [];
    const new_project = function (name) {
        all_projects.push(project(name));
    };
    const remove_project = function (project_index) {
        all_projects.splice(project_index, 1);
    }
    return {all_projects, new_project, remove_project};
})();

export {Projects};