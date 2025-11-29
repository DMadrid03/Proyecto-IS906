import express from "express";
import dotenv from 'dotenv'
import gastoRoutes from './routes/gasto.routes';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
    'http://localhost:5173',
    'http://localhost:5174'
  ],
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS']
}));


app.use(express.json());
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("TODO APP API");
});

app.use('/gastos', gastoRoutes);

app.listen(PORT, () => {
  console.log(`Server corriendo, port ${PORT}`);
});

