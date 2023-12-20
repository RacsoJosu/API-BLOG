import { Int, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { Post } from './post.entity';
import { createPostInput } from './dto/create-post.input';
import { Author } from 'src/authors/entities/author.entity';

@Resolver((of)=>Post)
export class PostsResolver {
    constructor (private postsService: PostsService){}

    @Query(()=> [Post])
    posts(){
        return this.postsService.findAll()
    }

    @Query(()=> Post)
    post(@Args('id', {type: ()=> Int}) id: number){
        return this.postsService.findProductById(id)
    }
    @ResolveField((returns) => Author)
    async author(@Parent() post:Post): Promise<Author>{

        return this.postsService.getAuthor(post.authorId);

    }


    @Mutation((returns)=>Post)
    createPost(@Args('postInput') postInput: createPostInput){
        return this.postsService.createPost(postInput)

    }


}
