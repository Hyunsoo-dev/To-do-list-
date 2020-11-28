const $pendList = document.querySelector('.pendList');
const $compleList = document.querySelector('.compleList');
const $inputTodo = document.querySelector('.inputTodo');


const PEND_LIST = 'pending';
const COMPLE_LIST = 'completed';

let pend = [];
let completed = [];

function clickEnter(event) {
  if(event.keyCode === 13) {
    const currentValue = $inputTodo.value;
    
    addPendList(currentValue);
  }
}

function addPendList(value) {
  
    const $li = document.createElement('li');
    const $span = document.createElement('span');
    const $checkBtn = document.createElement('button');
    const $falseBtn = document.createElement('button');  
    const newId = pend.length + 1;
    $span.textContent = value;
    $checkBtn.textContent = '✅';
    $falseBtn.textContent = '❌';
    $falseBtn.classList.add('todoBtn');
    $li.id = newId;    
    $li.append($checkBtn, $falseBtn, $span);
    $pendList.append($li);

    
    const pendOjb = {
      id : newId,
      value : value,
    };
    pend.push(pendOjb);
    setPending();

    $inputTodo.value = '';
    $falseBtn.addEventListener('click', removePendList);
    
    $checkBtn.addEventListener('click', moveCompleList);
    $checkBtn.addEventListener('click', removePendList);
}

function setPending() {
  localStorage.setItem(PEND_LIST, JSON.stringify(pend));
}

function removePendList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  $pendList.removeChild(li);
  console.log(li.id);
  const filterPend = pend.filter( ele => parseInt(li.id) !== ele.id);
  pend = filterPend;
  setPending();
}

function getPendList(){
  const getValue = localStorage.getItem(PEND_LIST);

  if (getValue !== null) {
    const parsedPendList = JSON.parse(getValue);
    parsedPendList.forEach(ele => addPendList(ele.value));
  }
}
function getCompleList(){
  const getValue = localStorage.getItem(COMPLE_LIST);
  if (getValue !== null) {
    const parsedCompleList = JSON.parse(getValue);
    parsedCompleList.forEach( ele => addCompleList(ele.value));
  }
}

function moveCompleList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const value = li.childNodes[2].textContent;
  addCompleList(value);
}

function addCompleList(value) {
  const $li = document.createElement('li');
  const $span = document.createElement('span');
  const $checkBtn = document.createElement('button');
  const $falseBtn = document.createElement('button');  
  const newId = completed.length + 1;
  $span.textContent = value;
  $checkBtn.textContent = '✅';
  $falseBtn.textContent = '❌';
  $falseBtn.classList.add('todoBtn');
  
  $li.id = newId;
  $li.append($checkBtn, $falseBtn, $span);
  $compleList.append($li);

  const obj = {
    id : newId,
    value : value
  }
  completed.push(obj);
  setCompleted();

  $checkBtn.addEventListener('click', removeCompleList);

  $falseBtn.addEventListener('click', movePendList);
  $falseBtn.addEventListener('click', removeCompleList);
}

function setCompleted() {
  localStorage.setItem(COMPLE_LIST, JSON.stringify(completed));
}

function removeCompleList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  $compleList.removeChild(li);
  const filterComple = completed.filter( ele => parseInt(li.id) !== ele.id );
  completed = filterComple;
  setCompleted();
}

function movePendList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const value = li.childNodes[2].textContent;
  addPendList(value);
}

function init() {
  getPendList();
  getCompleList();
  $inputTodo.addEventListener('keyup', clickEnter);
}
init();