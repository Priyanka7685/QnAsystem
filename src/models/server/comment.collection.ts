import { Permission } from "node-appwrite"
import { db, commentCollection } from "../name"
import { databases } from "./config"


export default async function createCommentCollection() {
    // create coollection
    await databases.createCollection(db, commentCollection, commentCollection, [
        //permissions
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Comment collection  created");


    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
        databases.createStringAttribute(db, commentCollection, "authorId", 50, true),

    ])
    console.log("Comments Attributes created")

    
        
}