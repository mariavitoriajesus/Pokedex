const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const offset = 0
const limit = 10
const url = 'https://pokeapi.co/api/v2/pokemon?offset=$(offset)$limit=$(limit)'


function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <img src="${pokemon.photo}"
                 alt="${pokemon.name}">
        </div>
    </li>
`
}

function loadPokemonItens(offset, limit){
   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map(convertPokemonToLi).join('')
      pokemonList.innerHtml += newHtml
   })
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', () => {
   offset += limit
   const qtdRecordsNextPage = offset + limit
   if (qtdRecordsNextPage >= maxRecords) {
      const newLimit = maxRecords - offset
      loadPokemonItens(offset,newLimit)
      loadMoreButton.parentElement.removeChild(loadMoreButton)
   } else {
      loadPokemonItens(offset,limit)
   }
})


