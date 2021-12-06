import { Movie } from "../entity/Movie";
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput {
    @Field()
    title: string

    @Field(() => Int)
    minutes: number
}

@InputType()
class MovieUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => Int, { nullable: true })
    minutes?: number;
}

@Resolver()
export class MovieResolver {

    @Mutation(() => Movie)
    async createMovie(
        @Arg("options", () => MovieInput) options: MovieInput
    ) {
        //  console.log(title)
        const movie = await Movie.create(options).save();
        return movie
    }

    @Mutation(() => Boolean)
    async updateMovie(
        @Arg("id") id: number,
        @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
    ) {
        await Movie.update({ id }, input)
        return true

    }

    @Query(() => [Movie])
    movies() {
        return Movie.find()
    }


    @Mutation(() => Boolean)
    async deleteMovie(@Arg("Id", () => Int) id: number) {
        await Movie.delete({ id })
        return true

    }


}

// mutation {
//     createMovie (options:{
//       minutes:66,
//       title:'tommy'
//     })
//   }
  
  
//   {
//     movies {
//       id,
//         title,
//       minutes
//     }
//   }
  
//   mutation {
//     updateMovie(id:1,input :{
//       title:"bob v2",
//       minutes:7
//     })
//   }
  
//   mutation {
//     deleteMovie(Id:1)
//   }
  