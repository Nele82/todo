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
      if (taskName == '') {
        alert('Please enter a task name');
      } else {
        controller.addTask(taskName);
        text.value = '';
      }
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
      document.cookie = name + '=' + value + ';' + expires + '; path=/;';
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

  // Check if the user has already given consent
if (!localStorage.getItem('cookieConsent')) {
  // Display a consent banner or popup to the user
  // You can customize this part according to your needs
  const consentBanner = document.createElement('div');
  consentBanner.innerHTML = `
    <div id="cookieConsentBanner" style="display: flex; justify-content: center; align-items: center; position: fixed; bottom: 0; left: 0; width: 100%; background-color: rgba(0, 0, 0, 0.199); padding: 3%;">
      <p>This website uses cookies to improve your experience. By continuing to use this site, you consent to the use of cookies.</p>
      <button id="acceptCookiesButton" style="margin-left: 1%; padding: 0.4%;">Accept</button>
    </div>
  `;

  // Append the consent banner to the document body
  document.body.appendChild(consentBanner);

  // Handle the accept button click event
  const acceptCookiesButton = document.getElementById('acceptCookiesButton');
  acceptCookiesButton.addEventListener('click', () => {
    // Set the cookie consent in local storage
    localStorage.setItem('cookieConsent', true);
    // Remove the consent banner
    document.getElementById('cookieConsentBanner').remove();
    // Place your first-party cookie here
    document.cookie = "myCookie=example; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";
  });
} else {
  // User has already given consent, place your first-party cookie directly
  document.cookie = "myCookie=example; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";
}
  
  controller.init();
  