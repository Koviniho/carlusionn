import connectDB from './src/config/db.config.js';  
import { app } from './app.js';
import { PORT } from './src/config/env.config.js';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed!', err); 
  }); 