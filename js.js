  // M O D E L
  const model = {
      tasks: []
    };

  // V I E W 
  const view = {
    // 'init' method runs a 'handleAddTask' method through a click handler on the 'btn1' button
    // and runs the 'renderTask' method 
    init: function() {
      const btn1 = document.getElementById('btn1');
      btn1.addEventListener('click', this.handleAddTask);
      this.renderTasks();
    },
    // Takes a text input and passes it to the 'addTask' method and then clears the
    // text input field. NOTE: a RegExp pattern was set in order to prevent users from using
    // the semicolon ( ; ) character when entering a task as it creates a bug for the 'document.cookie' property
    handleAddTask: function() {
      const re = new RegExp(';', 'g');
      const text = document.getElementById('text');
      const taskName = text.value;
      if (taskName == '') {
        alert('Please enter a task');
      } else if (re.test(taskName) == true) {
        alert('Error! Please enter a task without using a semicolon ( ; )');
      } else {
        controller.addTask(taskName);
        text.value = '';
        text.focus()
      }
    },
    // Creates a new task-container with the task name based on the 'tasks' array 
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
        document.getElementById('completedMsg').style.display = 'flex';
      }
    }
  };
  
  // C O N T R O L L E R
  const controller = {
    init: function() {
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
        // First-party cookie 
        document.cookie = "consent=yes; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";
      });
    } else {
      // User has already given consent(first-party cookie placed directly)
      document.cookie = "consent=yes; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";
    }
      view.init();
      this.loadTasks();
    },
    // Gets the array of tasks (JSON) by using a 'getCookie()' method, parses them into the 
    // 'tasks' array and then re-renders
    loadTasks: function() {
      const savedTasks = this.getCookie('tasks');
      if (savedTasks) {
        model.tasks = JSON.parse(savedTasks);
      }
      view.renderTasks();
    },
    // Adds to the 'tasks' array, sets array of cookies and re-renders the task-containers
    addTask: function(taskName) {
      model.tasks.push(taskName);
      this.setCookie('tasks', JSON.stringify(model.tasks), 30);
      view.renderTasks();
    },
    // Deletes a task from the 'tasks' array and re-renders the task-containers
    deleteTask: function(index) {
      model.tasks.splice(index, 1);
      this.setCookie('tasks', JSON.stringify(model.tasks), 30);
      view.renderTasks();
    },
    // Sets a cookie
    setCookie: function(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = 'expires=' + date.toUTCString();
      document.cookie = name + '=' + value + ';' + expires + '; path=/;';
    },
    // Gets the array of tasks as JSON, if any tasks were previously stored.
    // Otherwise it returns an empty array.
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
  