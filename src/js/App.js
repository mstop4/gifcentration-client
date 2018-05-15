import React, { Component } from 'react'
import MenuBar from './components/MenuBar'
import CardArray from './components/CardArray'
import QueryBox from './components/QueryBox'
import Preloader from './components/Preloader'
//import imageData from './helpers/imageData'
import '../css/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      imageUrls: [],
      imageLoaded: {},
      isAllLoaded: false,
      canLoad: false,
      loadError: null,
      queryBoxDisabled: true,
      numPairs: 9,
      query: 'cat'
    }

    this.serverAddress = null
    this.myCardArray = React.createRef()

    this.handleToggleQuery = this.handleToggleQuery.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
  }

  componentDidMount() {
    this.serverAddress = process.env.REACT_APP_SERVER

    if (this.state.canLoad) {
      this.fetchGifs()
    }
  }

  componentDidUpdate() {
    let keys = Object.keys(this.state.imageLoaded)
    let done = null

    if (this.state.loadError) {
      done = true
    } else {
      if (keys.length > 0) {
        done = true

        keys.forEach(key => {
          done &= this.state.imageLoaded[key]
        })
      } else {
        done = false
      }
    }

    if (!this.state.isAllLoaded && done) {
      console.log("All images loaded!")
      this.setState({ 
        isAllLoaded: true,
        queryBoxDisabled: true
      })
    }
  }

  handleToggleQuery() {
    this.setState({ queryBoxDisabled: !this.state.queryBoxDisabled })
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
      this.setState({
        canLoad: true,
        isAllLoaded: false,
        imageLoaded: {}
      })
    }
  }

  handleImageLoad(event) {
    let newImageLoaded = this.state.imageLoaded
    newImageLoaded[event.target.src] = true

    this.setState({ imageLoaded: newImageLoaded})
  }

  resetImageLoadState(imgUrls) {
    let newImageLoaded = {}

    for (let i = 0; i < imgUrls.length; i++) {
      newImageLoaded[imgUrls[i].url] = false
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
        this.resetImageLoadState(data)
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
      <div className="app">
        <QueryBox
          query={this.state.query}
          isDisabled={this.state.queryBoxDisabled}
          showLoading={this.state.canLoad && !this.state.isAllLoaded}
          imageLoaded={this.state.imageLoaded}
          handleChange={this.handleQueryChange}
          handleSubmit={this.handleQuerySubmit}
          handleToggleQuery={this.handleToggleQuery}
        />
        <MenuBar
          handleToggleQuery={this.handleToggleQuery}
        />
        <Preloader
          canLoad={this.state.canLoad}
          imageUrls={this.state.imageUrls}
          handleImageLoad={this.handleImageLoad}
        />
        <CardArray
          ref={this.myCardArray}
          isAllLoaded={this.state.isAllLoaded}
          loadError={this.state.loadError}
          imageUrls={this.state.imageUrls}
          numPairs={this.state.numPairs}
        />
      </div>
    );
  }
}

export default App;
