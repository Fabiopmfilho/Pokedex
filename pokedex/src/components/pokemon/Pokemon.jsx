import React, { useState } from "react";
import Axios from "axios";

import ThemeContext, { themes } from "../context/ThemeContext";
import './Pokemon.css'


const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '995b51',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
}

const Form = () => {
  const [theme, setTheme] = useState(themes.light)
  const [pokemon, setPokemon] = useState('')
  const [pokemonEnable, setPokemonEnable] = useState(false)
  const [pokemonType, setPokemonType] = useState([])
  const [pokemonData, setPokemonData] = useState({
    name: '',
    id: '',
    img: '',
    hp: '',
    attack: '',
    defense: '',
    special_attack: '',
    special_defense: '',
    speed: '',
  })

  const searchPokemon = () => {
    Axios.get(`http://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then((res) => {
        if (pokemon === '') {
          window.alert('Por favor, informe um pókemon')
        } else {
          
          setPokemonData(
            {
              name: pokemon,
              id: res.data.id,
              img: res.data.sprites.front_default,
              hp: res.data.stats[0].base_stat,
              attack: res.data.stats[1].base_stat,
              defense: res.data.stats[2].base_stat,
              special_attack: res.data.stats[3].base_stat,
              special_defense: res.data.stats[4].base_stat,
              speed: res.data.stats[5].base_stat,
            })
          setPokemonType((res.data.types.map(type => type.type.name)))

          setPokemonEnable(true)
        }
      })
  }

  const toggleTheme = () =>
    theme === themes.light
      ? setTheme(themes.dark)
      : setTheme(themes.light)

  return (
    <ThemeContext.Provider value={theme} className='App'>
      <div className='App'>
        <div className='titleSection'>
          <h1>PokeDex</h1>     
          <input
            type='text'
            placeholder='Procurar Pokemon'
            required
            onChange={
              (event) => (setPokemon(event.target.value))}
          />
          <button onClick={searchPokemon} className='search'><i className="fas fa-search"></i> Procurar</button>
          
          <button onClick={toggleTheme} className='switchTheme'>
            <i className="fas fa-adjust"></i>
          </button>

        </div>

        <div className='displaySection' style={theme} >
          {!pokemonEnable ? (
            <h1 className='black'>Escolha um Pókemon</h1>
          ) : (
            <>
              <h1 className='black'>
                {pokemonData.name
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))}
              </h1>
              <img src={pokemonData.img} alt='' />
              <h3>ID: {pokemonData.id}</h3>

              <h3>
                {pokemonType.map(type => (
                  <span
                    key={type}
                    style={{
                      backgroundColor: `#${TYPE_COLORS[type]}`,
                      color: 'white',
                      borderRadius: '25px',
                      padding: '5px 10px',
                    }}
                  >
                    {type
                      .toLowerCase()
                      .split(' ')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ')}
                  </span>
                ))}
              </h3>

              <div className='stats' >
                <h4>HP: {pokemonData.hp}</h4>
                <h4>Ataque: {pokemonData.attack}</h4>
                <h4>Defesa: {pokemonData.defense}</h4>
                <h4>Ataque Especial: {pokemonData.special_attack}</h4>
                <h4>Defesa Especial: {pokemonData.special_defense}</h4>
                <h4>Velocidade: {pokemonData.speed}</h4>
              </div>
            </>
          )}
        </div>
      </div>

    </ThemeContext.Provider>
  )
}

export default Form;