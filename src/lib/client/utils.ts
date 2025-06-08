import { PUBLIC_INSTALLER_NAME, PUBLIC_MICROSOFT_STORE_PRODUCT_ID } from "$env/static/public";
import { analytics } from "$lib/client/analytics";

const trackDownload = (platform: string, version: string) => {
	analytics.track("download", { platform, version });
};

const openLink = (href: string, download?: string) => {
	const link = document.createElement("a");
	link.href = href;
	if (download) link.download = download;
	link.style.display = "none";
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const downloadInstaller = () => {
	const url = "/releases/latest/glimmr-setup.exe";
	trackDownload("windows", "latest");
	openLink(url, PUBLIC_INSTALLER_NAME);
};

export const downloadMicrosoftStore = () => {
	const url = `ms-windows-store://pdp/?productid=${PUBLIC_MICROSOFT_STORE_PRODUCT_ID}`;
	trackDownload("windows", "ms-store");
	openLink(url);
};
