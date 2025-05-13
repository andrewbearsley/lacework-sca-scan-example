/**
 * Example application that uses an AGPL-3.0 licensed package
 * and vulnerable dependencies for SCA scanning demonstration
 */
const agplExample = require('agpl-example');
const express = require('express'); // Vulnerable version 4.16.0
const _ = require('lodash');       // Vulnerable version 4.17.15

// Create an Express app (vulnerable version)
const app = express();
const port = 3000;

// Using vulnerable Lodash functions
const data = { user: { name: 'John', roles: ['user'] } };
const mergedData = _.merge({}, data);

// Set up routes with Express
app.get('/', (req, res) => {
  res.send('Example app with vulnerable dependencies and AGPL-3.0 license');
});

// This is just a demonstration - no actual server is started
console.log('This application uses:');
console.log('- AGPL-3.0 licensed package:', Object.keys(agplExample));
console.log('- Vulnerable Express version:', express.version);
console.log('- Vulnerable Lodash version:', _.VERSION);
console.log('- Merged data using Lodash:', JSON.stringify(mergedData));

// In a real application, you would start the server and use MongoDB:
// app.listen(port, () => console.log(`Example app listening on port ${port}`));
// 
// agplExample.connectToMongoDB('mongodb://localhost:27017')
//   .then(client => {
//     console.log('Connected to MongoDB');
//     client.close();
//   })
//   .catch(err => console.error('Error:', err));
