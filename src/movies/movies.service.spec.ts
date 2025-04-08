import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Test'],
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id 999 not found');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Test'],
      });

      const allMoviesBeforeDelete = service.getAll();
      expect(allMoviesBeforeDelete.length).toEqual(1);

      service.deleteOne(1);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(allMoviesBeforeDelete.length - 1);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id 999 not found');
      }
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      const movieData = {
        title: 'Test Movie',
        year: 2023,
        genres: ['Test'],
      };

      service.create(movieData);

      const afterCreate = service.getAll().length;

      expect(afterCreate).toEqual(beforeCreate + 1);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2023,
        genres: ['Test'],
      });

      const updatedMovie = service.update(1, {
        title: 'Updated Movie',
        year: 2024,
        genres: ['Updated'],
      });

      expect(updatedMovie.title).toEqual('Updated Movie');
      expect(updatedMovie.year).toEqual(2024);
    });

    it('should throw 404 error', () => {
      try {
        service.update(999, {
          title: 'Updated Movie',
          year: 2024,
          genres: ['Updated'],
        });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with id 999 not found');
      }
    });
  });
});
