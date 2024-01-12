import React, { Component } from 'react'
import Navbar from './components/Navbar';
import './App.css';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
  state = {
    progress:0
  }
  apiKey = process.env.REACT_APP_API_KEY;
  setProgress = (progress)=>{
    console.log(this.apiKey);
    this.setState({progress:progress})
  }
  render() {
    return (
      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<News key="general" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="general" />} />
          <Route exact path='/business' element={<News key="business" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="business" />} />
          <Route exact path='/sports' element={<News key="sports" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="sports" />} />
          <Route exact path='/health' element={<News key="health" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="health" />} />
          <Route exact path='/science' element={<News key="science" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="science" />} />
          <Route exact path='/entertainment' element={<News key="entertainment" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="entertainment" />} />
          <Route exact path='/technology' element={<News key="technology" apiKey={this.apiKey} setProgress={this.setProgress} country="in" pageSize={6} category="technology" />} />
        </Routes>
      </BrowserRouter>
    )
  }
}