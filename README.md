# Workout Scheduler - Frontend (Quasar / Vue 3)

This repository contains the **client-side** of the Workout Scheduler project, built with **Quasar Framework** and **Vue 3**.  
The frontend provides a responsive interface for managing workouts, workout plans, and scheduling.

---

## 🚀 Requirements

Before starting, make sure you have:

- **Node.js 20.1.0** (using **NVM 1.2.2**)  
- **npm** (comes with Node.js)  
- **Yarn** (optional, if you prefer Yarn over npm)  
- Access to workout scheduler server side 

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/igorharlamovs/workout-scheduler-client.git
```

2. Install dependencies
     ```bash
    npm install
# or if you use Yarn
    ```bash
    yarn install

3. Updata axios.js config (optional)

   In axios.js, update base url to the server (if needed)

4. Run the development server
   ```bash
   quasar dev

📂 Project Structure

* src/ — Main source folder

* src/pages/ — Quasar pages and routes

* src/components/ — Reusable Vue components

* src/layouts/ — Layout components (header, footer, etc.)

* src/store/ — Pinia store (state management)

* src/assets/ — Images, icons, styles

* quasar.config.js — Quasar configuration

⚡ Features

* Responsive UI for mobile and desktop

* Workout management: create, edit, delete workouts

* Add workouts to a plan that can be scheduled 

* Track progress

* Connects to Laravel backend via API

⚖️ License

This project is licensed under a Custom Non-Commercial License.

You may copy and modify the code for personal or educational purposes, but you cannot sell this project or use it commercially.

