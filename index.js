const app = require('./app');
const connectDB = require('./api/config/db');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB(); // optional (skips if MONGODB_URI not set)
  } catch (e) {
    // connectDB is designed to be non-fatal, but keep this to be safe.
    console.warn('MongoDB init warning:', e?.message || e);
  }

  app.listen(PORT, () => {
    console.log(`✅ Server started on port ${PORT}`);
  });
}

start();


