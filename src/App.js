import {Switch, Route, Link} from 'react-router-dom';
import './App.css';
import Shop2 from './shop2';
import Shop from './shop';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jack Shop</h1>
        <div className='row'>
          <Link to='/'><button className='link'>Home</button></Link>
          <Link to='/second'><button className='link'>Second</button></Link>
        </div>
      </header>
      <Switch>
        <Route path='/' exact component={Shop} />
        <Route path='/second' exact component={Shop2} />
      </Switch>
    </div>
  );
}

export default App;
