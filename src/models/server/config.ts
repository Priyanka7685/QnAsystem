import env from "@/app/env";
import { Avatars , Client, Databases, Storage, Users } from "node-appwrite"

const client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) //Your API endpoint
    .setProject(env.appwrite.projectId) //your projectID
    .setKey(env.appwrite.apiKey) //Your secret API key
    ;

const databases = new Databases(client)
const avatars = new Avatars(client)
const storage = new Storage(client)
const users = new Users(client)

export { client, databases, users, avatars, storage }
