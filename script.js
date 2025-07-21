const taskInput = document.querySelector('.task-list input');
// const addButton = document.querySelector('.task-list button');
const taskList = document.querySelector('ul');


function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    
    const taskContent = document.createElement('span');
    taskContent.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Excluir';
    deleteButton.onclick = () => {
        taskList.removeChild(taskItem);
        tarefasExcluidas.push(taskText);
        removerAFazer();
        saveTasks();
    };

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = '';

   tarefas.push(taskText);
   adicionarAoJSON();
}

let tarefas = JSON.parse(localStorage.getItem('taskText')) || [];
let tarefasExcluidas = JSON.parse(localStorage.getItem('tarefasExcluidas')) || [];

function adicionarAoJSON() {
   const arrayComNovoItemJSON = JSON.stringify(tarefas);
   localStorage.setItem('Tasks Adicionadas', arrayComNovoItemJSON);
}

function removerAFazer(){
    const arrayComItemRemovidoJSON = JSON.stringify(tarefasExcluidas);
    localStorage.setItem('Tasks Excluídas', arrayComItemRemovidoJSON);

}

function pegarDoJSON() {
   const tarefasJSON = localStorage.getItem('Tasks Adicionadas');
   const tarefasExcluidasJSON = localStorage.getItem('Tasks Excluídas');

   if (tarefasJSON) {
       const tarefas = JSON.parse(tarefasJSON);
       renderizarTarefas(tarefas);
   }
        
   if (tarefasExcluidasJSON) {
       const tarefasExcluidas = JSON.parse(tarefasExcluidasJSON);
       renderizarExcluidas(tarefasExcluidas);
   }
}

function renderizarTarefas(lista) {
    lista.forEach(taskText => {
        const taskItem = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = () => {
            taskList.removeChild(taskItem);
            tarefasExcluidas.push(taskText);
            removerAFazer();

            tarefas = tarefas.filter(tarefa => tarefa !== taskText);
            adicionarAoJSON();
        };

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

window.onload = pegarDoJSON;