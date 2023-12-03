function todo_item (name, due_date, priority, status, index) {
    const item = document.createElement('div');
    const status_icon = (status == 'undone' ? "fa-regular fa-circle" : "fa-solid fa-circle-check");
    item.setAttribute('class', `todo-item ${priority} ${status}`);
    item.setAttribute('data-index', index);
    item.innerHTML = `
        <div id = "left-side">
            <div id = "mark-done"><i class = "${status_icon}"></i></div>
            <p id = "todos-name">${name}</p>
        </div>
        <div id = "right-side">
            <span class = "time-span">${due_date}</span>    
            <div id = "options">
                <div id = "dropdown-trigger"><i class="fa-solid fa-ellipsis"></i></div>
                <div class = "tooltip">
                    <div id = "edit" class = "opt">
                        <i class = "fa-solid fa-pen fa-fw"></i>Edit
                    </div>
                    <div id = "remove" class = "opt">
                        <i class="fa-solid fa-trash fa-fw"></i>Remove
                    </div>
                </div>
            </div>
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

const item = function(name, due_date, priority, status) {
    return {name, due_date, priority, status};
};

const project = function(name, index) {
    const all_items = [];
    const items_details = [];
    const update_project_to_storage = () => {
        localStorage.setItem(index, JSON.stringify({
            name,
            index,
            items_details
        }));
    };

    const new_item = (item_name, due_date, priority, status) => {
        all_items.push(todo_item(item_name, due_date, priority, status, all_items.length)); 
        items_details.push(new item(item_name, due_date, priority, status));
        // If the number of items in storage is < than that of DOMprojects then it means this item is freshly created.
        if (JSON.parse(localStorage.getItem(index)).items_details.length < all_items.length) {
            update_project_to_storage();   
        } 
        return all_items[all_items.length - 1];
    };

    const edit_item = (item_index, item_name, due_date, priority, status) => {
        const dom_status_icon = all_items[item_index].querySelector('#mark-done i');
        const   dom_item_name = all_items[item_index].querySelector('#todos-name');
        const    dom_due_date = all_items[item_index].querySelector('.time-span');
        
        dom_item_name.textContent = item_name;
        dom_due_date.textContent = due_date;
        
        if (status == 'done' && dom_status_icon.classList.contains('fa-regular', 'fa-circle')) {
            dom_status_icon.classList.remove('fa-regular', 'fa-circle');
            dom_status_icon.classList.add('fa-solid', 'fa-circle-check');
        }
        else if (status == 'undone' && dom_status_icon.classList.contains('fa-solid', 'fa-circle-check')) {
            dom_status_icon.classList.remove('fa-solid', 'fa-circle-check');
            dom_status_icon.classList.add('fa-regular', 'fa-circle');
        }
        all_items[item_index].setAttribute('class', `todo-item ${priority} ${status}`);
        items_details[item_index] = item(item_name, due_date, priority, status); 
        update_project_to_storage();  
    };
    
    const remove_item = (item_index) => {
        all_items.splice(item_index, 1);
        items_details.splice(item_index, 1);
        // update index of all items behind the removed one
        for (let i = item_index; i < all_items.length; i++) {
            all_items[i].setAttribute('data-index', i);
        }
        update_project_to_storage();   

    };
    
    const toggle_item_status = (item_index) => {
        toggle_status(all_items[item_index]);
        if (items_details[item_index].status == 'undone') {
            items_details[item_index].status = 'done';
        } else {
            items_details[item_index].status = 'undone';
        }
        update_project_to_storage();   
    };
    
    const dom_project_in_dropdown = document.createElement('li');
    dom_project_in_dropdown.setAttribute('data-index', index);
    dom_project_in_dropdown.innerHTML = `
        <div id = "left-side">
            <span class = "unicode-icon">📄</span>
            <p>${name}</p>
        </div>
        <div id = "remove-project">
            <i class="fa-solid fa-delete-left"></i>
        </div>
    `;
    
    return {
        name,
        index,
        items_details,
        dom_project_in_dropdown,
        all_items,
        new_item,
        edit_item,
        remove_item,
        toggle_item_status
    };
};


const DOMprojects = (function () {
    const all_projects = [];
    const update_storage_with_project = (i) => {
        const pj = all_projects[i];
        const name = pj.name;
        const index = pj.index;
        const items_details = pj.items_details;
        localStorage.setItem(index, JSON.stringify({
            name,
            index,
            items_details
        }));
    }; 
    const new_project = function (name, index) {
        all_projects.push(new project(name, index));
        if (!localStorage.getItem(index)) {
            update_storage_with_project(index);   
        } 
        return all_projects[index];
    };
    const change_project_name = function (index, new_name) {
        all_projects[index].name = new_name;
        all_projects[index].dom_project_in_dropdown.querySelector('p').innerText = new_name;
        update_storage_with_project(index);   
    };
    const remove_project = function (index) {
        all_projects.splice(index, 1);
        // After removing the 'index' project, all the projects to the right will be shifted to the left by 1 index
        localStorage.removeItem(index); 
        for (let i = index; i < all_projects.length; i++) {
            all_projects[i].index = parseInt(i); 
            all_projects[i].dom_project_in_dropdown.setAttribute('data-index', i);
            update_storage_with_project(i);   
        }
        localStorage.removeItem(all_projects.length);
    }
    return { 
        all_projects,
        new_project,
        remove_project,
        change_project_name
    };
})();

export { DOMprojects };
