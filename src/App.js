import React, { Component } from 'react';
import ContentWithNavBar from './components/ContentWithNavBar';
import AddHotel from './components/AddHotel';
import ListHotels from './components/ListHotels';
import EditHotel from './components/EditHotel';
import SearchPage from './components/SearchPage';
import SearchResults from './components/SearchResults';
import Confirm from './components/Confirm';

import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
              <Route
                exact path="/"
                render={ props => 
                  <SearchPage {...props} />
                }
              />
              <Route 
                path="/list-hotels/"
                render={ props => 
                  <ContentWithNavBar {...props}>
                    <ListHotels {...props} />
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/add-hotel/"
                render={ props => 
                  <ContentWithNavBar {...props}>
                    <AddHotel {...props} />
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/edit-hotel/:id"
                render={ props => 
                  <ContentWithNavBar {...props} >
                    <EditHotel {...props}/>
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/search-results/:arrive/:depart"
                render={ props =>
                  <ContentWithNavBar {...props}>
                    <SearchResults {...props}/>
                  </ContentWithNavBar>  
                }
              />
              <Route
                path="/confirm/:arrive/:depart/:id"
                render={ props => 
                  <ContentWithNavBar {...props}>
                    <Confirm {...props}/>
                  </ContentWithNavBar>
                }
              />
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
