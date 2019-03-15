import React, { Component } from 'reactn';
import ContentWithNavBar from './components/ContentWithNavBar';
import AddHotel from './components/AddHotel';
import ListHotels from './components/ListHotels';
import EditHotel from './components/EditHotel';
import SearchPage from './components/SearchPage';
import SearchResults from './components/SearchResults';
import HotelDetails from './components/HotelDetails';
import Confirm from './components/Confirm';
import CustomerDetails from './components/CustomerDetails';
import CreditDetails from './components/CreditDetails';
import Complete from './components/Complete';

import { BrowserRouter, Route, Switch } from "react-router-dom";


import './App.css';

class App extends Component {

  render() {
    const { language } = this.global;

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
                  <ContentWithNavBar {...props} title={language.listHotels}>
                    <ListHotels {...props} />
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/add-hotel/"
                render={ props => 
                  <ContentWithNavBar {...props} title={language.addHotel}>
                    <AddHotel {...props} />
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/edit-hotel/:id"
                render={ props => 
                  <ContentWithNavBar {...props} title={language.editHotel}>
                    <EditHotel {...props}/>
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/search-results/:arrive/:depart"
                render={ props =>
                  <ContentWithNavBar {...props} title={language.results}>
                    <SearchResults {...props}/>
                  </ContentWithNavBar>  
                }
              />
              <Route
                path="/hotel-details/:arrive/:depart/:id"
                render={props => 
                  <ContentWithNavBar {...props} title={language.selectRoom}>
                    <HotelDetails {...props}/>
                  </ContentWithNavBar>  
                }
              />
              <Route
                path="/confirm/:arrive/:depart/:id"
                render={ props => 
                  <ContentWithNavBar {...props} title={language.confirm}>
                    <Confirm {...props}/>
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/customer-details/"
                render={ props => 
                  <ContentWithNavBar {...props} title={language.customerDetails}>
                    <CustomerDetails {...props} />
                  </ContentWithNavBar>
                }
              />
              <Route
                path="/credit-details/"
                render={ props => 
                  <ContentWithNavBar {...props} title={language.paymentDetails}>
                    <CreditDetails {...props} />
                  </ContentWithNavBar>
                }
              />
              <Route 
                path="/completed"
                render={ props =>
                  <ContentWithNavBar {...props} >
                    <Complete {...props} />
                  </ContentWithNavBar>
                }
              />
              
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
