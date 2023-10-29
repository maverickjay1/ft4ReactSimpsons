import React, { Component } from "react";
import axios from "axios";
import Character from "./components/Character";
import Spinner from "./components/Spinner";
import "./App.css";
import { sortCharacters } from "./utils/sort";

class App extends Component {
  state = { simpsons: [] };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=25`
      );
      //add a unique ID (most decent APIs will do this for you automatically)
      //also adding a liked property
      data.forEach((element) => {
        element.id = Math.round(Math.random() * 1000000);
        element.liked = false;
      });

      this.setState({ simpsons: data });
    } catch (e) {
      console.log("Looks like the API is down!");
    }
  }

  onLikeClick = (id) => {
    const simpsons = [...this.state.simpsons];
    const index = simpsons.findIndex((item) => item.id === id);
    simpsons[index].liked = !simpsons[index].liked;
    this.setState({ simpsons });
  };

  onDeleteClick = (id) => {
    const simpsons = [...this.state.simpsons];
    const index = simpsons.findIndex((item) => item.id === id);
    simpsons.splice(index, 1);
    this.setState({ simpsons });
  };

  onSortSelection = (e) => {
    this.setState({ sort: e.target.value });
  };

  render() {
    console.log(this.state);
    const { simpsons, sort } = this.state;

    if (!simpsons) {
      return (
        <div className="container">
          <Spinner />
        </div>
      );
    }

    //copy the Simpsons
    const _simpsons = [...simpsons];

    //call my sort logic
    sortCharacters(sort, _simpsons);

    return (
      <div className="container">
        <div className="controls">
          <label htmlFor="sort">Sort by</label>
          <select name="sort" id="sort" onChange={this.onSortSelection}>
            <option value="character-az">Character - A to Z</option>
            <option value="character-za">Character - Z to A</option>
            <option value="quote-az">Quote - A to Z</option>
            <option value="quote-za">Quote - Z to A</option>
          </select>
        </div>

        {_simpsons.map((character) => {
          return (
            <Character
              key={character.id}
              character={character}
              onLikeClick={this.onLikeClick}
              onDeleteClick={this.onDeleteClick}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
