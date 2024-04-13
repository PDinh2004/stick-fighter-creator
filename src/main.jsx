import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import App from './App';
import CreateCharacter from './pages/CreateCharacter.jsx';
import Gallery from './pages/Gallery.jsx';
import EditCharacter from './pages/EditCharacter.jsx';
import CharacterPage from './pages/CharacterPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index={true} path='/' element={<App />} />
        <Route index={false} path='new' element={<CreateCharacter />} />
        <Route index={false} path='gallery' element={<Gallery />} />
        <Route index={false} path='gallery/:id/edit' element={<EditCharacter />} />
        <Route index={false} path='gallery/:id' element={<CharacterPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)