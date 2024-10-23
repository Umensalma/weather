REAL TIME WEATHER MONITORING SYSTEM


Features
Fetches real-time weather data using the OpenWeatherMap API.
Provides summarized weather insights (e.g., daily high/low temperatures, humidity levels).
Real-time alerts based on customizable weather conditions.
Visualizations for weather patterns.
Aggregates and rollups for weather data, including averages and trends.
Technologies Used
Frontend: React, Vite, Material UI
Backend: FastAPI, Python
Database: MongoDB
Other:  Axios, ReactFlow (for visualizations)
Architecture
Frontend: React app that fetches weather data, displays insights, and visualizes data.
Backend: FastAPI server responsible for API integration, processing weather data, and managing rule-based alerts.
Database: MongoDB to store and retrieve historical weather data and user-defined rules.
Installation
Prerequisites
Python 3.x
Node.js
Docker (optional, for containerized setup)
OpenWeatherMap API key (You can sign up for free at OpenWeatherMap)

To set up and run this application, you'll need:

Backend setup:

bashCopynpm init -y
npm install express mongoose cors dotenv axios nodemailer

Frontend setup:

npm create vite@latest weather-frontend -- --template react
cd weather-frontend
npm install @radix-ui/react-tabs recharts

Create a .env file in the backend directory:

CopyMONGODB_URI=mongodb://localhost:27017/weather-monitoring
OPENWEATHER_API_KEY=your_api_key_here
PORT=5000

Start the FastAPI server:

bash
Copy code
uvicorn main:app --reload
The API will be accessible at http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

# Create project directory
mkdir weather-monitoring-system
cd weather-monitoring-system


# Create frontend directory using Vite
cd ..
npm create vite@latest frontend -- --template react
install dependencies
npm run dev

Things to note:

Make sure MongoDB is running locally
Get an API key from OpenWeatherMap and add it to the backend .env file
The frontend will run on http://localhost:5173 by default
The backend will run on http://localhost:5000
