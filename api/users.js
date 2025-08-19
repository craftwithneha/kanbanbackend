import { Client, Users } from "node-appwrite";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Appwrite client setup
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)   // Appwrite Endpoint
      .setProject(process.env.APPWRITE_PROJECT_ID)  // Project ID
      .setKey(process.env.APPWRITE_API_KEY);        // API Key (Server key)

    const users = new Users(client);

    const result = await users.list();

    // Simplify users data
    const simplifiedUsers = result.users.map(u => ({
      id: u.$id,
      name: u.name,
      email: u.email
    }));

    res.status(200).json(simplifiedUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
}
