import React, { Component } from 'react'
import MenuBar from './components/MenuBar'
import CardArray from './components/CardArray'
import QueryBox from './components/QueryBox'
//import imageData from './helpers/imageData'
import '../css/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      imageUrls: [],
      isLoaded: false,
      canLoad: false,
      loadError: null,
      numPairs: 9,
      query: 'yoshi'
    }

    this.serverAddress = null
    this.myCardArray = React.createRef()
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this)
  }

  componentDidMount() {
    this.serverAddress = process.env.REACT_APP_SERVER

    if (this.state.canLoad) {
      this.fetchGifs()
    }
  }

  handleQueryChange(event) {
    this.setState({
      query: event.target.value
    })
  }

  handleQuerySubmit(event) {
    if (event.keyCode === 13) {
      this.myCardArray.current.resetCards()
      this.fetchGifs()
      this.setState({canLoad: true})
    }
  }

  fetchGifs() {
    fetch(`${this.serverAddress}/gifme/json?query=${this.state.query}&limit=${this.state.numPairs}`)
    .then(res => res.json())
    .then(data => {
      if (data.length < this.state.numPairs) {
        this.setState({
          isLoaded: false,
          loadError: "Query did not return enough GIFs"
        })
      } else {
        this.setState({
          imageUrls: data,
          isLoaded: true,
          loadError: null
        })
      }
    },

    error => {
      console.dir(error)
      this.setState({
        isLoaded: false,
        loadError: error.message
      })
    }
  )}

  render() {
    return (
      <div className="App">
        <QueryBox
          query={this.state.query}
          handleChange={this.handleQueryChange}
          handleSubmit={this.handleQuerySubmit}
        />
        <MenuBar/>
        <CardArray
          ref={this.myCardArray}
          isLoaded={this.state.isLoaded}
          loadError={this.state.loadError}
          imageUrls={this.state.imageUrls}
          numPairs={this.state.numPairs}
        />
      </div>
    );
  }
}

export default App;
