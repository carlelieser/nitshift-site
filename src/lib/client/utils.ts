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
	const url = "/releases/latest/nitshift-setup.exe";
	trackDownload("windows", "latest");
	openLink(url, "nitshift-setup.exe");
};
