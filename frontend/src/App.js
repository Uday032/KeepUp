import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {Container} from 'react-bootstrap'

import Index from './pages/Index'

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact component={Index}/>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
