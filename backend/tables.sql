CREATE TABLE IF NOT EXISTS customers (
  id INTEGER PRIMARY KEY,
  name INTEGER NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
