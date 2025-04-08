import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll() {
    return this.moviesService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') MovieId: number): Movie {
    return this.moviesService.getOne(MovieId);
  }

  @Post()
  create(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  @Delete('/:id')
  remove(@Param('id') MovieId: number) {
    return this.moviesService.deleteOne(MovieId);
  }

  @Patch('/:id')
  update(@Param('id') MovieId: number, @Body() updateData: CreateMovieDto) {
    return this.moviesService.update(MovieId, updateData);
  }
}
