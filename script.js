// Elementos do DOM
const startBtn = document.getElementById("start-btn")
const pauseBtn = document.getElementById("pause-btn")
const resetBtn = document.getElementById("reset-btn")
const minutesDisplay = document.getElementById("minutes")
const secondsDisplay = document.getElementById("seconds")
const taskInput = document.getElementById("task-input")
const addTaskBtn = document.getElementById("add-task")
const taskList = document.getElementById("task-list")
const quickNotes = document.getElementById("quick-notes")

// Variáveis do timer
let timer
let minutes = 25
let seconds = 0
let isRunning = false

// Funções do Timer Pomodoro
function startTimer() {
  if (!isRunning) {
    isRunning = true
    timer = setInterval(updateTimer, 1000)
  }
}

function pauseTimer() {
  clearInterval(timer)
  isRunning = false
}

function resetTimer() {
  clearInterval(timer)
  isRunning = false
  minutes = 25
  seconds = 0
  updateTimerDisplay()
}

function updateTimer() {
  if (seconds === 0) {
    if (minutes === 0) {
      // Timer completo
      clearInterval(timer)
      isRunning = false
      playAlarmSound()
      return
    }
    minutes--
    seconds = 59
  } else {
    seconds--
  }
  updateTimerDisplay()
}

function updateTimerDisplay() {
  minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes
  secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds
}

function playAlarmSound() {
  // Simples alerta para notificar que o tempo acabou
  alert("Tempo finalizado! Faça uma pausa.")
}

// Funções de Tarefas
function addTask() {
  const taskText = taskInput.value.trim()
  if (taskText) {
    createTaskElement(taskText)
    taskInput.value = ""
    saveTasksToLocalStorage()
  }
}

function createTaskElement(text) {
  const li = document.createElement("li")
  li.className = "task-item"

  const taskTextSpan = document.createElement("span")
  taskTextSpan.className = "task-text"
  taskTextSpan.textContent = text

  // Adiciona evento de clique para marcar como concluído
  taskTextSpan.addEventListener("click", function () {
    this.classList.toggle("completed")
    saveTasksToLocalStorage()
  })

  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete-task"
  deleteBtn.innerHTML = "&times;"
  deleteBtn.addEventListener("click", () => {
    li.remove()
    saveTasksToLocalStorage()
  })

  li.appendChild(taskTextSpan)
  li.appendChild(deleteBtn)
  taskList.appendChild(li)
}

// Funções de armazenamento local
function saveTasksToLocalStorage() {
  const tasks = []
  document.querySelectorAll(".task-text").forEach((task) => {
    tasks.push({
      text: task.textContent,
      completed: task.classList.contains("completed"),
    })
  })
  localStorage.setItem("focusTasks", JSON.stringify(tasks))
}

function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem("focusTasks")
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks)
    tasks.forEach((task) => {
      createTaskElement(task.text)
      if (task.completed) {
        document.querySelector(".task-text:last-child").classList.add("completed")
      }
    })
  }
}

function saveNotesToLocalStorage() {
  localStorage.setItem("focusNotes", quickNotes.value)
}

function loadNotesFromLocalStorage() {
  const savedNotes = localStorage.getItem("focusNotes")
  if (savedNotes) {
    quickNotes.value = savedNotes
  }
}

// Event Listeners
startBtn.addEventListener("click", startTimer)
pauseBtn.addEventListener("click", pauseTimer)
resetBtn.addEventListener("click", resetTimer)

addTaskBtn.addEventListener("click", addTask)
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask()
  }
})

quickNotes.addEventListener("input", saveNotesToLocalStorage)

// Animação dos elementos flutuantes
function animateFloatingElements() {
  const elements = document.querySelectorAll(".floating-element")
  elements.forEach((element) => {
    const randomX = Math.random() * 30 - 15
    const randomY = Math.random() * 30 - 15
    element.style.transform = `translate(${randomX}px, ${randomY}px)`
  })
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  updateTimerDisplay()
  loadTasksFromLocalStorage()
  loadNotesFromLocalStorage()

  // Animação suave dos elementos flutuantes
  setInterval(animateFloatingElements, 5000)
})

// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Elements
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const themeToggle = document.getElementById("theme-toggle")
  const soundToggle = document.getElementById("sound-toggle")

  // Header Elements
  const currentDateEl = document.getElementById("current-date")
  const currentTimeEl = document.getElementById("current-time")
  const fullscreenBtn = document.getElementById("fullscreen-btn")
  const settingsBtn = document.getElementById("settings-btn")

  // Focus Area Elements
  const quoteEl = document.getElementById("inspiration-quote")
  const quoteRefreshBtn = document.getElementById("quote-refresh")
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  // Pomodoro Elements
  const modeBtns = document.querySelectorAll(".mode-btn")
  const minutesEl = document.getElementById("minutes")
  const secondsEl = document.getElementById("seconds")
  const timerProgress = document.getElementById("timer-progress")
  const completedPomodorosEl = document.getElementById("completed-pomodoros")
  const focusMinutesEl = document.getElementById("focus-minutes")

  // Notes Elements
  const saveNotesBtn = document.getElementById("save-notes")
  const clearNotesBtn = document.getElementById("clear-notes")
  const notesStatus = document.getElementById("notes-status")
  const notesCharCount = document.getElementById("notes-char-count")
  const clearAllTasksBtn = document.getElementById("clear-all-tasks")
  const filterBtns = document.querySelectorAll(".filter-btn")
  const tasksCountEl = document.getElementById("tasks-count")

  // Ambient Player Elements
  const ambientPlayer = document.getElementById("ambient-player")
  const soundItems = document.querySelectorAll(".sound-item")
  const volumeSliders = document.querySelectorAll(".volume-slider")
  const closeAmbientBtn = document.getElementById("close-ambient")

  // Settings Modal Elements
  const settingsModal = document.getElementById("settings-modal")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  const themeOptions = document.querySelectorAll(".theme-option")
  const animationsToggle = document.getElementById("animations-toggle")
  const focusDurationInput = document.getElementById("focus-duration")
  const shortBreakDurationInput = document.getElementById("short-break-duration")
  const longBreakDurationInput = document.getElementById("long-break-duration")
  const alarmToggle = document.getElementById("alarm-toggle")
  const enableNotificationsBtn = document.getElementById("enable-notifications")
  const saveSettingsBtn = document.getElementById("save-settings")
  const resetSettingsBtn = document.getElementById("reset-settings")
  const timeBtns = document.querySelectorAll(".time-btn")

  // Audio Elements
  const timerCompleteSound = document.getElementById("timer-complete")
  const taskCompleteSound = document.getElementById("task-complete")
  const clickSound = document.getElementById("click-sound")
  const rainSound = document.getElementById("rain-sound")
  const forestSound = document.getElementById("forest-sound")
  const cafeSound = document.getElementById("cafe-sound")
  const fireSound = document.getElementById("fire-sound")

  // ===== GLOBAL VARIABLES =====
  let timer
  let timerMode = "focus"
  let timerRunning = false
  let minutes = 25
  let seconds = 0
  let originalMinutes = 25
  let completedPomodoros = 0
  let totalFocusMinutes = 0
  let currentFilter = "all"
  const activeSounds = []
  let settings = {
    theme: "light",
    animations: true,
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    alarmSound: true,
    notifications: false,
  }

  // Inspirational quotes
  const quotes = [
    "A atenção é a mais rara e pura forma de generosidade.",
    "Concentre-se no que importa. Um passo de cada vez.",
    "A atenção plena é o caminho para a produtividade.",
    "Grandes realizações exigem foco e persistência.",
    "Simplifique para amplificar sua concentração.",
    "Cada momento de foco é um investimento em si mesmo.",
    "O foco não é dizer sim para o que você quer fazer, é dizer não para centenas de boas ideias.",
    "Onde a atenção vai, a energia flui.",
    "Foco é a arte de ignorar quase tudo.",
    "A produtividade não é sobre fazer mais coisas, é sobre fazer as coisas certas.",
  ]

  // ===== INITIALIZATION =====
  function init() {
    // Load settings from localStorage
    loadSettings()

    // Initialize date and time
    updateDateTime()
    setInterval(updateDateTime, 1000)

    // Initialize particles
    if (settings.animations) {
      createParticles()
    }

    // Initialize timer
    updateTimerDisplay()
    updateTimerProgress()

    // Load notes from localStorage
    loadNotes()

    // Load tasks from localStorage
    loadTasks()
    updateTasksCount()

    // Apply theme
    applyTheme(settings.theme)

    // Initialize settings inputs
    focusDurationInput.value = settings.focusDuration
    shortBreakDurationInput.value = settings.shortBreakDuration
    longBreakDurationInput.value = settings.longBreakDuration
    animationsToggle.checked = settings.animations
    alarmToggle.checked = settings.alarmSound

    // Mark active theme option
    themeOptions.forEach((option) => {
      if (option.dataset.theme === settings.theme) {
        option.classList.add("active")
      }
    })
  }

  // ===== EVENT LISTENERS =====

  // Sidebar Toggle
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed")
    playClickSound()
  })

  // Theme Toggle
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.classList.contains("dark-theme") ? "dark" : "light"
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    applyTheme(newTheme)
    settings.theme = newTheme
    saveSettings()
    playClickSound()
  })

  // Sound Toggle
  soundToggle.addEventListener("click", () => {
    ambientPlayer.classList.toggle("active")
    playClickSound()
  })

  // Quote Refresh
  quoteRefreshBtn.addEventListener("click", () => {
    changeQuote()
    playClickSound()
  })

  // Tab Buttons
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabId = btn.dataset.tab

      // Remove active class from all tabs
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabPanes.forEach((p) => p.classList.remove("active"))

      // Add active class to clicked tab
      btn.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")

      playClickSound()
    })
  })

  // Timer Mode Buttons
  modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      timerMode = btn.dataset.mode
      originalMinutes = Number.parseInt(btn.dataset.minutes)

      // Reset timer
      resetTimer()

      // Remove active class from all mode buttons
      modeBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked mode button
      btn.classList.add("active")

      playClickSound()
    })
  })

  // Timer Control Buttons
  startBtn.addEventListener("click", startTimer)
  pauseBtn.addEventListener("click", pauseTimer)
  resetBtn.addEventListener("click", resetTimer)

  // Notes Buttons
  saveNotesBtn.addEventListener("click", () => {
    saveNotes()
    notesStatus.textContent = "Salvo com sucesso!"
    setTimeout(() => {
      notesStatus.textContent = "Salvo automaticamente"
    }, 2000)
    playClickSound()
  })

  clearNotesBtn.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar todas as anotações?")) {
      quickNotes.value = ""
      saveNotes()
      updateNotesCharCount()
      notesStatus.textContent = "Anotações limpas!"
      setTimeout(() => {
        notesStatus.textContent = "Salvo automaticamente"
      }, 2000)
    }
    playClickSound()
  })

  quickNotes.addEventListener("input", () => {
    updateNotesCharCount()
    // Auto save after 1 second of inactivity
    clearTimeout(window.notesTimeout)
    window.notesTimeout = setTimeout(() => {
      saveNotes()
      notesStatus.textContent = "Salvo automaticamente"
    }, 1000)
  })

  // Task Buttons
  addTaskBtn.addEventListener("click", addTask)

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask()
    }
  })

  clearAllTasksBtn.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar todas as tarefas?")) {
      clearAllTasks()
    }
    playClickSound()
  })

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter

      // Remove active class from all filter buttons
      filterBtns.forEach((b) => b.classList.remove("active"))

      // Add active class to clicked filter button
      btn.classList.add("active")

      // Filter tasks
      filterTasks()

      playClickSound()
    })
  })

  // Ambient Sound Items
  soundItems.forEach((item) => {
    item.addEventListener("click", () => {
      const soundType = item.dataset.sound
      toggleSound(soundType, item)
      playClickSound()
    })
  })

  // Volume Sliders
  volumeSliders.forEach((slider) => {
    slider.addEventListener("input", (e) => {
      const soundItem = e.target.closest(".sound-item")
      const soundType = soundItem.dataset.sound
      const volume = e.target.value / 100

      // Set volume for the sound
      const sound = document.getElementById(`${soundType}-sound`)
      sound.volume = volume

      // Prevent click event on sound item
      e.stopPropagation()
    })

    // Prevent click event on sound item
    slider.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  })

  // Close Ambient Player
  closeAmbientBtn.addEventListener("click", () => {
    ambientPlayer.classList.remove("active")
    playClickSound()
  })

  // Fullscreen Button
  fullscreenBtn.addEventListener("click", toggleFullscreen)

  // Settings Button
  settingsBtn.addEventListener("click", () => {
    settingsModal.classList.add("active")
    playClickSound()
  })

  // Close Modal Buttons
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      settingsModal.classList.remove("active")
      playClickSound()
    })
  })

  // Theme Options
  themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const theme = option.dataset.theme

      // Remove active class from all theme options
      themeOptions.forEach((o) => o.classList.remove("active"))

      // Add active class to clicked theme option
      option.classList.add("active")

      // Apply theme
      applyTheme(theme)
      settings.theme = theme

      playClickSound()
    })
  })

  // Time Setting Buttons
  timeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action
      const input = btn.parentElement.querySelector("input")
      let value = Number.parseInt(input.value)

      if (action === "increase") {
        value = Math.min(value + 1, Number.parseInt(input.max))
      } else {
        value = Math.max(value - 1, Number.parseInt(input.min))
      }

      input.value = value

      playClickSound()
    })
  })

  // Enable Notifications Button
  enableNotificationsBtn.addEventListener("click", () => {
    requestNotificationPermission()
    playClickSound()
  })

  // Save Settings Button
  saveSettingsBtn.addEventListener("click", () => {
    // Update settings
    settings.focusDuration = Number.parseInt(focusDurationInput.value)
    settings.shortBreakDuration = Number.parseInt(shortBreakDurationInput.value)
    settings.longBreakDuration = Number.parseInt(longBreakDurationInput.value)
    settings.animations = animationsToggle.checked
    settings.alarmSound = alarmToggle.checked

    // Update timer durations
    modeBtns.forEach((btn) => {
      const mode = btn.dataset.mode
      if (mode === "focus") {
        btn.dataset.minutes = settings.focusDuration
      } else if (mode === "short-break") {
        btn.dataset.minutes = settings.shortBreakDuration
      } else if (mode === "long-break") {
        btn.dataset.minutes = settings.longBreakDuration
      }
    })

    // Reset timer if it's not running
    if (!timerRunning) {
      resetTimer()
    }

    // Toggle animations
    if (settings.animations) {
      createParticles()
    } else {
      const particles = document.querySelectorAll(".particle")
      particles.forEach((p) => p.remove())
    }

    // Save settings
    saveSettings()

    // Close modal
    settingsModal.classList.remove("active")

    // Show confirmation
    alert("Configurações salvas com sucesso!")

    playClickSound()
  })

  // Reset Settings Button
  resetSettingsBtn.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja restaurar as configurações padrão?")) {
      // Reset settings
      settings = {
        theme: "light",
        animations: true,
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        alarmSound: true,
        notifications: false,
      }

      // Update inputs
      focusDurationInput.value = settings.focusDuration
      shortBreakDurationInput.value = settings.shortBreakDuration
      longBreakDurationInput.value = settings.longBreakDuration
      animationsToggle.checked = settings.animations
      alarmToggle.checked = settings.alarmSound

      // Update theme options
      themeOptions.forEach((option) => {
        option.classList.remove("active")
        if (option.dataset.theme === settings.theme) {
          option.classList.add("active")
        }
      })

      // Apply theme
      applyTheme(settings.theme)

      // Update timer durations
      modeBtns.forEach((btn) => {
        const mode = btn.dataset.mode
        if (mode === "focus") {
          btn.dataset.minutes = settings.focusDuration
        } else if (mode === "short-break") {
          btn.dataset.minutes = settings.shortBreakDuration
        } else if (mode === "long-break") {
          btn.dataset.minutes = settings.longBreakDuration
        }
      })

      // Reset timer
      resetTimer()

      // Toggle animations
      if (settings.animations) {
        createParticles()
      } else {
        const particles = document.querySelectorAll(".particle")
        particles.forEach((p) => p.remove())
      }

      // Save settings
      saveSettings()

      // Show confirmation
      alert("Configurações restauradas com sucesso!")
    }

    playClickSound()
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === settingsModal) {
      settingsModal.classList.remove("active")
    }
  })

  // ===== FUNCTIONS =====

  // Update date and time
  function updateDateTime() {
    const now = new Date()

    // Format date
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    const dateStr = now.toLocaleDateString("pt-BR", options)

    // Format time
    const timeStr = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

    // Update elements
    currentDateEl.textContent = dateStr
    currentTimeEl.textContent = timeStr
  }

  // Create particles
  function createParticles() {
    // Remove existing particles
    const existingParticles = document.querySelectorAll(".particle")
    existingParticles.forEach((p) => p.remove())

    // Create new particles
    const particleContainer = document.getElementById("particles")
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random position
      const posX = Math.random() * 100
      const posY = Math.random() * 100

      // Random size
      const size = Math.random() * 5 + 1

      // Random opacity
      const opacity = Math.random() * 0.5 + 0.1

      // Set styles
      particle.style.left = `${posX}%`
      particle.style.top = `${posY}%`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.opacity = opacity

      // Add animation
      const duration = Math.random() * 20 + 10
      const delay = Math.random() * 5

      particle.style.animation = `float${Math.floor(Math.random() * 3) + 1} ${duration}s ${delay}s infinite alternate ease-in-out`

      // Add to container
      particleContainer.appendChild(particle)
    }
  }

  // Change quote
  function changeQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length)
    quoteEl.textContent = quotes[randomIndex]

    // Add animation
    quoteEl.style.animation = "none"
    setTimeout(() => {
      quoteEl.style.animation = "fadeIn 0.5s ease"
    }, 10)
  }

  // Timer functions
  function startTimer() {
    if (!timerRunning) {
      timerRunning = true

      // Update button states
      startBtn.disabled = true
      pauseBtn.disabled = false

      // Start timer
      timer = setInterval(updateTimer, 1000)
    }
  }

  function pauseTimer() {
    if (timerRunning) {
      timerRunning = false

      // Update button states
      startBtn.disabled = false
      pauseBtn.disabled = true

      // Pause timer
      clearInterval(timer)
    }
  }

  function resetTimer() {
    // Pause timer
    pauseTimer()

    // Reset time
    if (timerMode === "focus") {
      minutes = settings.focusDuration
    } else if (timerMode === "short-break") {
      minutes = settings.shortBreakDuration
    } else if (timerMode === "long-break") {
      minutes = settings.longBreakDuration
    }

    originalMinutes = minutes
    seconds = 0

    // Update display
    updateTimerDisplay()
    updateTimerProgress()
  }

  function updateTimer() {
    if (seconds === 0) {
      if (minutes === 0) {
        // Timer complete
        timerComplete()
        return
      }

      minutes--
      seconds = 59
    } else {
      seconds--
    }

    // Update display
    updateTimerDisplay()
    updateTimerProgress()
  }

  function updateTimerDisplay() {
    minutesEl.textContent = minutes < 10 ? `0${minutes}` : minutes
    secondsEl.textContent = seconds < 10 ? `0${seconds}` : seconds
  }

  function updateTimerProgress() {
    const totalSeconds = originalMinutes * 60
    const remainingSeconds = minutes * 60 + seconds
    const progress = 1 - remainingSeconds / totalSeconds

    // Calculate stroke-dashoffset
    const circumference = 2 * Math.PI * 45 // 2πr where r = 45
    const dashOffset = circumference * (1 - progress)

    // Update progress circle
    timerProgress.style.strokeDasharray = circumference
    timerProgress.style.strokeDashoffset = dashOffset
  }

  function timerComplete() {
    // Pause timer
    pauseTimer()

    // Play sound if enabled
    if (settings.alarmSound) {
      timerCompleteSound.play()
    }

    // Show notification if enabled
    if (settings.notifications) {
      showNotification("Timer Completo", `Seu timer de ${timerMode === "focus" ? "foco" : "pausa"} foi concluído!`)
    }

    // Update stats if focus timer
    if (timerMode === "focus") {
      completedPomodoros++
      totalFocusMinutes += originalMinutes

      // Update stats display
      completedPomodorosEl.textContent = completedPomodoros
      focusMinutesEl.textContent = totalFocusMinutes

      // Save stats
      localStorage.setItem("completedPomodoros", completedPomodoros)
      localStorage.setItem("totalFocusMinutes", totalFocusMinutes)
    }

    // Reset timer
    resetTimer()

    // Show alert
    alert(`Timer de ${timerMode === "focus" ? "foco" : "pausa"} concluído!`)
  }

  // Notes functions
  function saveNotes() {
    localStorage.setItem("quickNotes", quickNotes.value)
  }

  function loadNotes() {
    const savedNotes = localStorage.getItem("quickNotes")
    if (savedNotes) {
      quickNotes.value = savedNotes
      updateNotesCharCount()
    }
  }

  function updateNotesCharCount() {
    const count = quickNotes.value.length
    notesCharCount.textContent = `${count} caracteres`
  }

  // Task functions
  function addTask() {
    const taskText = taskInput.value.trim()

    if (taskText) {
      // Create task object
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().toISOString(),
      }

      // Add task to DOM
      createTaskElement(task)

      // Clear input
      taskInput.value = ""

      // Save tasks
      saveTasks()

      // Update tasks count
      updateTasksCount()

      // Play sound
      playClickSound()
    }
  }

  function createTaskElement(task) {
    const li = document.createElement("li")
    li.className = "task-item"
    li.dataset.id = task.id
    li.dataset.completed = task.completed

    if (task.completed) {
      li.classList.add("completed")
    }

    // Create checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.className = "task-checkbox"
    checkbox.checked = task.completed
    checkbox.addEventListener("change", () => {
      toggleTaskComplete(task.id)
    })

    // Create task text
    const taskText = document.createElement("span")
    taskText.className = "task-text"
    taskText.textContent = task.text

    // Create task actions
    const taskActions = document.createElement("div")
    taskActions.className = "task-actions"

    // Create delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "task-btn delete-task"
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id)
    })

    // Append elements
    taskActions.appendChild(deleteBtn)
    li.appendChild(checkbox)
    li.appendChild(taskText)
    li.appendChild(taskActions)

    // Apply filter
    if (currentFilter === "completed" && !task.completed) {
      li.style.display = "none"
    } else if (currentFilter === "active" && task.completed) {
      li.style.display = "none"
    }

    // Add to task list
    taskList.appendChild(li)
  }

  function toggleTaskComplete(id) {
    // Find task in DOM
    const taskEl = document.querySelector(`.task-item[data-id="${id}"]`)

    if (taskEl) {
      // Toggle completed state
      const completed = taskEl.dataset.completed === "true"
      taskEl.dataset.completed = !completed

      // Toggle completed class
      taskEl.classList.toggle("completed")

      // Play sound if completing task
      if (!completed) {
        taskCompleteSound.play()
      }

      // Save tasks
      saveTasks()

      // Update tasks count
      updateTasksCount()

      // Apply filter
      filterTasks()
    }
  }

  function deleteTask(id) {
    // Find task in DOM
    const taskEl = document.querySelector(`.task-item[data-id="${id}"]`)

    if (taskEl && confirm("Tem certeza que deseja excluir esta tarefa?")) {
      // Remove task from DOM
      taskEl.remove()

      // Save tasks
      saveTasks()

      // Update tasks count
      updateTasksCount()

      // Play sound
      playClickSound()
    }
  }

  function clearAllTasks() {
    // Clear task list
    taskList.innerHTML = ""

    // Save tasks
    saveTasks()

    // Update tasks count
    updateTasksCount()
  }

  function saveTasks() {
    const tasks = []

    // Get all tasks from DOM
    document.querySelectorAll(".task-item").forEach((taskEl) => {
      tasks.push({
        id: Number.parseInt(taskEl.dataset.id),
        text: taskEl.querySelector(".task-text").textContent,
        completed: taskEl.dataset.completed === "true",
        createdAt: new Date().toISOString(),
      })
    })

    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }

  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks")

    if (savedTasks) {
      const tasks = JSON.parse(savedTasks)

      // Clear task list
      taskList.innerHTML = ""

      // Add tasks to DOM
      tasks.forEach((task) => {
        createTaskElement(task)
      })
    }

    // Load stats
    const savedCompletedPomodoros = localStorage.getItem("completedPomodoros")
    const savedTotalFocusMinutes = localStorage.getItem("totalFocusMinutes")

    if (savedCompletedPomodoros) {
      completedPomodoros = Number.parseInt(savedCompletedPomodoros)
      completedPomodorosEl.textContent = completedPomodoros
    }

    if (savedTotalFocusMinutes) {
      totalFocusMinutes = Number.parseInt(savedTotalFocusMinutes)
      focusMinutesEl.textContent = totalFocusMinutes
    }
  }

  function updateTasksCount() {
    // Count active tasks
    const activeTasks = document.querySelectorAll(".task-item:not(.completed)").length

    // Update tasks count
    tasksCountEl.textContent = `${activeTasks} ${activeTasks === 1 ? "tarefa restante" : "tarefas restantes"}`
  }

  function filterTasks() {
    // Get all tasks
    const tasks = document.querySelectorAll(".task-item")

    // Apply filter
    tasks.forEach((task) => {
      const completed = task.dataset.completed === "true"

      if (currentFilter === "all") {
        task.style.display = "flex"
      } else if (currentFilter === "active" && !completed) {
        task.style.display = "flex"
      } else if (currentFilter === "completed" && completed) {
        task.style.display = "flex"
      } else {
        task.style.display = "none"
      }
    })
  }

  // Sound functions
  function toggleSound(soundType, item) {
    const sound = document.getElementById(`${soundType}-sound`)

    if (sound.paused) {
      // Play sound
      sound.play()

      // Add active class
      item.classList.add("active")

      // Add to active sounds
      activeSounds.push(soundType)
    } else {
      // Pause sound
      sound.pause()

      // Remove active class
      item.classList.remove("active")

      // Remove from active sounds
      const index = activeSounds.indexOf(soundType)
      if (index !== -1) {
        activeSounds.splice(index, 1)
      }
    }
  }

  function playClickSound() {
    if (settings.alarmSound) {
      // Clone the audio element to allow multiple plays
      const clickSoundClone = clickSound.cloneNode()
      clickSoundClone.volume = 0.3
      clickSoundClone.play()
    }
  }

  // Theme functions
  function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove("light-theme", "dark-theme", "nature-theme", "ocean-theme")

    // Add selected theme class
    document.body.classList.add(`${theme}-theme`)

    // Update theme toggle icon and text
    if (theme === "dark") {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Tema Claro</span>'
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Tema Escuro</span>'
    }
  }

  // Fullscreen function
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Erro ao entrar em tela cheia: ${err.message}`)
      })
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    playClickSound()
  }

  // Notification functions
  function requestNotificationPermission() {
    if (!("Notification" in window)) {
      alert("Este navegador não suporta notificações de desktop")
      return
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        settings.notifications = true
        saveSettings()
        alert("Notificações ativadas com sucesso!")
      } else {
        alert("Permissão para notificações negada")
      }
    })
  }

  function showNotification(title, body) {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return
    }

    const notification = new Notification(title, {
      body: body,
      icon: "https://via.placeholder.com/64",
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }

  // Settings functions
  function saveSettings() {
    localStorage.setItem("settings", JSON.stringify(settings))
  }

  function loadSettings() {
    const savedSettings = localStorage.getItem("settings")

    if (savedSettings) {
      settings = { ...settings, ...JSON.parse(savedSettings) }
    }
  }

  // Initialize
  init()
})
