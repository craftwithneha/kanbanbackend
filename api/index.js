export default function handler(_req, res) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (_req.method === "OPTIONS") {
		return res.status(204).end();
	}

	return res.status(200).send("✅ Backend is running!");
}


