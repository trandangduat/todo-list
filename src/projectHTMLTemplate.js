const projectHTMLTemplate = (function() {
    const DOM = [];
    const header_bar = document.createElement('div');
    header_bar.id = 'header-bar';
    header_bar.innerHTML = `
        <h1>
            <i class="fa-regular fa-file"></i>
            <p style = "display:inline;"></p>
        </h1>
        <div id="create-new-todo" class="btn primary">+ New todo</div>
    `;
    
    const items_wrapper = document.createElement('div');
    items_wrapper.id = 'items-wrapper';
    
    DOM.push(header_bar);
    DOM.push(items_wrapper);

    const change_project_name_to = function (project_name) {
        const header_title = document.querySelector("#header-bar > h1 > p");
        header_title.textContent = project_name;
    };

    const fill_items_wrapper_with = function (todo_items) {
        items_wrapper.innerHTML = '';
        todo_items.forEach(item => {
            items_wrapper.appendChild(item);
        });
    };

    const add_item = function (item) {
        items_wrapper.appendChild(item);
    };
    return { DOM, change_project_name_to, fill_items_wrapper_with, add_item};
})();

export {projectHTMLTemplate};