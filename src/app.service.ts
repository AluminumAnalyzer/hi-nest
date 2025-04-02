import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Nest-JS!';
  }
  sayHello(): string {
    return 'Hello eveyone!';
  }
  sayHelloPost(): string {
    return 'Hello eveyone!';
  }
}
