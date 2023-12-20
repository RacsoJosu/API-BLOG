import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import {Author} from 'src/authors/entities/author.entity'
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class AuthorsService {

  constructor(@InjectRepository(Author) private authorRepository: Repository<Author>,
  @Inject(forwardRef(() => PostsService))
  private readonly postService : PostsService){}



  create(createAuthorInput: CreateAuthorInput)  : Promise<Author> {
    const author = this.authorRepository.create(createAuthorInput)
    return this.authorRepository.save(author);
  }

  findAll():  Promise<Author[]> {
    return this.authorRepository.find();
  }

  findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne({
      where:{
        id,
      }
    });
  }

  async getPosts(id: number): Promise<Post[]> {
    try {
      const posts = await this.postService.findAllByAuthor(id);
      return posts ; 
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      return [];
    }
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
