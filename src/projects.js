const todo_item = function (name, due_date, priority, status) {
    return { name, due_date, priority, status };
};

const project = function (name) {
    const all_items = [];
    const new_item = function (item_name, due_date, priority) {
        all_items.push(todo_item(item_name, due_date, priority, 'undone'));
    };
    const done_item = function (item_index) {
        all_items[item_index].status = 'done';
    };
    const remove_item = function (item_index) {
        all_items.splice(item_index, 1);
    };
    return {name, all_items, new_item, done_item, remove_item};
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