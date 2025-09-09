# 📘 Course Management System API Documentation

## ⚙️ Installation Guide (Run Locally)

Follow these steps to run the Course Management System API locally:

1.  **Clone Repository**

    ```bash
    git clone https://github.com/Adnan4141/course-management-api.git
    cd course-management-api
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Set Environment Variables**

    - Create a `.env` file in the root directory.
    - Add the following:
      ```env
      PORT=3000
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      JWT_REFRESH_SECRET=your_jwt_refresh_secret
      FRONTEND_URL=your_frontend_url
      NODE_ENV=development

           ```

4.  **Run the Application**

    ```bash
    npm run dev
    ```

5.  **Access API**
    - Base URL will be: `http://localhost:3000`

---

## ✨ Features

- 👤 **User Management**: Register, login, update profile.
- 📚 **Course Management**: Create, update, delete, fetch courses.
- 💳 **Purchase System**: Users can purchase courses and view purchase history.
- 🔐 **Authentication**: Secure JWT-based authentication with refresh tokens.
- 🛠 **Role-based Access**: Different permissions for users and admins.

---

## 🔑 Authentication Endpoints

### 1. Register User

- **Endpoint:** `POST /auth/register`
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

- **Response Example (201 Created):**

```json
{
  "success": true,
  "error": false,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "68c04cf71a21e27fdbd008b4",
      "name": "John Doe",
      "email": "john@gmail.com",
      "role": "user"
    }
  }
}
```

---

### 2. Login

- **Endpoint:** `POST /auth/login`
- **Request Body:**

```json
{
  "email": "adnan@gmail.com",
  "password": "123456"
}
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Login successful",
  "data": {
    "accessToken": "your-jwt-token",
    "refreshToken": "your-refresh-token"
  }
}
```

---

### 3. Refresh Token

- **Endpoint:** `POST /auth/refresh`
- **Request Body:**

```json
{
  "refreshToken": "your-refresh-token"
}
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "new-access-token"
  }
}
```

---

### 4. Logout

- **Endpoint:** `POST /auth/logout`
- **Request Body:**

```json
{
  "refreshToken": "your-refresh-token"
}
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Logged out successfully"
}
```

---

## 👤 User Endpoints

### 1. Get User Profile

- **Endpoint:** `GET /user/profile`
- **Headers:**

```http
Cookie: access_token=your-jwt-token
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "User profile fetched successfully",
  "data": {
    "_id": "68c04cf71a21e27fdbd008b4",
    "name": "John Doe",
    "email": "john@gmail.com",
    "role": "user"
  }
}
```

---

### 2. Update User Profile

- **Endpoint:** `PUT /user/profile`
- **Headers:**

```http
Cookie: access_token=your-jwt-token
```

- **Request Body:**

```json
{
  "name": "Adnan Hossain"
}
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "User profile updated successfully",
  "data": {
    "_id": "68c04cf71a21e27fdbd008b4",
    "name": "Adnan Hossain",
    "email": "john@gmail.com",
    "role": "user"
  }
}
```

---

## 📚 Course Endpoints

### 1. Get All Courses

- **Endpoint:** `GET /courses`
- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Courses fetched successfully",
  "data": {
    "courses": [
      {
        "_id": "68c04ae27ff790c2efe455d7",
        "title": "Introduction to React 19 update",
        "description": "Learn the fundamentals of React.js, including components, state, and hooks.",
        "price": 49.99,
        "instructor": "68bfdd3cb64b492eabd5b990"
      }
    ]
  }
}
```

---

### 2. Create New Course

- **Endpoint:** `POST /courses`
- **Request Body:**

```json
{
  "title": "UI/UX Design Fundamentals",
  "description": "Learn the principles of user interface and user experience design for web and mobile.",
  "price": 39.99,
  "instructor": "68bfdd3cb64b492eabd5b990",
  "category": "Design"
}
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Course created successfully",
  "data": {
    "_id": "68c04b227ff790c2efe455d8",
    "title": "UI/UX Design Fundamentals",
    "description": "Learn the principles of user interface and user experience design for web and mobile.",
    "price": 39.99,
    "instructor": "68bfdd3cb64b492eabd5b990",
    "category": "Design"
  }
}
```

---

### 3. Update Course

- **Endpoint:** `PUT /courses/{courseId}`
- **Request Body:**

```json
{
  "title": "Introduction to React 19 update"
}
```

- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Course updated successfully",
  "data": {
    "_id": "68c04ae27ff790c2efe455d7",
    "title": "Introduction to React 19 update"
  }
}
```

---

### 4. Get Course by ID

- **Endpoint:** `GET /courses/{courseId}`
- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Course fetched successfully",
  "data": {
    "_id": "68c04ae27ff790c2efe455d7",
    "title": "Introduction to React 19 update",
    "description": "Learn the fundamentals of React.js, including components, state, and hooks.",
    "price": 49.99,
    "instructor": "68bfdd3cb64b492eabd5b990"
  }
}
```

---

### 5. Delete Course

- **Endpoint:** `DELETE /courses/{courseId}`
- **Response Example:**

```json
{
  "success": true,
  "error": false,
  "message": "Course deleted successfully"
}
```

---

## 💳 Purchase Endpoints

### 1. Purchase a Course

- **Endpoint:** `POST /purchases`
- **Headers:**

```http
Cookie: access_token=your-jwt-token
```

- **Request Body:**

```json
{
  "courseId": "68c04ae27ff790c2efe455d7"
}
```

- **Response Example (201 Created):**

```json
{
  "success": true,
  "error": false,
  "message": "Course purchased successfully",
  "data": {
    "purchase": {
      "userId": "68c04cf71a21e27fdbd008b4",
      "courseId": "68c04ae27ff790c2efe455d7",
      "amount": 49.99,
      "date": "2025-09-09T15:53:33.469Z",
      "_id": "68c04d7d1a21e27fdbd008bd",
      "createdAt": "2025-09-09T15:53:33.470Z",
      "updatedAt": "2025-09-09T15:53:33.470Z"
    }
  }
}
```

---

### 2. Get User Purchases

- **Endpoint:** `GET /purchases`
- **Headers:**

```http
Cookie: access_token=your-jwt-token
```

- **Response Example (200 OK):**

```json
{
  "success": true,
  "error": false,
  "message": "User purchases fetched successfully",
  "data": {
    "purchases": [
      {
        "_id": "68c04d7d1a21e27fdbd008bd",
        "userId": "68c04cf71a21e27fdbd008b4",
        "courseId": {
          "_id": "68c04ae27ff790c2efe455d7",
          "title": "Introduction to React 19 update",
          "description": "Learn the fundamentals of React.js, including components, state, and hooks.",
          "price": 49.99,
          "instructor": "68bfdd3cb64b492eabd5b990"
        },
        "amount": 49.99,
        "date": "2025-09-09T15:53:33.469Z",
        "createdAt": "2025-09-09T15:53:33.470Z",
        "updatedAt": "2025-09-09T15:53:33.470Z"
      }
    ]
  }
}
```
