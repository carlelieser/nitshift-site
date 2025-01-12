import shell from "shelljs";

export class Shell {
	private cwd: string;

	constructor(cwd: string) {
		this.cwd = cwd;
	}

	public exec = async (
		command: string,
		options: object = { async: true },
		onStdout?: (stdout: string) => void,
		onStderr?: (stderr: string) => void
	) => {
		return new Promise((resolve, reject) => {
			const child = shell.exec(command, {
				...options,
				cwd: this.cwd,
				async: true
			});
			child.stdout?.on("data", (data) => onStdout?.(data.toString()));
			child.stderr?.on("data", (data) => onStderr?.(data.toString()));
			child.on("error", reject);
			child.on("close", resolve);
		});
	};

	public cd = (dir: string) => {
		this.cwd = dir;
	};
}
