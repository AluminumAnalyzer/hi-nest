import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  //   [
  //   {
  //     id: 1,
  //     title: 'The Shawshank Redemption',
  //     year: 1994,
  //     genres: ['Drama'],
  //   },
  //   {
  //     id: 2,
  //     title: 'The Godfather',
  //     year: 1972,
  //     genres: ['Drama', 'Crime'],
  //   },
  //   {
  //     id: 3,
  //     title: 'The Dark Knight',
  //     year: 2008,
  //     genres: ['Action', 'Crime', 'Drama'],
  //   },
  //   {
  //     id: 4,
  //     title: 'Pulp Fiction',
  //     year: 1994,
  //     genres: ['Crime', 'Drama'],
  //   },
  //   {
  //     id: 5,
  //     title: 'Forrest Gump',
  //     year: 1994,
  //     genres: ['Drama', 'Romance'],
  //   },
  // ];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    // check if the movie with the given id exists
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  deleteOne(id: number) {
    // check if the movie with the given id exists
    // const movieIndex = this.movies.findIndex(
    //   (movie) => movie.id === parseInt(id),
    // );
    // if (movieIndex === -1) {
    //   // throw new Error(`Movie with id ${id} not found`);
    //   return false;
    // }
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto): Movie {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
    const createdMovie = this.getOne(this.movies.length);
    return createdMovie;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({
      ...movie,
      ...updateData,
    });

    return this.getOne(id);
    //   const movieIndex = this.movies.findIndex(
    //     (movie) => movie.id === parseInt(id),
    //   );
    //   if (movieIndex === -1) {
    //     throw new NotFoundException(`Movie with id ${id} not found`);
    //   }
    //   this.movies[movieIndex] = {
    //     ...this.movies[movieIndex],
    //     ...updateData,
    //   };
  }
}
