<template>

    <h1 v-if="!pokemon">Espere por favor.....</h1>

    <div v-else>
        <h1>¿Quién es este pokemón?</h1>

        <!-- todo picture -->
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
        <!-- todo opciones -->
        <PokemonOptions 
            :pokemons="pokemonArr"
            @selection="checkAnswer"
        />
    </div>

    <template v-if="showAnswer">
        <h2>{{message}}</h2>
        <button @click="nuevoJuego">Nuevo juego</button>
    </template>
</template>

<script>

    import PokemonOptions from '@/components/PokemonOptions.vue';
    import PokemonPicture from '@/components/PokemonPicture.vue';
    
    import getPokemonOptions from '@/helpers/getPokemonOptions'


    export default {
        components: {
            PokemonOptions,
            PokemonPicture,
        },

        data() {
            return {
                pokemonArr: [],
                pokemon: null,
                showPokemon: false,
                showAnswer: false,
                message: '',
            }
        },

        methods: {
            async mixPokemonArray() {
                this.pokemonArr = await getPokemonOptions();
                
                const rndInt = Math.floor(Math.random() * 4);
                this.pokemon = this.pokemonArr[rndInt];
            },
            checkAnswer(pokemonId) {
                this.showPokemon = true;
                this.message = pokemonId === this.pokemon.id 
                                    ? 'Felicidades ese es el pokemon'
                                    : `Oops, el pokemon es ${this.pokemon.name}` 
                this.showAnswer = true;
            },
            nuevoJuego() {
                this.mixPokemonArray();
                this.showAnswer = false;
                this.showPokemon = false;
                this.pokemon = null;
            }
        },

        mounted() {
            this.mixPokemonArray();
        }
    }
</script>

