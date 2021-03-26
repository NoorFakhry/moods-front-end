import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import WelcomePage from './UI-components/WelcomePage/WelcomePage';
import NavBar from './UI-components/NavBar/NavBar';
import DisplaySingleAlbumFromSearchResults from './UI-components/DisplaySingleAlbumFromSearchResults/DisplaySingleAlbumFromSearchResults';
import DisplaySingleAlbumFromRecommendations from './UI-components/DisplaySingleAlbumFromRecommendations/DisplaySingleAlbumFromRecommendations';
import './features/searchResults/searchResults';
import {useDispatch} from 'react-redux';
import {getNewAlbumsReleasesWhenAppStarts} from './features/recommendations/recommendations';
import SearchBar from './UI-components/SearchBar/SearchBar';
import Footer from './UI-components/Footer/Footer';
import DisplayAlbumsNewReleasesFromRecommendations from './UI-components/DisplayAlbumsNewReleasesFromRecommendations/DisplayAlbumsNewReleasesFromRecommendations';
import StreamingWidget from './UI-components/StreamingWidget/StreamingWidget';
import DisplayArtistFromSearchResults from './UI-components/DisplayArtistFromSearchResults/DisplayArtistFromSearchResults';
import DisplayAlbumsFromSearchResults from './UI-components/DisplayAlbumsFromSearchResults/DisplayAlbumsFromSearchResults';
import DisplayPlayListsFromSearchResults from './UI-components/DisplayPlaylistsFromSearchResults/DisplayPlaylistsFromSearchResults';
import DisplayTracksFromSearchResults from './UI-components/DisplayTracksFromSearchResults/DisplayTracksFromSearchResults';
import RecentReleasesHeader from './UI-components/Headers/RecentReleasesHeader/RecentReleasesHeader';

const App = () => {
  
  const location = useLocation();

  const hideNavBarOnWelocmePage = () => {
    if(location.pathname !== '/') {
      return (
        <NavBar />
      );
    }
  };

  const hideWidgetOnWelocmePage = () => {
    if(location.pathname !== '/') {
      return (
        <StreamingWidget />
      );
    }
  };

  const dispatch = useDispatch();
  
  // get albums new releases when the app starts
  dispatch(getNewAlbumsReleasesWhenAppStarts());

  return (
      <Router>
        <div className="App">
            <Switch>
              <Route exact path = "/" >
                <div className="welcomePage-container">
                  <WelcomePage/>
                </div>
              </Route>
              <Route exact path = "/homePage">
                <div className="main">
                  <div className="homepage-container">
                    <RecentReleasesHeader />
                    <DisplayAlbumsNewReleasesFromRecommendations />
                  </div>
                </div>
              </Route>
              <Route exact path = "/search" >
                <div className="main">
                  <div className="searchPage-container">
                    <SearchBar/>
                  </div>
                </div>
              </Route>
              <Route exact path = "/search/:query" >
                <div className="main">
                  <div className="searchResults-container">
                    <SearchBar />
                    <DisplayArtistFromSearchResults />
                    <DisplayAlbumsFromSearchResults />
                    <DisplayPlayListsFromSearchResults />
                    <DisplayTracksFromSearchResults />
                  </div>
                </div>
              </Route>
              <Route exact path = "/search/:query/album/:albumId">
              <div className="main">
                <div className="albumFromSearchResults-container">
                  <DisplaySingleAlbumFromSearchResults/>
                </div>
              </div>
              </Route>
              <Route exact path = "/albumsNewReleases/album/:albumId">
                <div className="main">
                  <div className="albumFromRecommendations-container">
                    <DisplaySingleAlbumFromRecommendations/>
                  </div>
                </div>
              </Route>
            </Switch>
            {hideNavBarOnWelocmePage()}
            {hideWidgetOnWelocmePage()}
            <Footer/>
        </div>
      </Router>
  );
}

export default App;