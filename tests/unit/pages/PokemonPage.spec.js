import { mount, shallowMount } from "@vue/test-utils";
import PokemonPage from '@/pages/PokemonPage'
import { pockemonMock } from "../mocks/pokemons.mock";

describe('Pruebas en la pagina PokemonPage', () => { 

    let wrapper;
    

    beforeEach(() => {
        wrapper = shallowMount(PokemonPage);
    })

    //esta prueba no ayuda mucho en este caso
    test('debe de hacer match con el snapshot ', () => { 
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('debe de llamar la funcion mixPokemonArray al montar', () => { 
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray')
        const wrapper = shallowMount(PokemonPage);
        
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    });

    test('debe de hacer match con el snapshot cuando carga la informacion', () => { 

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pockemonMock,
                    pokemon: pockemonMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        })

        expect(wrapper.html()).toMatchSnapshot();

    });

    test('debe de mostrar los componentes de PokemonPicture y PokemonOptions', () => { 

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pockemonMock,
                    pokemon: pockemonMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        });

        const pokemonPicture = wrapper.find('pokemon-picture-stub');
        const pokemonOptions = wrapper.find('pokemon-options-stub');
        //debe de existir los 2
        
        expect(pokemonPicture.exists()).toBeTruthy();
        expect(pokemonOptions.exists()).toBeTruthy();

        //pokemon picture atributo  pokemonId===1
        const { pokemonid, showPokemon } = pokemonPicture.attributes();
        expect( pokemonid ).toBe('1');
        //pokemonOptions attibute pokemons que exista
        const { pokemons } = pokemonOptions.attributes();
        expect(pokemons).not.toBe(undefined)
        
    });

    test('pruebas en la funcion checkAnswer', async() => { 

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pockemonMock,
                    pokemon: pockemonMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: '',
                }
            }
        });

        await wrapper.vm.checkAnswer(1);
        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBeTruthy();
        expect(wrapper.find('h2').text()).toBe('Felicidades ese es el pokemon')

        await wrapper.vm.checkAnswer(10);
        expect(wrapper.vm.message).toBe(`Oops, el pokemon es ${pockemonMock[0].name}`)

    });

});