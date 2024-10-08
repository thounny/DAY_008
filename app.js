let workDuration = 25;
let breakDuration = 5;
let timerInterval;
let isBreak = false;
let isRunning = false;

document.getElementById("start-session").addEventListener("click", toggleTimer);
document.getElementById("add-task").addEventListener("click", addTask);

document.getElementById("work-increase").addEventListener("click", () => {
  workDuration++;
  document.getElementById("work-duration").innerText = workDuration;
  resetTimer();
});

document.getElementById("work-decrease").addEventListener("click", () => {
  if (workDuration > 1) {
    workDuration--;
    document.getElementById("work-duration").innerText = workDuration;
    resetTimer();
  }
});

document.getElementById("break-increase").addEventListener("click", () => {
  breakDuration++;
  document.getElementById("break-duration").innerText = breakDuration;
});

document.getElementById("break-decrease").addEventListener("click", () => {
  if (breakDuration > 1) {
    breakDuration--;
    document.getElementById("break-duration").innerText = breakDuration;
  }
});

function toggleTimer() {
  const button = document.getElementById("start-session");
  if (isRunning) {
    stopTimer();
    button.innerText = "Start Session";
  } else {
    startTimer();
    button.innerText = "Stop Session";
  }
}

function startTimer() {
  let minutes = isBreak ? breakDuration : workDuration;
  let seconds = 0;

  isRunning = true;

  timerInterval = setInterval(() => {
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(timerInterval);
        if (!isBreak) {
          showBreakIndicator();
          minutes = breakDuration;
          isBreak = true;
          startTimer(); // Start the break timer
        } else {
          isBreak = false;
          resetTimer(); // Reset to work timer after break
          hideBreakIndicator();
        }
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

function stopTimer() {
  clearInterval(timerInterval);
  resetTimer();
  isRunning = false;
}

function updateTimerDisplay(minutes, seconds) {
  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").innerText = String(seconds).padStart(
    2,
    "0"
  );
}

function resetTimer() {
  document.getElementById("minutes").innerText = workDuration;
  document.getElementById("seconds").innerText = "00";
  isBreak = false;
  hideBreakIndicator(); // Ensure the break indicator is hidden when resetting
}

function showBreakIndicator() {
  const breakIndicator = document.createElement("div");
  breakIndicator.id = "break-indicator";
  breakIndicator.innerText = "You're on a break!";
  breakIndicator.classList.add("break-message");
  document.body.appendChild(breakIndicator);
}

function hideBreakIndicator() {
  const breakIndicator = document.getElementById("break-indicator");
  if (breakIndicator) {
    breakIndicator.remove();
  }
}

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

    newTask
      .querySelector(".task-check")
      .addEventListener("change", function () {
        const taskSpan = this.nextElementSibling;
        newTask.classList.add("completed"); // Add the completed class first
        setTimeout(() => {
          newTask.remove(); // Remove the task after fading out
        }, 500); // Match this timeout to the CSS transition duration
      });

    taskList.appendChild(newTask);
    taskInput.value = "";
  }
}
