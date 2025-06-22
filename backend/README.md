# Cytewise Backend

A Go backend service for the Cytewise citation generator.

## Features

- RESTful API for citation generation
- Support for multiple citation styles (APA, MLA, Chicago/Turabian, Harvard, IEEE, Vancouver/NLM, AMA, CSE, Bluebook, ASA)
- CORS enabled for frontend integration
- Structured citation data handling

## API Endpoints

### POST /api/generate-citation

Generates a citation based on the provided style and data.

**Request Body:**
```json
{
  "style": "MLA",
  "data": {
    "author": "Smith, John",
    "title": "Example Title",
    "containerTitle": "Example Journal",
    "year": "2023",
    // ... other citation fields
  }
}
```

**Response:**
```json
{
  "citation": "Smith, John. \"Example Title.\" Example Journal, 2023.",
  "style": "MLA"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Running the Server

```bash
cd backend
go run main.go
```

The server will start on port 8080.

## Future Enhancements

- LLM integration for enhanced citation generation
- Database integration for citation storage
- User authentication
- Citation history and management