import React, { Component } from 'react'
import MenuBar from './components/MenuBar'
import CardArray from './components/CardArray'
import QueryBox from './components/QueryBox'
import Preloader from './components/Preloader'
import fetchStatus from './helpers/fetchStatus'
import layouts from './helpers/layouts'
import '../css/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      imageUrls: [],
      imageLoaded: {},
      isAllLoaded: false,
      canLoad: false,
      fetchStatus: fetchStatus.ok,
      longWait: false,
      hideQueryBox: true,
      layout: 'medium',
      numPairs: 9,
      query: '',
      popularSearches: null
    }

    this.serverAddress = null
    this.myCardArray = React.createRef()

    this.fetchSearch = this.fetchSearch.bind(this)
    this.fetchSearchStats = this.fetchSearchStats.bind(this)
    this.setLongWait = this.setLongWait.bind(this)
    this.changeLayout = this.changeLayout.bind(this)
    this.handleQueryToggle = this.handleQueryToggle.bind(this)
    this.querySubmitCommon = this.querySubmitCommon.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this)
    this.handleChipClick = this.handleChipClick.bind(this)
    this.handleTrendingClick = this.handleTrendingClick.bind(this)
    this.handleQueryClear = this.handleQueryClear.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.handleWindowResize = this.handleWindowResize.bind(this)
  }

  componentWillMount() {
    this.changeLayout(this.state.layout)
  }

  componentDidMount() {
    this.serverAddress = process.env.REACT_APP_SERVER
    this.fetchSearchStats()

    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('orientationchange', this.handleWindowResize)
  }

  componentDidUpdate() {
    let keys = Object.keys(this.state.imageLoaded)
    let done = null

    if (keys.length > 0) {
      done = true

      keys.forEach(key => {
        done &= this.state.imageLoaded[key]
      })
    } else {
      done = false
    }

    if (!this.state.isAllLoaded && done) {
      console.log("All images loaded!")
      this.setState({ 
        isAllLoaded: true,
        hideQueryBox: true,
        fetchStatus: fetchStatus.ok
      })

      // refresh search stats
      this.fetchSearchStats()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('orientationchange', this.handleWindowResize)
  }

  handleQueryToggle() {
    this.setState({ hideQueryBox: !this.state.hideQueryBox })
  }

  handleQueryChange(event) {
    this.setState({
      query: event.target.value,
      fetchStatus: fetchStatus.ok
    })
  }

  querySubmitCommon(query) {
    this.myCardArray.current.resetCards()
    this.fetchSearch(query)
    setTimeout(this.setLongWait, 3000)
    
    this.setState({
      canLoad: true,
      isAllLoaded: false,
      imageLoaded: {},
      fetchStatus: fetchStatus.pending,
      longWait: false
    })
  }

  handleQuerySubmit(event) {
    if (event.keyCode === 13) {
      this.querySubmitCommon(this.state.query)
    }
  }

  handleChipClick(query) {
    this.setState({ query: query })
    this.querySubmitCommon(query)
  }

  handleTrendingClick() {
    this.handleQueryClear()
    this.myCardArray.current.resetCards()
    this.fetchTrending()
    setTimeout(this.setLongWait, 3000)
    
    this.setState({
      canLoad: true,
      isAllLoaded: false,
      imageLoaded: {},
      fetchStatus: fetchStatus.pending,
      longWait: false
    })
  }

  handleQueryClear() {
    this.setState({ query: '' })
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
    const cardGap = parseInt(htmlStyles.getPropertyValue('--card-gap'), 10)
    const numCols = parseInt(htmlStyles.getPropertyValue('--num-cols'), 10)
    const numRows = parseInt(htmlStyles.getPropertyValue('--num-rows'), 10)
    const menuBarHeight = parseInt(htmlStyles.getPropertyValue('--menubar-height'), 10)
    const appPadding = parseInt(htmlStyles.getPropertyValue('--app-padding'), 10)

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

  changeLayout(layout) {
    const doc = document
    const elem = doc.documentElement

    if (layout in layouts) {
      const newRows = layouts[layout].rows
      const newCols = layouts[layout].columns

      elem.style.setProperty('--num-rows', newRows)
      elem.style.setProperty('--num-cols', newCols)
      this.setState({ numPairs: (newRows * newCols / 2) })
    } else {
      elem.style.setProperty('--num-rows', 3)
      elem.style.setProperty('--num-cols', 6)
      this.setState({ numPairs: 9 })
    }

    // recalculate card sizes
    this.handleWindowResize()
  }

  setLongWait() {
    this.setState({ longWait: true })
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

  fetchCommon(data) {
    // Fetch errors on server-side
    if (data.status === fetchStatus.giphyError ||
        data.status === fetchStatus.redisError) {
      this.setState({
        isAllLoaded: false,
        fetchStatus: data.status
      })
    } 
    
    // Not enough gifs
    else if (data.gifs.length < this.state.numPairs) {
      this.setState({
        isAllLoaded: false,
        fetchStatus: fetchStatus.insufficientGifs
      })
    } 
    
    // ok
    else {
      this.resetImageLoadState(data.gifs)
      this.setState({
        imageUrls: data.gifs
      })
    }
  }

  fetchSearch(query) {
    fetch(`${this.serverAddress}/gifme/search/json?query=${query}&limit=${this.state.numPairs}`)
    .then(res => res.json())
    .then(data => this.fetchCommon(data),

    error => {
      this.setState({
        isAllLoaded: false,
        fetchStatus: fetchStatus.serverError
      })
    }
  )}

  fetchTrending() {
    fetch(`${this.serverAddress}/gifme/trending/json?limit=${this.state.numPairs}`)
    .then(res => res.json())
    .then(data => this.fetchCommon(data),

    error => {
      this.setState({
        isAllLoaded: false,
        fetchStatus: fetchStatus.genericError
      })
    }
  )}

  fetchSearchStats() {
    fetch(`${this.serverAddress}/searchstats/popular`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        popularSearches: data
      })
    },

    error => {
      // Retry 
      setTimeout(this.fetchSearchStats, 6000)
    })
  }

  render() {
    return (
      <div className="app">
        <QueryBox
          query={this.state.query}
          isHidden={this.state.hideQueryBox}
          imagesFinished={this.state.canLoad && !this.state.isAllLoaded}
          imageLoaded={this.state.imageLoaded}
          fetchStatus={this.state.fetchStatus}
          longWait={this.state.longWait}
          popularSearches={this.state.popularSearches}
          handleChange={this.handleQueryChange}
          handleSubmit={this.handleQuerySubmit}
          handleChipClick={this.handleChipClick}
          handleTrendingClick={this.handleTrendingClick}
          handleQueryToggle={this.handleQueryToggle}
          handleQueryClear={this.handleQueryClear}
        />
        <MenuBar
          handleQueryToggle={this.handleQueryToggle}
        />
        <Preloader
          canLoad={this.state.canLoad}
          imageUrls={this.state.imageUrls}
          handleImageLoad={this.handleImageLoad}
        />
        <CardArray
          ref={this.myCardArray}
          isAllLoaded={this.state.isAllLoaded}
          fetchStatus={this.state.fetchStatus}
          imageUrls={this.state.imageUrls}
          numPairs={this.state.numPairs}
        />
      </div>
    )
  }
}

export default App;
