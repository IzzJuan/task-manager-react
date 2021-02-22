import './App.css';
import { BrowserRouter as Router, Route, Switch, /*Link*/ } from 'react-router-dom';
import TodoList from './components/TodoList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/signup' component={SignupForm} />
          <Route path='/todo-list' component={TodoList} />
          <Route exact path='/' component={LoginForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
