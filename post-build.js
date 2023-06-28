import fs from "fs";
import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

fs.writeFileSync(path.join(__dirname, "build"), "(() => import('./index.js'))()", {
	encoding: "utf8",
	flag: "w"
});
