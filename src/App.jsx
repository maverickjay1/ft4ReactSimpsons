import React, { Component } from "react";
import axios from "axios";
import Character from "./components/Character";
import Spinner from "./components/Spinner";
import "./App.css";

class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://thesimpsonsquoteapi.glitch.me/quotes?count=25`
      );

      //add a unique ID (most decent APIs will do this for you automatically)
      //also adding a liked property
      data.array.forEach((element) => {
        element.id = Math.round(Math.random() * 1000000);
        element.liked = false;
      });

      this.setState({ simpsons: data });
    } catch (e) {
      console.log("Looks like the API is down!");
    }
  }

  onLikeClick = (id) => {
    const simpsons = { ...this.state.simpsons };
    const index = simpsons.findIndex((item) => item.id === id);
    simpsons[index].liked = !simpsons[index].liked;
    this.setState({ simpsons });
  };

  onDeleteClick = (id) => {
    const simpsons = { ...this.state.simpsons };
    const index = simpsons.findIndex((item) => item.id === id);
    simpsons.splice(index);
    this.setState({ simpsons });
  };

  render() {
    console.log(this.state);
    const { simpsons } = this.state;

    if (!simpsons) {
      return (
        <div className="container">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="container">
        {simpsons.map((character) => {
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
