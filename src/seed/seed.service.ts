import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PokeApiResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SeedService {
  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon?limit=650';
  
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>,
    private readonly httpService: HttpService,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany();

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

    const pokemonToInsert: { name: string,  no: number}[] = [];

    data.results.forEach(async({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2 ];
      pokemonToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed executed';
  }
}
