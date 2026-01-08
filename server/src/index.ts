import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('Todo API is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
