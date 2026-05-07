/**
 * 투두리스트 모듈
 * - localStorage에 todos 배열을 JSON으로 저장하여 새로고침 후에도 유지됩니다.
 * - 각 항목: { id: number, text: string, done: boolean }
 * - "완료" 토글, "삭제" 기능을 제공합니다.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "momentum.todos";

  const todoForm = document.getElementById("todo-form");
  const todoInput = document.getElementById("todo-input");
  const todoListEl = document.getElementById("todo-list");

  /** @type {{id:number, text:string, done:boolean}[]} */
  let todos = loadTodos();

  function loadTodos() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  function render() {
    todoListEl.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.dataset.id = String(todo.id);
      if (todo.done) li.classList.add("is-done");

      const text = document.createElement("span");
      text.className = "todo__text";
      text.textContent = todo.text;

      const doneBtn = document.createElement("button");
      doneBtn.type = "button";
      doneBtn.textContent = "완료";
      doneBtn.addEventListener("click", () => toggleDone(todo.id));

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.textContent = "삭제";
      delBtn.addEventListener("click", () => deleteTodo(todo.id));

      li.append(text, doneBtn, delBtn);
      todoListEl.appendChild(li);
    });
  }

  function addTodo(event) {
    event.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    todos.push({
      id: Date.now(),
      text,
      done: false,
    });
    saveTodos();
    render();
    todoInput.value = "";
  }

  function toggleDone(id) {
    todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
    saveTodos();
    render();
  }

  function deleteTodo(id) {
    todos = todos.filter((t) => t.id !== id);
    saveTodos();
    render();
  }

  function clearAll() {
    todos = [];
    localStorage.removeItem(STORAGE_KEY);
    render();
  }

  // 이벤트 바인딩
  todoForm.addEventListener("submit", addTodo);

  // 로그아웃 시 모든 할 일 초기화
  document.addEventListener("user:logout", clearAll);
  // 로그인 시 저장돼 있던 항목을 다시 그립니다 (방어적 처리).
  document.addEventListener("user:login", render);

  // 첫 진입 시 저장된 데이터 렌더링
  render();
})();node_modules
