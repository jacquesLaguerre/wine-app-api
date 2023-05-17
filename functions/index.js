import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import { getAllWines, createNewWines } from "./src/wines.js";

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/test', (req, res) => res.send('Hello World!'))
app.get('/wines', getAllWines)
app.post('/wines', createNewWines)


export const api = functions.https.onRequest(app);