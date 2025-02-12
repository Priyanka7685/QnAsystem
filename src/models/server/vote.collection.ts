import { IndexType, Permission } from "node-appwrite"
import { db, voteCollection } from "../name"
import { databases } from "./config"


export default async function createVoteCollection() {
    // create coollection
    await databases.createCollection(db, voteCollection, voteCollection, [
        //permissions
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Vote collection  created");


    // creating attributes and indexes

    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        databases.createStringAttribute(db, voteCollection, "voteById", 50, true),

    ]);
    console.log("Votes Attributes created")

    
        
}