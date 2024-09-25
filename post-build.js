import dotenv from "dotenv";
import { Client } from "basic-ftp";

dotenv.config();

const client = new Client();
client.ftp.verbose = true;

client
	.access({
		host: process.env.FTP_HOST,
		user: process.env.FTP_USER,
		password: process.env.FTP_PASSWORD,
		secure: false
	})
	.then(() => {
		return client.ensureDir("/var/www/html");
	})
	.then(() => {
		return client.uploadFromDir("build");
	})
	.then(() => {
		return client.uploadFrom("package.json", "package.json");
	})
	.then(() => {
		return client.close();
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
