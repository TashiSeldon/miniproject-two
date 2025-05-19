import { MongoClient } from 'mongodb';

// Check for MongoDB URI in both .env and .env.local
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI is not defined in environment variables');
  throw new Error('Please add your MongoDB URI to .env or .env.local');
}

console.log('MongoDB URI found:', mongoUri.substring(0, 20) + '...'); // Log partial URI for security

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    console.log('Creating new MongoDB client in development mode');
    client = new MongoClient(mongoUri, options);
    global._mongoClientPromise = client.connect()
      .then(() => {
        console.log('Successfully connected to MongoDB');
        return client;
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  console.log('Creating new MongoDB client in production mode');
  client = new MongoClient(mongoUri, options);
  clientPromise = client.connect()
    .then(() => {
      console.log('Successfully connected to MongoDB');
      return client;
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 