
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    star: number;
    @Prop()
    type: string;
    @Prop()
    purchaseCount: number;
    @Prop()
    description: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
