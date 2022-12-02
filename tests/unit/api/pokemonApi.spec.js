import pokemonApi from "@/api/pokemonApi";

describe('Pruebas en la funcion pokemonApi', () => { 

    test('El baseURL de axios debe ser el del pokemon api', () => { 

        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon')

    });

});