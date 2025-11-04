🖋️ Handwriting Recognition using AI
📄 Overview

This project is a simple AI-powered handwriting recognition web application that allows users to upload an image containing handwritten text and automatically extracts and displays the decoded digital text.

It uses Google Cloud Vision API for text extraction and provides a clean frontend interface for image upload and text display.

🚀 Features

🧠 Recognizes handwritten text from images

📤 Upload any image file (JPG, PNG, etc.)

🔍 Extracts text using Google Cloud Vision API

⚡ Fast and reliable backend API integration

🌐 Deployable on Vercel or any cloud platform

🏗️ Tech Stack
Layer	Technology
Frontend	React / Next.js
Backend	Node.js + Express
AI API	Google Cloud Vision API
Hosting	Vercel (Recommended)
Language	JavaScript / TypeScript
📸 Project Flow

User uploads an image containing handwritten text.

The image is sent to the backend API.

Backend sends the image to Google Cloud Vision API.

Vision API processes and returns extracted text.

Extracted text is displayed on the frontend.

⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/yourusername/handwriting-recognition.git
cd handwriting-recognition

2️⃣ Install Dependencies
npm install

3️⃣ Setup Google Cloud Vision API

Go to Google Cloud Console
.

Create a new project.

Enable Cloud Vision API.

Go to APIs & Services → Credentials → Create API Key.

Copy your API Key.

4️⃣ Create .env File

In the root directory, create a .env file and add:

GOOGLE_CLOUD_VISION_API_KEY=your_api_key_here

5️⃣ Start the Server
npm run dev

6️⃣ Access the App

Visit http://localhost:3000 and try uploading an image!

🧩 API Endpoint Example

POST /api/recognize
Description: Sends the image to the backend which calls Google Vision API.

Request Body:

{
  "image": "base64_encoded_image_string"
}


Response Example:

{
  "recognizedText": "Hello World from handwritten note!"
}

🧠 Future Enhancements

Support for multiple handwriting styles

Add OCR accuracy score

Multi-language handwriting recognition

Save recognition history

🧑‍💻 Author

Dhruv Dixit
