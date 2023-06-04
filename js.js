// Model
const model = {
    tasks: []
  };

  // View
  const view = {
    init: function() {
      const btn1 = document.getElementById('btn1');
      btn1.addEventListener('click', this.handleAddTask);
      this.renderTasks();
    },
  
    handleAddTask: function() {
      const text = document.getElementById('text');
      const taskName = text.value;
      controller.addTask(taskName);
      text.value = '';
    },
  
    renderTasks: function() {
      const container = document.getElementById('container');
      container.innerHTML = '';
      if (model.tasks.length > 0) {
        for (let i = 0; i < model.tasks.length; i++) {
          const task = model.tasks[i];
          const taskDiv = document.createElement('div');
          const textSpan = document.createElement('span');
          const deleteBtn = document.createElement('button');
          textSpan.textContent = task;
          deleteBtn.innerHTML = `<i class="fa-solid fa-trash">`;
          deleteBtn.addEventListener('click', function() {
            controller.deleteTask(i);
          });
          taskDiv.appendChild(deleteBtn);
          taskDiv.appendChild(textSpan);
          container.appendChild(taskDiv);
        }
        document.getElementById('completedMsg').style.display = 'none';
      } else {
        document.getElementById('completedMsg').style.display = 'block';
      }
    }
  };
  
  // Controller
  const controller = {
    init: function() {
      view.init();
      this.loadTasks();
    },
  
    loadTasks: function() {
      const savedTasks = this.getCookie('tasks');
      if (savedTasks) {
        model.tasks = JSON.parse(savedTasks);
      }
      view.renderTasks();
    },
  
    addTask: function(taskName) {
      model.tasks.push(taskName);
      this.setCookie('tasks', JSON.stringify(model.tasks), 30);
      view.renderTasks();
    },
  
    deleteTask: function(index) {
      model.tasks.splice(index, 1);
      this.setCookie('tasks', JSON.stringify(model.tasks), 30);
      view.renderTasks();
    },
  
    setCookie: function(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + ';';
    },
  
    getCookie: function(name) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + '=') === 0) {
          return cookie.substring(name.length + 1, cookie.length);
        }
      }
      return '';
    }
  };  
  
  controller.init();
  