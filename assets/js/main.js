function load() {
    const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas ');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

//Capturar o evento da teca enter
inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return;    
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    li.appendChild(botaoApagar);
}

btnTarefa.addEventListener('click', function() {
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    
    if(el.classList.contains('apagar')) {
        el.parentElement.remove();
    }

    //Para que seja removido do localstorage também
    salvarTarefas();
}); 

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        //limpar o texto do botão
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    //Converte para string json
    const tarefasJSON = JSON.stringify(listaDeTarefas);
      
    //Só pode salvar strings
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');

    //converter de volta para array
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    } 
}

adicionaTarefasSalvas();
}

load();