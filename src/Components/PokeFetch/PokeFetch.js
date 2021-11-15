import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 10
    }
  }

  componentDidMount = () => {
    this.fetchPokemon();
    this.countdown();
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          timer: 10
        })
      })
      .catch((err) => console.log(err))
  }

  countdown = () => {
    let timer = setInterval(() => {
      if (this.state.timer > 0) {
        this.setState({
          timer: this.state.timer -1});
        } else if (this.state.timer === 0) {
          clearInterval(timer)
        }
      }, 1000)
  };

  render() {
    return (
      <div className={'wrapper'}>
        <h1 className={'heading'}>WHO'S THAT POKEMON?</h1>
        <button className={'start'} onClick={() => {this.fetchPokemon(); this.countdown();}}>Start!</button>
        <h3 className={'timer'} >Countdown<br/><br/>{this.state.timer}</h3>
        <div className={'pokeWrap'}>
          <img style={this.state.timer ===0 ? {filter: 'brightness(100%)'} : {filter: 'brightness(0%)'}} className={'pokeImg'} src={this.state.pokeSprite} alt="pokemon" />
          <h1 className={'pokeName'} style={this.state.timer === 0 ? {opacity: 100} : {opacity: 0}}>Its {this.state.pokeName}!</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;