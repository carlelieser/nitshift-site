import dotenv from "dotenv";
import { NodeSSH } from "node-ssh";

dotenv.config();

const ssh = new NodeSSH();

ssh.connect({
	host: process.env.SERVER_HOST,
	username: process.env.SERVER_USER,
	password: process.env.SERVER_PASSWORD
})
	.then(() => {
		return ssh.putDirectory("build", "/var/www/html");
	})
	.then(() => {
		return ssh.putFile("package.json", "/var/www/html/package.json");
	})
	.then(() => {
		return ssh.execCommand("npm install", {
			cwd: "/var/www/html"
		});
	})
	.then(() => {
		return ssh.execCommand("chmod -R 755 /var/www/html");
	})
	.then(() => {
		return ssh.execCommand("service apache2 restart");
	})
	.then(() => {
		return ssh.dispose();
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
