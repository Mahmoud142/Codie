# Course Management API

A RESTful API for managing courses built with Node.js, Express, and MongoDB.

## Features

- CRUD operations for courses
- Input validation
- Error handling
- MongoDB integration

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## API Endpoints

- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get a specific course
- `POST /api/courses` - Create a new course
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

## Course Schema

```javascript
{
    title: String (required),
    description: String (required),
    price: Number (required),
    image: String (optional),
    startDate: Date (optional),
    endDate: Date (optional)
}
``` 