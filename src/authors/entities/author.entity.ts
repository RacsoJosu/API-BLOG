import { ObjectType, Field, Int } from '@nestjs/graphql';

import {Post} from 'src/posts/post.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id : number;
  
  @Field()
  @Column()
  name: string ;

  @OneToMany(()=>Post, (post)=> post.author, {nullable: true})
  @Field(()=> [Post], {nullable: true})
  posts : Promise<Post[]>;  
}
