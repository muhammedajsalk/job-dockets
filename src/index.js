import app from './app.js';
import { configDotenv } from 'dotenv'
import connectDB from './config/dbConnect.js';

configDotenv();

const PORT = process.env.PORT 

connectDB()
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
