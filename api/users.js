import { Client, Users } from "node-appwrite";

export default async function handler(req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (req.method === "OPTIONS") {
		return res.status(204).end();
	}

	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		// Appwrite client setup
		const client = new Client()
			.setEndpoint(process.env.APPWRITE_ENDPOINT)
			.setProject(process.env.APPWRITE_PROJECT_ID)
			.setKey(process.env.APPWRITE_ADMIN_API_KEY || process.env.APPWRITE_API_KEY);

		const users = new Users(client);
		const result = await users.list();
		const simplifiedUsers = result.users.map(u => ({ id: u.$id, name: u.name, email: u.email }));
		res.status(200).json(simplifiedUsers);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).json({ error: error.message });
	}
}
