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
      imageLoaded: [],
      isAllLoaded: false,
      canLoad: false,
      loadError: null,
      numPairs: 9,
      query: 'yoshi'
    }

    this.serverAddress = null
    this.myCardArray = React.createRef()
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
  }

  componentDidMount() {
    this.serverAddress = process.env.REACT_APP_SERVER
    this.resetImageLoadState()

    if (this.state.canLoad) {
      this.fetchGifs()
    }
  }

  componentDidUpdate() {
    console.log(this.state.isAllLoaded) 
    console.dir(this.state.imageLoaded)
    if (!this.state.isAllLoaded && !this.state.imageLoaded.includes(false)) {
      console.log("All images loaded!")
      this.setState({ 
        isAllLoaded: true
      })
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
      this.resetImageLoadState()
      this.fetchGifs()
      this.setState({
        canLoad: true,
        isAllLoaded: false
      })
    }
  }

  handleImageLoad(index, event) {
    let newImageLoaded = this.state.imageLoaded
    newImageLoaded[index] = true

    console.log("Image loaded!")
    this.setState({ imageLoaded: newImageLoaded})
  }

  resetImageLoadState() {
    let newImageLoaded = []

    for (let i = 0; i < this.state.numPairs; i++) {
      newImageLoaded.push(false)
    }

    this.setState({
      imageLoaded: newImageLoaded,
      isAllLoaded: false
    })
  }

  fetchGifs() {
    fetch(`${this.serverAddress}/gifme/json?query=${this.state.query}&limit=${this.state.numPairs}`)
    .then(res => res.json())
    .then(data => {
      if (data.length < this.state.numPairs) {
        this.setState({
          isAllLoaded: false,
          loadError: "Query did not return enough GIFs"
        })
      } else {
        this.resetImageLoadState()
        this.setState({
          imageUrls: data
        })
      }
    },

    error => {
      console.dir(error)
      this.setState({
        isAllLoaded: false,
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
          isAllLoaded={this.state.isAllLoaded}
          loadError={this.state.loadError}
          imageUrls={this.state.imageUrls}
          numPairs={this.state.numPairs}
          handleImageLoad={this.handleImageLoad}
        />
      </div>
    );
  }
}

export default App;
