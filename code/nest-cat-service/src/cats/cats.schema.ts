import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true, //db에서 생성, 업데이트 때마다 timestamp를 찍는 것
};

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string; //email

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string; //name

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string; //password

  @Prop()
  @IsString()
  imgUrl: string; //img

  readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat); //실제 CatSchema

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
