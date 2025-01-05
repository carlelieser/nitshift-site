import { POSTMARK_SERVER_TOKEN } from "$env/static/private";
import * as postmark from "postmark";

export const postmarkClient = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);
