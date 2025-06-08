import { PUBLIC_INSTALLER_NAME } from "$env/static/public";

export const downloadInstaller = () => {
	const link = document.createElement("a");
	link.href = "/releases/latest/glimmr-setup.exe";
	link.download = PUBLIC_INSTALLER_NAME;
	link.style.display = "none";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
