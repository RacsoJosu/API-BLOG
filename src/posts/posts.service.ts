import { Injectable } from '@nestjs/common';
import {Post} from './post.entity'; 
import { InjectRepository  } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createPostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class PostsService {


    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private authorsService: AuthorsService) {}

    async findAll(): Promise<Post[]>{
        return await this.postsRepository.find()
        
    }
    async findAllByAuthor(id: number): Promise<Post[]>{
        return await this.postsRepository.find({
            where:{
                authorId: id
            }
        })
        
    }

    async createPost(post:createPostInput) : Promise<Post> {
        const newPost = this.postsRepository.create(post);
        return this.postsRepository.save(newPost);
    }

    async findProductById ( id:number): Promise<Post>{
        return this.postsRepository.findOne({
            where: {
                id
            }
        })

    }

    async getAuthor(id:number): Promise<Author>{
        return this.authorsService.findOne(id)
    }

}
