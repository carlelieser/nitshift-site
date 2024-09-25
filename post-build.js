import * as path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { Client } from "basic-ftp";

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

fs.writeFileSync(path.join(__dirname, "build", "index.cjs"), 'import("./index.js");', {
	encoding: "utf8",
	flag: "w"
});

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
		return client.uploadFromDir(path.join(__dirname, "build"));
	})
	.then(() => {
		return client.close();
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
