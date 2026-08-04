# 🌿 SmartAgroAI

**SmartAgroAI** is an AI-powered web application that detects plant diseases from leaf images using a trained Convolutional Neural Network (CNN). The system provides disease prediction, confidence score, detailed disease information, treatment suggestions, prevention tips, and prediction history through a modern React frontend and FastAPI backend.

---

## 🚀 Features

* 🌱 Upload a plant leaf image
* 🤖 AI-based disease detection using TensorFlow/Keras CNN
* 📊 Confidence score for each prediction
* 📖 Disease description
* 🩺 Symptoms and causes
* 💊 Treatment suggestions
* 🛡️ Prevention tips
* 🕒 Prediction history
* 📱 Responsive modern UI
* 🌙 Dark mode support

---

## 🧠 AI Model

* **Dataset:** PlantVillage
* **Classes:** 38 plant disease categories
* **Framework:** TensorFlow / Keras
* **Input Size:** 224 × 224 RGB
* **Best Validation Accuracy:** **91.17%**

The trained model is stored in:

backend/model/best_cnn.keras

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Framer Motion
* Recharts

### Backend

* FastAPI
* TensorFlow
* Pillow
* NumPy
* Pydantic
* Uvicorn

---

## 📂 Project Structure

SmartAgroAI/
├── backend/
│   ├── app/
│   ├── model/
│   │   ├── best_cnn.keras
│   │   └── class_names.json
│   ├── disease_data.json
│   ├── uploads/
│   ├── history/
│   └── main.py
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── notebooks/
│   ├── 01_Dataset_Exploration.ipynb
│   ├── 02_Building_First_CNN.ipynb
│   └── 03_Improved_CNN.ipynb
│
├── dataset/ (ignored from Git)
├── .gitignore
└── README.md

---

## 🧪 Model Training Summary

The project was developed in three stages:

### 1. Initial CNN

* Basic convolution and pooling layers
* Training Accuracy: ~96%
* Validation Accuracy: ~57%
* Problem: **Overfitting**

### 2. Improved CNN

* Data Augmentation
* Batch Normalization
* Dropout
* Global Average Pooling
* Early Stopping
* Model Checkpoint

### Final Result

* **Validation Accuracy:** **91.17%**
* **Validation Loss:** **0.2690**

---

## ▶️ Running the Project

### Backend

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000

Swagger API:

http://127.0.0.1:8000/docs

---

### Frontend

cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173

---

## 🔄 Application Workflow

User uploads image
↓
React Frontend
↓
FastAPI Backend
↓
TensorFlow CNN Model
↓
Predicted Disease
↓
Disease Information
↓
Result displayed with confidence

---

## 📊 Example Output

* **Plant:** Tomato
* **Disease:** Early Blight
* **Confidence:** 91.17%

Along with:

* Description
* Symptoms
* Causes
* Treatment
* Prevention

---

## 🔮 Future Improvements

* User authentication
* Cloud deployment
* Weather-based disease alerts
* GPS farm mapping
* Multilingual support
* Mobile application
* AI chatbot for farming guidance

---

## 👨‍💻 Author

**Nirjal Acharya**

* GitHub: https://github.com/Nirjal0007
* LinkedIn: https://www.linkedin.com/in/nirjal-acharya-996688383

---

## 📜 License

This project is developed for educational and research purposes as part of a BIT academic project.
