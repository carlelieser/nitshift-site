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
		console.log("Uploading build...");
		return ssh.putDirectory("build", "/var/www/html", {
			concurrency: 1,
			tick: (localFile, remoteFile, error) => {
				console.log(`Uploading file: ${localFile} -> ${remoteFile}`);
				if (error) {
					console.error(error);
				}
			}
		});
	})
	.then(() => {
		console.log("Uploading package.json...");
		return ssh.putFile("package.json", "/var/www/html/package.json");
	})
	.then(() => {
		console.log("Installing NPM modules...");
		return ssh.execCommand("npm install", {
			cwd: "/var/www/html"
		});
	})
	.then(() => {
		console.log("Correcting directory access...");
		return ssh.execCommand("chmod -R 755 /var/www/html");
	})
	.then(() => {
		console.log("Restarting server...");
		return ssh.execCommand("service apache2 restart");
	})
	.then(() => {
		return ssh.dispose();
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
