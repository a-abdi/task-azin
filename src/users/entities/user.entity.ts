import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema()
export class User {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    email: string;

    @Prop({select: false})
    password: string;

    @Prop()
    credit: number;

    @Prop()
    profilePicture: string;

    @Prop()
    phoneNumber: string[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User); 