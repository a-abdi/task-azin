import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export class User {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    credit: string;

    @Prop()
    profilePicture: string

    @Prop()
    phoneNumber: string[];
}
