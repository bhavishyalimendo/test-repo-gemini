import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './pages/TodoList';
import CreateTodo from './pages/CreateTodo';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/list-todos" replace />} />
        <Route path="/list-todos" element={<TodoList />} />
        <Route path="/create-todos" element={<CreateTodo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
