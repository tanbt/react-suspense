// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js
import {ErrorBoundary} from 'react-error-boundary'
import * as React from 'react'
import {PokemonDataView, fetchPokemon} from '../pokemon'

let pokemon
let pokemonError

// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
// 🐨 assign a pokemonPromise variable to a call to fetchPokemon('pikachu')
// 🐨 when the promise resolves, assign the "pokemon" variable to the resolved value
// 💰 For example: somePromise.then(resolvedValue => (someValue = resolvedValue))
const pokemonPromise = fetchPokemon('pikachu') // try a wrong name to see the error boundary
  .then(pokemonData => {
    pokemon = pokemonData
  })
  .catch(error => {
    pokemonError = error
  })

function PokemonInfo() {
  if (pokemonError) {
    throw pokemonError
  }

  // 🐨 if there's no pokemon yet, then throw the pokemonPromise
  // 💰 (no, for real. Like: `throw pokemonPromise`)
  if (!pokemon) {
    console.log('No pokemon yet')
    throw pokemonPromise
  }

  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <ErrorBoundary fallback={<div>Failed to load Pokemon</div>}>
          {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
          <React.Suspense fallback={<div>Loading animal...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
