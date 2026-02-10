# University Qualifier Exam - BFHL API

A production-ready full-stack application featuring a RESTful API backend and a clean, professional frontend built with vanilla JavaScript.

## 🚀 Features

### Backend API
- **Fibonacci Series**: Generate Fibonacci sequence up to n terms
- **Prime Number Filter**: Filter prime numbers from an array
- **LCM Calculator**: Calculate Least Common Multiple of multiple numbers
- **HCF Calculator**: Calculate Highest Common Factor of multiple numbers
- **AI Question Answering**: Get single-word answers using Google Gemini AI

### Frontend
- **Clean, Professional UI**: Built with HTML, CSS, and Vanilla JavaScript
- **Modular Architecture**: Separation of concerns with dedicated modules
- **Real-time Validation**: Client-side validation before API calls
- **Responsive Design**: Works seamlessly on mobile and desktop
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Error Handling**: Graceful error handling with user-friendly messages

## 📁 Project Structure

```
bajaj/
├── frontend/                 # Frontend application
│   ├── index.html           # Main HTML file
│   ├── css/
│   │   └── styles.css       # Styling
│   ├── js/
│   │   ├── api.js          # API communication
│   │   ├── state.js        # State management
│   │   ├── validators.js   # Input validation
│   │   ├── handlers.js     # Event handlers
│   │   └── main.js         # Entry point
│   └── assets/
├── src/                     # Backend source code
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server bootstrap
│   ├── config/
│   │   └── env.js          # Environment configuration
│   ├── constants/
│   │   └── response.constants.js
│   ├── controllers/
│   │   ├── bfhl.controller.js
│   │   └── health.controller.js
│   ├── routes/
│   │   ├── bfhl.routes.js
│   │   └── health.routes.js
│   ├── services/
│   │   ├── ai.service.js
│   │   └── math.service.js
│   └── utils/
│       └── validators.js
├── .env                     # Environment variables
├── .env.example            # Environment template
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bajaj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your credentials:
   ```env
   PORT=3000
   GEMINI_API_KEY=your_gemini_api_key_here
   OFFICIAL_EMAIL=your.email@example.com
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   
   The server will run on `http://localhost:3000`

### Frontend Setup

**Option 1: Direct File Access**
- Simply open `frontend/index.html` in your browser

**Option 2: Local Server (Recommended)**
```bash
# Using Python
cd frontend
python -m http.server 8000

# Using Node.js http-server
cd frontend
npx http-server -p 8000

# Using VS Code Live Server
# Right-click index.html → Open with Live Server
```

Then open `http://localhost:8000` in your browser.

## 📖 API Documentation

### Endpoints

#### POST `/bfhl`
Main API endpoint for all operations.

**Request Format:**
```json
{
  "operation_name": value
}
```

**Operations:**

1. **Fibonacci**
   ```json
   { "fibonacci": 7 }
   ```
   Response:
   ```json
   {
     "is_success": true,
     "official_email": "your.email@example.com",
     "data": [0, 1, 1, 2, 3, 5, 8]
   }
   ```

2. **Prime**
   ```json
   { "prime": [2, 4, 7, 9, 11] }
   ```
   Response:
   ```json
   {
     "is_success": true,
     "official_email": "your.email@example.com",
     "data": [2, 7, 11]
   }
   ```

3. **LCM**
   ```json
   { "lcm": [12, 18, 24] }
   ```
   Response:
   ```json
   {
     "is_success": true,
     "official_email": "your.email@example.com",
     "data": 72
   }
   ```

4. **HCF**
   ```json
   { "hcf": [24, 36, 60] }
   ```
   Response:
   ```json
   {
     "is_success": true,
     "official_email": "your.email@example.com",
     "data": 12
   }
   ```

5. **AI Question**
   ```json
   { "AI": "What is the capital of Maharashtra?" }
   ```
   Response:
   ```json
   {
     "is_success": true,
     "official_email": "your.email@example.com",
     "data": "Mumbai"
   }
   ```

#### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-10T06:15:30.123Z"
}
```

### Error Responses

```json
{
  "is_success": false,
  "error": "Error message here"
}
```

## 🎨 Frontend Architecture

### Module Responsibilities

- **`api.js`**: Handles all HTTP requests, timeout management, and network error handling
- **`state.js`**: Manages application state with observer pattern for reactive updates
- **`validators.js`**: Validates user input with operation-specific rules
- **`handlers.js`**: Manages DOM events and user interactions
- **`main.js`**: Application entry point and initialization

### Key Features

1. **Dynamic Input Rendering**
   - Input field updates based on selected operation
   - Context-aware placeholders and hints
   - Operation-specific validation rules

2. **Client-Side Validation**
   - Empty input detection
   - Type validation (number, array, string)
   - Format validation (comma-separated values)
   - Real-time error feedback

3. **Loading States**
   - Visual loading indicator on submit button
   - Disabled state during API calls
   - Timeout handling (10 seconds)

4. **Result Display**
   - Color-coded success/error states
   - Pretty-printed arrays
   - Metadata display (email)
   - Smooth scroll to results

## 🚀 Deployment

### Frontend Deployment

#### GitHub Pages
1. Push `frontend` folder to GitHub
2. Go to Settings → Pages
3. Select branch and `/frontend` folder
4. Save and access via provided URL

#### Netlify
1. Drag and drop `frontend` folder to Netlify
2. Or connect GitHub repository
3. Set publish directory to `frontend`

**Important**: Update the API base URL in `frontend/js/api.js` to your deployed backend URL.

### Backend Deployment

#### Vercel (Recommended)
Already configured with `vercel.json`:
```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard:
- `GEMINI_API_KEY`
- `OFFICIAL_EMAIL`

#### Other Platforms
- **Heroku**: Add `Procfile` with `web: node src/server.js`
- **Railway**: Connect repository and deploy
- **Render**: Set start command to `node src/server.js`

## 🧪 Testing

### Frontend Testing

1. **Start backend server**
   ```bash
   npm start
   ```

2. **Open frontend**
   - Open `frontend/index.html` in browser

3. **Test each operation**
   - Select "Fibonacci Series"
   - Enter: `7`
   - Click Submit
   - Verify result: `[0, 1, 1, 2, 3, 5, 8]`

4. **Test validation**
   - Try submitting without selecting operation
   - Try submitting empty input
   - Try invalid formats

5. **Test error handling**
   - Stop the backend server
   - Try submitting a request
   - Verify network error message

### Backend Testing (cURL)

**Health Check**
```bash
curl http://localhost:3000/health
```

**Fibonacci**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"fibonacci": 7}'
```

**Prime Numbers**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"prime": [2, 4, 7, 9, 11]}'
```

**LCM**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"lcm": [12, 18, 24]}'
```

**HCF**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"hcf": [24, 36, 60]}'
```

**AI Question**
```bash
curl -X POST http://localhost:3000/bfhl \
  -H "Content-Type: application/json" \
  -d '{"AI": "What is the capital of Maharashtra?"}'
```

## 🔧 Configuration

### Change API Base URL (Frontend)
Edit `frontend/js/api.js`:
```javascript
const API_CONFIG = {
    baseURL: 'http://localhost:3000',  // Change this to your backend URL
    // ...
};
```

### Change Request Timeout (Frontend)
Edit `frontend/js/api.js`:
```javascript
const API_CONFIG = {
    // ...
    timeout: 10000  // milliseconds (default: 10 seconds)
};
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **AI**: Google Gemini API
- **Environment**: dotenv

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript**: ES6+ modules
- **No frameworks or libraries**

## 📝 License

MIT

## 👤 Author

Maridul
- Email: maridul1897.be23@chitkara.edu.in

## 🙏 Acknowledgments

- Google Gemini AI for question answering
- Express.js for backend framework
- Modern web standards for frontend implementation

---

**Built with ❤️ for University Qualifier Exam**
