import React, { Component } from 'react'
import MenuBar from './components/MenuBar'
import CardArray from './components/CardArray'
import QueryBox from './components/QueryBox'
import Preloader from './components/Preloader'
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
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentWillMount() {
    this.handleWindowResize()
  }

  componentDidMount() {
    this.serverAddress = process.env.REACT_APP_SERVER

    if (this.state.canLoad) {
      this.fetchGifs()
    }

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('orientationchange', this.handleWindowResize)
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('orientationchange', this.handleWindowResize)
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

  handleWindowResize() {
    const w = window
    const doc = document
    const elem = doc.documentElement
    const body = doc.getElementsByTagName('body')[0]

    const width = w.innerWidth || elem.clientWidth || body.clientWidth
    const height = w.innerHeight || elem.clientHeight || body.clientHeight

    // Calculate card sizes
    const htmlStyles = w.getComputedStyle(doc.getElementsByTagName('html')[0])
    const cardGap = parseInt(htmlStyles.getPropertyValue('--card-gap'))
    const numCols = parseInt(htmlStyles.getPropertyValue('--num-cols'))
    const numRows = parseInt(htmlStyles.getPropertyValue('--num-rows'))
    const menuBarHeight = parseInt(htmlStyles.getPropertyValue('--menubar-height'))
    const appPadding = parseInt(htmlStyles.getPropertyValue('--app-padding'))

    const aspectRatio = width / height
    let idealCardHeight, idealCardWidth

    if (aspectRatio >= 1) {
      idealCardWidth = (width - appPadding*2) / numCols - cardGap*2;
      idealCardHeight = (height - menuBarHeight - appPadding*2) / numRows - cardGap*2;
    } else {
      idealCardWidth = (width - appPadding*2) / numRows - cardGap*2;
      idealCardHeight = (height - menuBarHeight - appPadding*2) / numCols - cardGap*2;     
    }

    elem.style.setProperty('--max-card-dim', Math.min(idealCardWidth, idealCardHeight).toString() + 'px')
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
