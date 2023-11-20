import { Projects } from './projects.js';
import './style.css';


Projects.new_project('hi');
Projects.all_projects[0].new_item('duat', '21/11/2023', 'urgent');
Projects.all_projects[0].done_item(0);
console.log(Projects.all_projects);
// Projects.remove_project(0);
// console.log(Projects.all_projects);