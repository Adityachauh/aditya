# 🔌 API Documentation

Complete reference for all API endpoints in the Spin-to-Win application.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Endpoints Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/submit-email` | POST | Submit user email |
| `/api/spin` | POST | Spin the wheel |
| `/api/prizes` | GET | Get all prizes |
| `/api/prizes` | POST | Create new prize |
| `/api/prizes` | PUT | Update prize |
| `/api/prizes` | DELETE | Delete prize |
| `/api/send-prize` | POST | Submit shipping address |
| `/api/stats` | GET | Get statistics |

---

## 1. Submit Email

Submit user email to participate in the spin.

### Endpoint
```
POST /api/submit-email
```

### Request Body
```json
{
  "email": "user@example.com",
  "name": "John Doe"  // optional
}
```

### Success Response (200)
```json
{
  "success": true
}
```

### Error Responses

**400 - Email Required**
```json
{
  "error": "Email is required"
}
```

**400 - Already Participated**
```json
{
  "error": "You have already participated. Only one spin per email address is allowed."
}
```

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```javascript
const response = await fetch('/api/submit-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe'
  })
});

const data = await response.json();
```

---

## 2. Spin Wheel

Execute a wheel spin and get the prize result.

### Endpoint
```
POST /api/spin
```

### Request Body
```json
{
  "email": "user@example.com"
}
```

### Success Response (200)
```json
{
  "success": true,
  "prize": {
    "id": "1",
    "name": "50% OFF",
    "type": "digital",
    "probability": 20,
    "quantity": 100,
    "remaining": 99,
    "value": "50% discount code",
    "color": "#FF6B6B"
  },
  "code": "1-abc123-XYZ789"  // only for digital prizes
}
```

### Error Responses

**400 - Email Required**
```json
{
  "error": "Email is required"
}
```

**400 - Email Not Submitted**
```json
{
  "error": "Please submit your email first"
}
```

**400 - No Prizes Available**
```json
{
  "error": "No prizes available at this time"
}
```

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```javascript
const response = await fetch('/api/spin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com'
  })
});

const data = await response.json();
console.log('Won:', data.prize.name);
if (data.code) {
  console.log('Code:', data.code);
}
```

---

## 3. Get Prizes

Retrieve all prizes configuration.

### Endpoint
```
GET /api/prizes
```

### Success Response (200)
```json
{
  "prizes": [
    {
      "id": "1",
      "name": "50% OFF",
      "type": "digital",
      "probability": 20,
      "quantity": 100,
      "remaining": 100,
      "value": "50% discount code",
      "color": "#FF6B6B"
    },
    {
      "id": "2",
      "name": "Free Shipping",
      "type": "digital",
      "probability": 25,
      "quantity": 150,
      "remaining": 150,
      "value": "Free shipping code",
      "color": "#4ECDC4"
    }
  ]
}
```

### Error Response

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```javascript
const response = await fetch('/api/prizes');
const data = await response.json();
console.log('Prizes:', data.prizes);
```

---

## 4. Create Prize

Create a new prize (Admin only).

### Endpoint
```
POST /api/prizes
```

### Request Body
```json
{
  "id": "7",
  "name": "Free Product",
  "type": "physical",
  "probability": 5,
  "quantity": 50,
  "remaining": 50,
  "value": "Free product sample",
  "color": "#FF5733"
}
```

### Success Response (200)
```json
{
  "success": true,
  "prize": {
    "id": "7",
    "name": "Free Product",
    "type": "physical",
    "probability": 5,
    "quantity": 50,
    "remaining": 50,
    "value": "Free product sample",
    "color": "#FF5733"
  }
}
```

### Error Response

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## 5. Update Prize

Update an existing prize (Admin only).

### Endpoint
```
PUT /api/prizes
```

### Request Body
```json
{
  "id": "1",
  "name": "50% OFF",
  "type": "digital",
  "probability": 25,
  "quantity": 100,
  "remaining": 95,
  "value": "50% discount code",
  "color": "#FF6B6B"
}
```

### Success Response (200)
```json
{
  "success": true,
  "prize": {
    "id": "1",
    "name": "50% OFF",
    "type": "digital",
    "probability": 25,
    "quantity": 100,
    "remaining": 95,
    "value": "50% discount code",
    "color": "#FF6B6B"
  }
}
```

### Error Responses

**404 - Not Found**
```json
{
  "error": "Prize not found"
}
```

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## 6. Delete Prize

Delete a prize (Admin only).

### Endpoint
```
DELETE /api/prizes?id={prizeId}
```

### Query Parameters
- `id` (required): Prize ID to delete

### Success Response (200)
```json
{
  "success": true
}
```

### Error Responses

**400 - ID Required**
```json
{
  "error": "Prize ID is required"
}
```

**404 - Not Found**
```json
{
  "error": "Prize not found"
}
```

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```javascript
const response = await fetch('/api/prizes?id=7', {
  method: 'DELETE'
});

