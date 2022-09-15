import React, { useEffect, useState } from "react";
import './App.css';
import News from "./news";
import { Form, Button } from 'react-bootstrap';

const App = () => {

  const APP_KEY = "0b1969a5e6c9493b85997497a5804d26"

  const [search, setSearch] = useState("");           // refers to the value entered by the user in the search-box
  const [query, setQuery] = useState("");             // refers to the value that gets passed to the API
  const [newslog, setNewss] = useState([]);           // refers to the data received from the API
  const [topic, setTopic] = useState("");             // refers to the "topic" selected by user from drop down menu

/* */
  const getNews = async () => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&q=${query}&category=${topic}&apiKey=${APP_KEY}`);
    const data = await response.json();
    setNewss(data.articles);
  }

  useEffect(() => {
    getNews();
  }, []);

  useEffect(() => {
    if (query === "") {
      getNews();
    }
  }, [query]

  )
  useEffect(() => {
    if (query !== "") {
      getNews();
    }

  }, [query])

  useEffect(() => {

    getNews();

  }, [topic])
  
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    //setSearch("");
  }
  const updateTopic = e => {
    if (e.target.value === "none") {
      setTopic("");
    }
    else {
      setTopic(e.target.value);
    }

  }

  return (
    <div className="App">
      <br></br>
      <br></br>
      <Form onSubmit={getSearch}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="label">Search something</Form.Label>
          <Form.Control type="text" placeholder="Type keywords.." value={search} onChange={updateSearch} />
        </Form.Group>
        <br></br>
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
        <br></br>
        <br></br>
        <Form.Group>
          <Form.Label className="label">Choose a topic</Form.Label>
          <Form.Select onChange={updateTopic} defaultValue="none" >
            <option value="none">none</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="general">General</option>
          </Form.Select>
        </Form.Group>
      </Form>
      <h1> NEWS headlines from India</h1>
      <div id="main-content">
        {newslog?.map(news => (
          <News title={news.title} author={news.author} description={news.description} url={news.url} />
        ))

        }
      </div>
    </div>
  );
}

export default App;
/* 
    <div className="App">
      <br></br>
      <form  onSubmit={getSearch} className="search-form">
        <input id="search-bar" type="text" value={search} onChange={updateSearch} placeholder="Enter any keyword" />
        <button id="search-button" type="submit">Search</button>
        <label for="topics">Select a topic: </label>
        <select name="topics" onChange={updateTopic}>
          <option value="none" selected>none</option>
          <option value="health">health</option>
          <option value="science">science</option>
          <option value="business">business</option>
          <option value="entertainment">entertainment</option>
          <option value="technology">technology</option>
          <option value="sports">sports</option>
          <option value="general">general</option>
        </select>
      </form>
      <h1> NEWS headlines from India</h1>
      {newslog?.map(news => (
        <News title={news.title} author={news.author} description={news.description} url = {news.url}/>
      )) 

      }
    </div>
*/