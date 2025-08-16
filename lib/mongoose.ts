import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Cache the connection on the global object to avoid creating
// multiple connections in development with hot reloads.
type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
const globalRef = globalThis as any;
let cached: Cache = globalRef.__mongoose || { conn: null, promise: null };
globalRef.__mongoose = cached;

export async function connect() {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
