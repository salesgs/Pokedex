export const  pokeApi = {}
import  {Pokemon}  from "./pokemon-model.js";
function convertPokeApiDetailToPokemon(pokeDetail){
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;
  const types = pokemon.types = pokeDetail.types.map((typeSlot)=>typeSlot.type.name);
  const [type] =types;
  pokemon.types = types; 
  pokemon.type = type;
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
  .then((response)=>response.json()) //detalhes do pokemon
  .then(convertPokeApiDetailToPokemon)
}
pokeApi.getPokemons = (offset = 0,limit = 5) => {
  const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
  .then((response) => response.json())//conversão em JSON
  .then((jsonBody) => jsonBody.results) //todos os dados solicitados
  .then((pokemons)=>pokemons.map(pokeApi.getPokemonDetail)) //fetch dentro do map
  .then((detailRequests)=> Promise.all(detailRequests)) //Array Promisse
  .then((pokemonsDetails)=>pokemonsDetails)
}
