import { shallowMount } from "@vue/test-utils";
import PokemonPicture from '@/components/PokemonPicture'

describe('Purebas en el componente PokemonOptions', () => { 

    test('debe de hacer match con el snapshot', () => { 

        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: false
            }
        });

        expect(wrapper.html()).toMatchSnapshot();

    });

    test('debe de mostrar la imagen oculta y el pokemon 100', () => { 
        
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 100,
                showPokemon: false
            }
        });

        const img = wrapper.find('img');
        const {src, alt, class:clase} = img.attributes();
        
        expect(src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
        expect(clase).toBe('hidden-pokemon')

    });

    test('debe de mostrar el pokemon si showPokemon esta en true', () => { 
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId: 1,
                showPokemon: true
            }
        });

        const img = wrapper.find('img');
        const { src, alt, class: clase } = img.attributes();

        expect(clase).toBe('fade-in')
    });

});