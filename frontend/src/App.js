import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {Container} from 'react-bootstrap'

import Index from './pages/Index'
import Follow from './pages/Follow'
import GetArticle from './pages/GetArticles'
import GetAuthors from './pages/GetAuthors'

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact component={Index}/>
            <Route path="/follow" exact component={Follow}/>
            <Route path="/getarticles" component={GetArticle}/>
            <Route path="/getauthors" component={GetAuthors}/>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
