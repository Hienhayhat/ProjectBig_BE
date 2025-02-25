import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    name: string;
    @Prop()
    email: string;
    @Prop()
    phonenumber: string;


}

export const UsersSchema = SchemaFactory.createForClass(Users)