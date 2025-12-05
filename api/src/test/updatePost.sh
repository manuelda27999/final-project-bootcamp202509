# Reemplaza <ID> por el _id real de tu documento
curl -X PUT http://localhost:3000/posts/<ID> \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Descripción actualizada desde la API"
  }'