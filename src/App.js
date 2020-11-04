import { Result } from 'antd';
import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchReturnValues: [],
      searchTerms: ''
    }
  }

  
  useApi = (e) => {
    e.preventDefault();

    this.setState({
      searchReturnValues: []
    });
    const pointerToThis = this;
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI('78b9d599c4f94f8fa3afb1a5458928d6',{ corsProxyUrl: 'https://cors-anywhere.herokuapp.com/' });

    newsapi.v2.topHeadlines({
      q: this.state.searchTerms,
      category: 'business',
      language: 'en',
      country: 'us'
    }).then(response => {
        // console.log(response);
        for(var key in response.articles){
          pointerToThis.state.searchReturnValues.push({
            articleResultFullUrl: response.articles[key].url,
            articleResultPageTitle: response.articles[key].title,
            articleResultPageDescription: response.articles[key].description,
            articleResultImageUrl: response.articles[key].urlToImage
          }); 
        }

        
      }
    )
    newsapi.v2.topHeadlines({
      q: this.state.searchTerms,
      category: 'sports', 
      language: 'en',
      country: 'us'
    }).then(response => {
      // console.log(response);
      for(var key2 in response.articles){
        pointerToThis.state.searchReturnValues.push({
          articleResultFullUrl: response.articles[key2].url,
          articleResultPageTitle: response.articles[key2].title,
          articleResultPageDescription: response.articles[key2].description,
          articleResultImageUrl: response.articles[key2].urlToImage
        }); 
      }

      
    }
    )
    newsapi.v2.topHeadlines({
      q: this.state.searchTerms,
      category: 'technology',
      language: 'en',
      country: 'us'
    }).then(response => {
        // console.log(response);
        for(var key3 in response.articles){
          pointerToThis.state.searchReturnValues.push({
            articleResultFullUrl: response.articles[key3].url,
            articleResultPageTitle: response.articles[key3].title,
            articleResultPageDescription: response.articles[key3].description,
            articleResultImageUrl: response.articles[key3].urlToImage
          }); 
        }

        
      }
    )
    
}

     

  changeSearchTerms = (e) => {
    this.setState({
      searchTerms : e.target.value
    });
  }
 
  

  render(){
    let searchResult = [];
    console.log(this.state.searchReturnValues)
    for (var key4 in this.state.searchReturnValues) {
      searchResult.push(
        <div className="searchResultDiv" key={key4}>
          <img className = 'image' src={this.state.searchReturnValues[key4].articleResultImageUrl} alt="ImageNotAvaliable" height ='250' width = '350'></img>
          <h3><a style={{display: "table-cell"}} href={this.state.searchReturnValues[key4].articleResultFullUrl} target="_blank" rel="noopener noreferrer" >{this.state.searchReturnValues[key4].articleResultPageTitle}
          <p className="description" dangerouslySetInnerHTML={{__html: this.state.searchReturnValues[key4].articleResultPageDescription}}></p>
          
          </a></h3>

        </div>
      );
    }

    return (
      <div className="App">
        <h1 style = {{textAllig:'left'}}>Comence the Search!</h1>
        <form action="">
          <input type="text" value={this.state.searchTerms || ''} onChange={this.changeSearchTerms} placeholder='Search News Articles' />
          <button type='submit' onClick={this.useApi}>Search</button>
        </form>
        
        {searchResult.length>0?searchResult: <h1>No results yet...</h1>}
      </div>
    );
  }
}
  

 

 
export default App;