const data = await response.json();
```

---

## 7. Submit Shipping Address

Submit shipping address for physical prizes.

### Endpoint
```
POST /api/send-prize
```

### Request Body
```json
{
  "prizeId": "5",
  "address": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA"
  }
}
```

### Success Response (200)
```json
{
  "success": true
}
```

### Error Responses

**400 - Missing Data**
```json
{
  "error": "Prize ID and address are required"
}
```

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```javascript
const response = await fetch('/api/send-prize', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prizeId: '5',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    }
  })
});

const data = await response.json();
```

---

## 8. Get Statistics

Get application statistics (Admin only).

### Endpoint
```
GET /api/stats
```

### Success Response (200)
```json
{
  "totalSpins": 150,
  "emailsCollected": 150,
  "prizesDistributed": 135,
  "prizes": [
    {
      "id": "1",
      "name": "50% OFF",
      "type": "digital",
      "probability": 20,
      "quantity": 100,
      "remaining": 70,
      "value": "50% discount code",
      "color": "#FF6B6B"
    }
  ]
}
```

### Error Response

**500 - Server Error**
```json
{
  "error": "Internal server error"
}
```

### Example Usage

```javascript
const response = await fetch('/api/stats');
const data = await response.json();
console.log('Total Spins:', data.totalSpins);
console.log('Emails Collected:', data.emailsCollected);
console.log('Prizes Distributed:', data.prizesDistributed);
```

---

## Data Types

### Prize Object
```typescript
interface Prize {
  id: string;
  name: string;
  type: 'digital' | 'physical';
  probability: number;
  quantity: number;
  remaining: number;
  value?: string;
  color: string;
  code?: string;
}
```

### User Entry Object
```typescript
interface UserEntry {
  email: string;
  name?: string;
  timestamp: number;
  prize?: string;
  prizeId?: string;
}
```

### Address Object
```typescript
interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}
```

---

## Error Handling

All endpoints follow consistent error handling:

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

### Error Response Format
```json
{
  "error": "Error message description"
}
```

### Client-Side Error Handling Example

```javascript
try {
  const response = await fetch('/api/spin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user@example.com' })
  });

  const data = await response.json();

  if (!response.ok) {
    // Handle error
    console.error('Error:', data.error);
    alert(data.error);
    return;
  }

  // Handle success
  console.log('Prize won:', data.prize);
} catch (error) {
  console.error('Network error:', error);
  alert('An error occurred. Please try again.');
}
```

---

## Rate Limiting (Recommended for Production)

Consider implementing rate limiting:

```javascript
// Example middleware (not included)
const rateLimit = {
  '/api/submit-email': '5 requests per hour per IP',
  '/api/spin': '1 request per user per day',
  '/api/prizes': '100 requests per hour per IP'
};
```

---

## Authentication (Recommended for Admin Routes)

Admin routes should be protected:

```javascript
// Example middleware (not included)
const protectedRoutes = [
  '/api/prizes (POST, PUT, DELETE)',
  '/api/stats'
];
```

---

## CORS Configuration

For cross-origin requests, configure CORS in `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

---

## Testing APIs

### Using cURL

```bash
# Submit email
curl -X POST http://localhost:3000/api/submit-email \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# Spin wheel
curl -X POST http://localhost:3000/api/spin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Get prizes
curl http://localhost:3000/api/prizes

# Get stats
curl http://localhost:3000/api/stats
```

### Using Postman

1. Import the endpoints
2. Set base URL to `http://localhost:3000/api`
3. Add Content-Type header: `application/json`
4. Test each endpoint

---

## Webhook Integration (Future Enhancement)

Consider adding webhooks for:
- New email submission
- Prize won
- Inventory low
- Daily summary

Example webhook payload:
```json
{
  "event": "prize_won",
  "timestamp": 1234567890,
  "data": {
    "email": "user@example.com",
    "prize": "50% OFF",
    "code": "ABC123"
  }
}
```

---

**📚 For more information, see the main [README.md](README.md)**
