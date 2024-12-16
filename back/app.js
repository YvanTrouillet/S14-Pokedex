import "dotenv/config";
import express from "express";
import pokemonRouter from "./src/Routers/pokemon.router.js";
import typeRouter from "./src/Routers/type.router.js";
import teamRouter from "./src/Routers/team.router.js";
import cors from "cors";

// Serveur
const app = express();

// Permission API
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^(http:\/\/localhost:\d+|http:\/\/127\.0\.0\.1:\d+)$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allwed by CORS"));
      }
    },
  })
);

// JSON
app.use(express.json());

// Router
app.use(pokemonRouter);
app.use(typeRouter);
app.use(teamRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
