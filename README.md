# 🎨 Three.js Portfolio with Flask Chat Backend

A modern, interactive developer portfolio built with **React**, **Three.js**, **Tailwind CSS**, and a **Flask-powered chat backend**. Showcases your projects, 3D animations, and integrates real-time chat/AI features via Python.

---

## 🧩 Features

- 🌐 Immersive 3D visuals with Three.js
- 🎨 Responsive, modern UI using Tailwind CSS
- 💬 Real-time chat powered by Flask backend
- ⚡ Lightning-fast development with Vite
- 🤖 Easy integration for AI chatbots (Ollama, Llama3)
- 🎬 Smooth animations with Framer Motion
- 🔒 State management via Zustand or Valtio

---

## 🛠 Tech Stack

### Frontend
- **React** (with Vite)
- **Three.js**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** / **Valtio** (state management)

### Backend
- **Python 3.8+**
- **Flask**
- **Flask-CORS** (CORS support)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/threejs-portfolio.git
cd threejs-portfolio

# Install frontend dependencies
npm install

# Start the frontend (http://localhost:5173)
npm run dev
```

### 2. Set Up Python Backend

```bash
# Create and activate virtual environment
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install backend dependencies
pip install -r requirements.txt

# Start Flask backend
python flask_chat_backend.py
```

### 3. Install and Run Ollama for AI Chat

#### Install Ollama

Follow the instructions for your OS from the [Ollama installation guide](https://ollama.com/download).

- **macOS:**  
    Download and run the installer from the website.

- **Windows:**  
    Download and run the installer from the website.

- **Linux:**  
    ```bash
    curl -fsSL https://ollama.com/install.sh | sh
    ```

#### Download and Run Llama 3 Model

```bash
ollama run llama3
```

---

## 📌 Requirements

- **Node.js** v16+
- **Python** 3.8+
- **Modern browser** (Chrome, Firefox, Edge)

---

## 🙌 Acknowledgements

Built with ❤️ by Rahul Halder. Inspired by cutting-edge 3D developer portfolios and enhanced with backend chat integration for next-level interactivity.

