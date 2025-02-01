import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ✅ Fix CORS: Allow frontend to access backend
app.use(cors({
    origin: "http://localhost:5173", // ✅ Allow requests from Vite dev server
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type"
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sample user data
const users = [
  { id: 1, name: "Alice Johnsons", email: "alice@example.com" },
  { id: 2, name: "Bob Smiths", email: "bob@example.com" },
  { id: 3, name: "Charlie Browns", email: "charlie@example.com" }
];

app.get("/users", (req, res) => {
    res.json(users);
});

// ✅ FIX: Explicitly return `void` to satisfy TypeScript
app.get("/users/:id", (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return; // ✅ Ensure function exits after response
  }

  res.json(user);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
