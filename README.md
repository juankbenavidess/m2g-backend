# Meet2Go Backend

Backend simple para comprar tickets de eventos.

## Ejecutar el proyecto

```bash
npm install
npm run dev
```

Servidor en: `http://localhost:3000`

## Arquitectura

Clean Architecture con 3 capas:

- **presentation**: Controllers, routes, middlewares (HTTP)
- **application**: Use Cases (lógica de negocio)
- **domain**: Entidades e interfaces (User, Event, Ticket)
- **infrastructure**: Implementaciones (JSON storage, JWT, bcrypt)

Cada capa solo conoce a la de abajo. Domain no sabe nada de Express ni de cómo se guardan los datos.
Los Use Cases están aislados y son fáciles de testear.

## Endpoints

- `POST /api/auth/register` - Crear usuario
- `POST /api/auth/login` - Login (devuelve JWT)
- `GET /api/events` 🔒 - Ver eventos
- `POST /api/tickets/purchase` 🔒 - Comprar
- `GET /api/tickets/my-tickets` 🔒 - Ver compras

🔒 = Requiere token JWT

## Probar
 
Usuario de prueba:
- Email: `user@example.com`
- Password: `password123`

Eventos:
- Pan de Dulce - Campanazo Navideño ($15)
- La Cotorrisa ($45)
- Nicola Cruz + Silvia Ponce ($35)

Usa Postman: importa `Meet2Go.postman_collection.json`

---

Juan Carlos Benavides - 2025