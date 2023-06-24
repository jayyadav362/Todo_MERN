import './App.css';
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Todo from './components/Todo';
import Header from './components/Header';
function App() {
  return (
    <BrowserRouter>
    <div>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Todo/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
