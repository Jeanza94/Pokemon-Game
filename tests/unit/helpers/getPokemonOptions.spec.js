import getPokemonOptions, {getPokemons, getPokemonsName} from '@/helpers/getPokemonOptions'
import { pockemonMock } from '../mocks/pokemons.mock';

describe('Pruebas en la función getPokemonOptions', () => { 

    test('debe de regresar un arreglo de numeros', () => { 

        const pokemons = getPokemons();
        expect(pokemons.length).toBe(650);
        expect(pokemons[0]).toBe(1);
        expect(pokemons[500]).toBe(501);
        expect(pokemons[649]).toBe(650);
    
    });

    test('debe de retornar un arreglo de 4 elementos con nombres de pokemons', async() => { 
        const arrPokemon = getPokemons().splice(0,4);
        const pokemons = await getPokemonsName(arrPokemon);
        
        expect(pokemons).toEqual(pockemonMock)
    });

    test('getPokemonOptions debe de retornar un arreglo mezclado', async() => { 
        const pokemons = await getPokemonOptions();
        
        expect(pokemons.length).toBe(4);
        expect(pokemons).toEqual([
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String) , 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number) 
            },
            { 
                name: expect.any(String), 
                id: expect.any(Number)
            },
        ])
    });

});