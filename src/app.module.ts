import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import {GraphQLModule} from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import { join } from 'path';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthorsModule } from './authors/authors.module';












@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')

    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: 'database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    PostsModule,
    AuthorsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
