import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Client, Users } from "node-appwrite";

dotenv.config();

const app = express();
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// Appwrite client
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_ADMIN_API_KEY);

const users = new Users(client);

// Routes
app.get("/", (_req, res) => {
  res.send("✅ Backend is running!");
});

app.get("/users", async (_req, res) => {
  try {
    const result = await users.list();
    const simplifiedUsers = result.users.map(u => ({
      id: u.$id,
      name: u.name,
      email: u.email
    }));
    res.json(simplifiedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
