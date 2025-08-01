import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PokeApiResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=50';
  
  constructor(private readonly httpService: HttpService) {}

  async executeSeed() {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PokeApiResponse>(`${ this.baseUrl }`)
        .pipe(
          catchError((error: AxiosError) => {
            console.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];

    });
    return data.results;
  }
}
