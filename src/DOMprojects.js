const todo_item = function (name, due_date, priority, status, index) {
    const item = document.createElement('div');
    item.setAttribute('class', `todo-item ${priority} ${status}`);
    item.setAttribute('data-index', index);
    item.innerHTML = `
        <div id = "mark-done">o</div>
        <p>${name}</p>
        <span class = "time">${due_date}</span>
        <div id = "remove">x</div>
    `;
    return {item};
};

const project = function (name, index) {
    const all_items = [];

    const header_bar = document.createElement('div');
    header_bar.setAttribute('id', 'header-bar');
    header_bar.innerHTML = `
        <h1>${name}</h1>
        <div id = "create-new-todo">+ New todo</div> 
    `;
    all_items.push(header_bar);

    const new_item = function (item_name, due_date, priority) {
        all_items.push(todo_item(item_name, due_date, priority, 'undone', all_items.length));
    };
    const done_item = function (item_index) {
        all_items[item_index].status = 'done';
    };
    const remove_item = function (item_index) {
        all_items.splice(item_index, 1);
    };
    const dom_project_in_dropdown = document.createElement('li');
    dom_project_in_dropdown.textContent = name;
    dom_project_in_dropdown.setAttribute('data-index', index);

    return { dom_project_in_dropdown, all_items, new_item, done_item, remove_item };
};

const DOMprojects = (function () {
    const all_projects = [];
    const new_project = function (name) {
        all_projects.push(project(name, all_projects.length));
    };
    const remove_project = function (project_index) {
        all_projects.splice(project_index, 1);
    }
    return { all_projects, new_project, remove_project };
})();

export { DOMprojects };