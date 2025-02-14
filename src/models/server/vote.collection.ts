import { Permission } from "node-appwrite";
import { db, VoteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {

    // Creating Collection
    await databases.createCollection(db, VoteCollection, VoteCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Vote Collection Created");


    // Creating Attributes
    await Promise.all([
        databases.createEnumAttribute(db, VoteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, VoteCollection, "typeId", 50, true),
        databases.createEnumAttribute(
            db,
            VoteCollection,
            "voteStatus",
            ["upvoted", "downvoted"],
            true
        ),
        databases.createStringAttribute(db, VoteCollection, "votedById", 50, true),
    ]);
    console.log("Vote Attributes Created");
}


