# DAY_008 | Pomodoro Timer

This project is part of the daily code challenge series, **DAY_008**, featuring a **Pomodoro Timer** built to help users manage their time effectively using the Pomodoro Technique. The application allows users to focus on their tasks while taking regular breaks. I developed two versions of this project: one with a **bento grid design** and another with a **minimalist approach**. The final version is the minimalist grid, but I might add the bento version to it's own repo. 

## Inspiration

Inspired by the Serenity Moment Timer created by **Quentin Hocdé**.  
Check it out here: [Serenity Moment Timer](https://serenitymoment.app/timer)

---

## Inspiration

![Serenity Moment Timer](./assets/DAY_008_2.gif)  

## Bento Grid

![Bento Grid](./assets/DAY_008_1.gif)

## Minimalist
![Minimalist](./assets/DAY_008_3.gif)

---
## Project Structure

```bash
DAY_008/
│
├── assets/
│   └── DAY_008_1.gif
│   ├── DAY_008_2.gif
│   ├── DAY_008_3.gif
│   ├── favicon.ico
│   ├── giphygradient.webp
│   └── miku.gif
├── fonts/
│   └── helveticaneue.woff2
├── styles/
│   └── dashboard.css
│   └── style.css
├── index.html
├── timer.html
├── dashboard.js # future implementations
└── app.js
```

---

## Features

- **Timer Functionality**: Users can set a focus time and break time, which can be adjusted easily.
  
- **Visual Timer**: The remaining time is displayed with a simple animation.

- **Task Management**: Users can add tasks and mark them as completed, with a strike-through animation.

- **Break Indicator**: Alerts users when their break starts and ends.

---

## How to Run

1. **Clone the repository**:

   ```bash
   git clone https://github.com/thounny/DAY_008.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd DAY_008
   ```

3. **Open the `index.html` file** in your web browser:

   - You can double-click the file in your file explorer, or
   - Serve it using a local development server (e.g., Live Server in VSCode).

---

## How the JavaScript Works

### Timer Control

The timer is controlled by a single button that toggles between starting and stopping the timer:

```javascript
document.getElementById("start-session").addEventListener("click", toggleTimer);
```

- **Toggle Timer Functionality**: The `toggleTimer` function checks if the timer is currently running. If it is, the timer stops; if not, it starts.

### Timer Start and Stop

```javascript
function startTimer() {
  let minutes = isBreak ? breakDuration : workDuration;
  let seconds = 0;
  
  isRunning = true;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        handleTimerCompletion();
      } else {
        minutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    updateTimerDisplay(minutes, seconds);
  }, 1000);
}
```

- **Start Timer Logic**: This function sets up the timer, decrementing the minutes and seconds each second until the timer reaches zero. If the timer completes, it triggers the `handleTimerCompletion` function.

### Handling Timer Completion

```javascript
function handleTimerCompletion() {
  if (!isBreak) {
    showBreakIndicator();
    minutes = breakDuration; // Set to break duration
    isBreak = true;
    startTimer(); // Start the break timer
  } else {
    isBreak = false;
    resetTimer(); // Reset to work timer after break
    hideBreakIndicator();
  }
}
```

- **Break Notification**: When the timer finishes a work session, it triggers a break, updating the UI accordingly.

### Updating Timer Display

```javascript
function updateTimerDisplay(minutes, seconds) {
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  minutesElement.innerText = String(minutes).padStart(2, "0");
  secondsElement.innerText = String(seconds).padStart(2, "0");

  flipNumber(minutesElement);
  flipNumber(secondsElement);
}
```

- **Display Logic**: The timer display updates every second. Each number undergoes a flip animation when updated, enhancing the vintage clock effect.

### Task Management

The task management system allows users to add tasks dynamically:

```javascript
function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  if (taskInput.value.trim() !== "") {
    const newTask = document.createElement("li");
    newTask.classList.add("task-item");
    newTask.innerHTML = `
      <label class="task-item">
        <input type="radio" class="task-check" />
        <span>${taskInput.value}</span>
      </label>
    `;

    newTask.querySelector(".task-check").addEventListener("change", function() {
      newTask.classList.add("completed");
      setTimeout(() => {
        newTask.remove();
      }, 500);
    });

    taskList.appendChild(newTask);
    taskInput.value = ''; // Clear the input field
  }
}
```

- **Adding Tasks**: The user can type a task into the input box, and upon clicking the add button, the task will appear in the list. Each task can be marked as completed.

---

## Technologies Used

- **HTML5**: For structuring the document.
- **CSS3**: For responsive design and layout.
- **JavaScript (ES6)**: For handling interactivity and rendering logic.
- **CSS Animations**: For the time animation effect and task completion animation.

---

## Author

![Logo](https://web.archive.org/web/20091027053343im_/http://geocities.com/animecap/index_dwn.gif)

**Thounny Keo**  
Frontend Development Student | Year Up United

---
![miku](./assets/miku.gif)
