const form = document.querySelector('#task-form'),
	taskList = document.querySelector('.collection'),
	clearBtn = document.querySelector('.clear-tasks'),
	filter = document.querySelector('#filter'),
	taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

//Load all event Listeners
function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks)
	//Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear task event
	clearBtn.addEventListener('click', clearTask);
	// FilterTasks
	filter.addEventListener('keyup', filterTasks);
};

// Get Tasks from LS
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach(function (tasks) {
		// Create li elemnt
		const li = document.createElement('li');
		//Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(tasks));
		// Create new link elemt
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class="material-icons ">close</i>';
		// Append the link to li
		li.appendChild(link);

		//Append li to ul
		taskList.appendChild(li);
	});
}

//Add Task
function addTask(e) {

	e.preventDefault();

	if (taskInput.value === '') {
		alert('Add a task');
		return;
	};

	// Create li elemnt
	const li = document.createElement('li');
	//Add class
	li.className = 'collection-item';
	// Create text node and append to li
	li.appendChild(document.createTextNode(taskInput.value));
	// Create new link elemt
	const link = document.createElement('a');
	// Add class
	link.className = 'delete-item secondary-content';
	// Add icon html
	link.innerHTML = '<i class="material-icons ">close</i>';
	// Append the link to li
	li.appendChild(link);

	//Append li to ul
	taskList.appendChild(li);

	// Store in LS
	storeTaskInLocalStorage(taskInput.value);

	// Clear input
	taskInput.value = '';

};

// Store Task
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();
			// Clear text in close-icon
			e.target.textContent = '';
			// Remove From LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = []
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	console.log(taskItem.textContent)
	tasks.forEach(function(task, index){
		if(taskItem.textContent == task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Task
function clearTask() {
	taskList.innerHTML = '';

	// Clear from LS
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
	localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;
		console.log(item.toLowerCase().indexOf(text))
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none'
		}
	});
}