function Upcoming() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];  
    const today = new Date(); 
    const current_date  = today.getDate();
    const current_month = today.getMonth() + 1;
    const current_year  = today.getFullYear();
    const NUMBER_OF_CELLS = ([1, 3, 5, 7, 8, 10, 12].includes(current_month) ? 31 : 30);
    const NUMBER_OF_ROWS = 4;

    const cells_container = document.createElement('div');
    const color_guide     = document.createElement('div'); 
    const month_title     = document.createElement('div');                

    cells_container.setAttribute("id", "cells-container");
        color_guide.setAttribute("id", "color-guide"); 
        month_title.setAttribute("id", "month-title");

    month_title.innerHTML = `<h1>${months[current_month - 1]}, ${current_year}</h1>`;
    color_guide.innerHTML = `
        <span>Less todos</span> 
        <i class = "fa-solid fa-square"></i>
        <i class = "fa-solid fa-square"></i>
        <i class = "fa-solid fa-square"></i>
        <i class = "fa-solid fa-square"></i> 
        <span>More todos</span>
    `;

    for (let i = 1; i <= NUMBER_OF_CELLS;) {
        const column = document.createElement('div');
        column.setAttribute("class", "col");
        for (let j = 0; j < NUMBER_OF_ROWS && i <= NUMBER_OF_CELLS; j++, i++) {
            const date_cell = document.createElement('div');
            date_cell.setAttribute("class", "date-cell");
            date_cell.setAttribute("data-index", i); 
            if (i === current_date) {
                date_cell.setAttribute("id", "current");
            } 
            // brute-force counting how many tasks are there in day 'i' this month
            let tasks_count  = 0;
            let high_tasks   = 0;
            let medium_tasks = 0;
            let low_tasks    = 0;

            for (let index = 0; index < localStorage.length; index++) {
                JSON.parse(localStorage.getItem(index)).items_details.forEach((item) => {
                    const due_date = new Date(item.due_date);
                    if (due_date.getFullYear()  === current_year &&
                        due_date.getMonth() + 1 === current_month &&
                        due_date.getDate()      === i
                    ) {
                        tasks_count++;
                        high_tasks += (item.priority == 'high');
                        medium_tasks += (item.priority == 'medium');
                        low_tasks += (item.priority == 'low');
                    }
                });
            }
            date_cell.setAttribute("data-count", tasks_count);
            if (tasks_count > 0) {
                const stats = document.createElement('div');
                stats.setAttribute("id", "todos-stats");
                stats.innerHTML = `
                    <span class = "unicode-icon">🔥 ${high_tasks}</span>
                    <span class = "unicode-icon">✨ ${medium_tasks}</span>
                    <span class = "unicode-icon">📄 ${low_tasks}</span>
                `; 
                date_cell.appendChild(stats); 
            }
            // apply different heat map color for different number of tasks in that day
            if (tasks_count >= 10) date_cell.classList.add("heat-1000");
            else if (tasks_count >= 5) date_cell.classList.add("heat-500");
            else if (tasks_count >= 1) date_cell.classList.add("heat-100");
            column.appendChild(date_cell);  
        } 
        cells_container.appendChild(column);
    }
    return [month_title, color_guide, cells_container];
}

export {Upcoming};
