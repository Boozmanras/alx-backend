# **Queuing System in JavaScript**

## **Project Overview**

This project explores building and managing a queuing system using **Redis**, **Kue**, and **Node.js**, with practical implementations of job scheduling, task processing, and API-based interaction. Through this project, you will learn to integrate queuing systems for efficient handling of asynchronous tasks, manage resources effectively, and test the functionalities.

---

## **Project Tasks**

### **0. Redis Client**

**Objective**: Set up a Redis client in Node.js.  
- Connect to a Redis server.  
- Handle connection events (`connect`, `error`).  

File: `0-redis_client.js`  
**Example**: 
```bash
$ npm run dev 0-redis_client.js
```

---

### **1. Node Redis Operations**

**Objective**: Explore Redis commands in Node.js.  
- Store and retrieve values using Redis commands like `set` and `get`.

File: `1-redis_op.js`  
**Example**:  
```bash
$ npm run dev 1-redis_op.js
```

---

### **2. Async Redis Operations**

**Objective**: Use `promisify` to handle Redis operations asynchronously.  
- Fetch data using promises with `util.promisify`.

File: `2-redis_op_async.js`  
**Example**:  
```bash
$ npm run dev 2-redis_op_async.js
```

---

### **3. Advanced Redis Publisher/Subscriber**

**Objective**: Implement Redis Pub/Sub pattern.  
- Set up a publisher and subscriber.  
- Demonstrate message broadcasting between components.

Files:  
- `3-redis_pub.js` (Publisher)  
- `4-redis_sub.js` (Subscriber)  

**Example**:  
```bash
$ npm run dev 4-redis_sub.js
```

---

### **4. Create Kue Queue**

**Objective**: Set up a basic Kue queue for managing tasks.  
- Push jobs into the queue and process them.

File: `5-queuing.js`  
**Example**:  
```bash
$ npm run dev 5-queuing.js
```

---

### **5. Job Creation**

**Objective**: Create jobs and handle their lifecycle.  
- Use `kue` to log job events (`created`, `completed`, `failed`).

File: `6-job.js`  
**Example**:  
```bash
$ npm run dev 6-job.js
```

---

### **6. Writing Job Tests**

**Objective**: Write unit tests for job creation.  
- Use Mocha to test job creation and lifecycle logging.

File: `6-job.test.js`  
**Example**:  
```bash
$ npm test 6-job.test.js
```

---

### **7. Managing Jobs**

**Objective**: Enhance job creation with better error handling and job progress monitoring.  

File: `7-job.js`  
**Example**:  
```bash
$ npm run dev 7-job.js
```

---

### **8. Writing Job Lifecycle Tests**

**Objective**: Test the job lifecycle.  
- Ensure jobs are added to the queue and complete as expected.  

File: `8-job.test.js`  
**Example**:  
```bash
$ npm test 8-job.test.js
```

---

### **9. Stock Management with Redis**

**Objective**: Create an API to manage product stock.  
- Use Redis to store and retrieve product data.  
- Implement endpoints to retrieve product details and manage stock.  

File: `9-stock.js`  
**API Endpoints**:  
- `GET /list_products`: List all products.  
- `GET /list_products/:itemId`: Get details of a specific product.  
- `GET /reserve_product/:itemId`: Reserve stock for a product.  

**Example**:  
```bash
$ npm run dev 9-stock.js
```

---

### **10. Seat Reservation System**

**Objective**: Build a seat reservation system using Redis and Kue. 
- Reserve seats, process reservations, and update seat availability dynamically.

File: `100-seat.js` 
**API Endpoints**: 
- `GET /available_seats`: Get available seats. 
- `GET /reserve_seat`: Reserve a seat. 
- `GET /process`: Process the reservation queue. 

**Example**: 
```bash
$ npm run dev 100-seat.js
```

---

## **How to Run the Project**

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Redis Server**:
   Ensure Redis is running locally:
   ```bash
   redis-server
   ```

3. **Run Tasks**:
   Use the following command to execute specific files:
   ```bash
   npm run dev <file_name.js>
   ```

4. **Run Tests**:
   Execute tests using Mocha:
   ```bash
   npm test <file_name.test.js>
   ```

---

## **Technologies Used**

- **Node.js**: Backend framework.
- **Redis**: In-memory data structure store for queuing and Pub/Sub.
- **Kue**: Job queue for task management.
- **Mocha & Chai**: Testing framework and assertion library.

---

## **Learning Outcomes**

- Efficiently manage jobs using queuing systems.
- Integrate Redis for real-time data handling.
- Write robust unit tests for job and resource management.
- Implement RESTful APIs for stock and seat management.

---

## **Author**

Victor paul
