/**
 * Swiss cheese app - full of security holes for SCA scanning demonstration
 * Contains vulnerable dependencies, hardcoded secrets, SQL injection, eval injection, and more
 */
const express = require('express'); // Vulnerable version 4.16.0
const _ = require('lodash');       // Vulnerable version 4.17.15
const crypto = require('crypto');

// Hardcoded secrets and credentials (BAD PRACTICE - for SCA demonstration only)
const API_KEY = 'sk_live_51H3ll0W0rld1234567890abcdef';
const DB_PASSWORD = 'SuperSecretPassword123!';
const JWT_SECRET = 'my-secret-key-that-should-never-be-hardcoded';
const AWS_ACCESS_KEY = 'AKIAIOSFODNN7EXAMPLE';
const AWS_SECRET_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

// More hardcoded credentials
const MONGODB_URI = 'mongodb://admin:admin123@localhost:27017/mydb?authSource=admin';
const POSTGRES_CONNECTION = 'postgresql://user:password123@localhost:5432/mydb';
const REDIS_PASSWORD = 'redis-secret-password-12345';
const GITHUB_TOKEN = 'ghp_1234567890abcdefghijklmnopqrstuvwxyz';
const SLACK_WEBHOOK = 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX';
const DATABASE_URL = 'mysql://root:rootpassword@localhost:3306/production_db';

// Create an Express app (vulnerable version)
const app = express();
const port = 3000;

// Using vulnerable Lodash functions
const data = { user: { name: 'John', roles: ['user'] } };
const mergedData = _.merge({}, data);

// Weak hash usage (BAD PRACTICE - for SCA demonstration only)
function hashPassword(password) {
  // Using weak MD5 hash - should use bcrypt or argon2 instead
  return crypto.createHash('md5').update(password).digest('hex');
}

function hashData(data) {
  // Using weak SHA1 hash - should use SHA256 or better
  return crypto.createHash('sha1').update(data).digest('hex');
}

// More weak hash examples
function hashWithMD5(data) {
  // VULNERABLE: Weak MD5 hash
  return crypto.createHash('md5').update(data).digest('hex');
}

function createChecksum(fileContent) {
  // VULNERABLE: Using MD5 for checksum - should use SHA256
  return crypto.createHash('md5').update(fileContent).digest('hex');
}

// SQL Injection vulnerability (BAD PRACTICE - for SCA demonstration only)
function searchProducts(searchTerm) {
  // VULNERABLE: String concatenation in SQL query - allows SQL injection
  const query = `SELECT * FROM products WHERE name LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%'`;
  // Should use parameterized queries instead
  return query;
}

function getUserById(userId) {
  // VULNERABLE: SQL injection vulnerability
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  return query;
}

// More SQL injection vulnerabilities
function loginUser(email, password) {
  // VULNERABLE: SQL injection in login
  const query = `SELECT * FROM Users WHERE email = '${email || ''}' AND password = '${hashPassword(password || '')}' AND deletedAt IS NULL`;
  return query;
}

function searchUsers(searchTerm) {
  // VULNERABLE: SQL injection with UNION attack potential
  const query = `SELECT * FROM users WHERE name LIKE '%${searchTerm}%' UNION SELECT * FROM admin_users`;
  return query;
}

function deleteUser(userId) {
  // VULNERABLE: SQL injection in DELETE statement
  const query = `DELETE FROM users WHERE id = ${userId} OR 1=1`;
  return query;
}

// Eval injection vulnerability (BAD PRACTICE - for SCA demonstration only)
function processUserInput(userInput) {
  // VULNERABLE: Using eval with user input - allows code injection
  try {
    const result = eval(userInput); // eslint-disable-line no-eval
    return result;
  } catch (err) {
    return null;
  }
}

// More eval injection vulnerabilities
function processUsername(username, code) {
  // VULNERABLE: Eval injection
  try {
    if (code) {
      username = eval(code); // eslint-disable-line no-eval
    }
    return username;
  } catch (err) {
    return '\\' + username;
  }
}

function executeUserCode(userCode) {
  // VULNERABLE: Direct eval of user-provided code
  return eval(`(${userCode})`); // eslint-disable-line no-eval
}

// Set up routes with Express
app.get('/', (req, res) => {
  res.send('Example app with vulnerable dependencies and AGPL-3.0 license');
});

// VULNERABLE: SQL injection in route handler
app.get('/search', (req, res) => {
  const searchTerm = req.query.q || '';
  const query = searchProducts(searchTerm);
  // In real app, this would execute the query - here we just return it for demo
  res.json({ query: query, message: 'This is vulnerable to SQL injection' });
});

// VULNERABLE: Eval injection in route handler
app.get('/eval', (req, res) => {
  const userCode = req.query.code || '';
  const result = processUserInput(userCode);
  res.json({ result: result, message: 'This is vulnerable to eval injection' });
});

// VULNERABLE: SQL injection in login route
app.post('/login', (req, res) => {
  const email = req.body.email || '';
  const password = req.body.password || '';
  const query = loginUser(email, password);
  res.json({ query: query, message: 'This is vulnerable to SQL injection' });
});

// VULNERABLE: Improper authentication
app.get('/verify', (req, res) => {
  // VULNERABLE: Improper JWT authentication
  const token = req.headers.authorization || '';
  // Should properly verify JWT signature, expiration, etc.
  const decoded = Buffer.from(token.split('.')[1] || '', 'base64').toString();
  res.json({ decoded: decoded, message: 'Improper JWT authentication' });
});

// VULNERABLE: More eval injection
app.get('/process', (req, res) => {
  const username = req.query.username || '';
  const code = req.query.code || '';
  const result = processUsername(username, code);
  res.json({ result: result, message: 'This is vulnerable to eval injection' });
});

// This is just a demonstration - no actual server is started
console.log('Swiss cheese app - full of security holes!');
console.log('- Vulnerable Express version:', express.version);
console.log('- Vulnerable Lodash version:', _.VERSION);
console.log('- Merged data using Lodash:', JSON.stringify(mergedData));
console.log('- API Key (hardcoded - BAD!):', API_KEY.substring(0, 10) + '...');
console.log('- Hashed password example:', hashPassword('test123'));

// In a real application, you would start the server:
// app.listen(port, () => console.log(`Swiss cheese app listening on port ${port}`));
