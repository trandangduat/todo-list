const projectHTMLTemplate = (function() {
    const DOM = [];
    const header_bar = document.createElement('div');
    header_bar.id = 'header-bar';
    header_bar.innerHTML = `
        <h1>
            <i class="fa-regular fa-file"></i>
            <div id = "project-name"><p style = "display:inline;"></p></div>
            <div id = "edit-project">
                <i class="fa-solid fa-pen" title = "Edit project"></i>
                <i id = "cancel-project-change" class="fa-solid fa-xmark" style = "display:none"></i>
            </div>
        </h1>
        <div id = "control">
            <div id="filter-item" class = "btn neutral"><i class="fa-solid fa-filter"></i>Filter</div>
            <div id="create-new-todo" class="btn confirm"><i class="fa-solid fa-pen-to-square"></i>New</div>
        </div>
    `;
    
    const items_wrapper = document.createElement('div');
    items_wrapper.id = 'items-wrapper';
    
    DOM.push(header_bar);
    DOM.push(items_wrapper);

    const change_project_name_to = function (project_name) {
        //console.log(project_name); 
        const header_title = document.querySelector("#header-bar > h1 > #project-name > p");
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
