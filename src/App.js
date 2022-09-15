import React, { useEffect, useState } from "react";
import './App.css';
import News from "./news";
import { Form, Button } from 'react-bootstrap';

const App = () => {

  const APP_KEY = "0b1969a5e6c9493b85997497a5804d26"

  const [search, setSearch] = useState("");           // refers to the value entered by the user in the search-box
  const [newslog, setNewslog] = useState([]);           // refers to the data received from the API
  const [topic, setTopic] = useState("");             // refers to the "topic" selected by user from drop down menu

  const getNews = async () => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&q=${search}&category=${topic}&apiKey=${APP_KEY}`);
    const data = await response.json();
    setNewslog(data.articles);
  }

  useEffect(() => {
    getNews();
  }, [topic])

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    getNews();
  }
  const updateTopic = e => {
    (e.target.value==="none")? setTopic("") : setTopic(e.target.value);
  }

  return (
    <div className="App">
      <h1 id="main-heading">News App</h1>
      <br/>
      <br/>
      <Form onSubmit={getSearch}>
        <Form.Group>
          <Form.Label className="label">Search: </Form.Label>
          <Form.Control type="text" placeholder="Type keywords.." value={search} onChange={updateSearch}/>
        </Form.Group>
        <br></br>
        <Button variant="outline-primary" type="submit">
          Search!
        </Button>
        <br/>
        <br/>
        <Form.Group>
          <Form.Label className="label">Filter</Form.Label>
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