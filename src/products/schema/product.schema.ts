
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
    @Prop()
    name: string;
    @Prop()
    price: number;
    @Prop({ default: 5 })
    star: number;
    @Prop()
    type: string;
    @Prop({ default: 0 })
    purchaseCount: number;

    @Prop()
    description: string;
    @Prop()
    img: string

}

export const ProductSchema = SchemaFactory.createForClass(Product);
