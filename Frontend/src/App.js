import './App.css';
import { BrowserRouter as Router, Route, /*Link*/ } from 'react-router-dom';
import TodoList from './components/TodoList';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path='/' component={LoginForm} />
        <Route exact path='/signup' component={SignupForm} />
        <Route path='/todo-list' component={TodoList} />
      </Router>
    </div>
  );
}

export default App;
