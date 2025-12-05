curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -d '{
    "user": "manuelda",
    "imageUrl": "https://picsum.photos/600/400",
    "description": "Mi primer post desde la API",
    "createdAt": "2025-12-05T08:45:00.000Z"
  }'