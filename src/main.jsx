import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import FullPost from './Componant/FullPost.jsx'
import CreatePost from './Componant/CreatePost.jsx'
import PdfList from './Componant/PdfList.jsx'

createRoot(document.getElementById('root')).render(

 <PdfList/>


)
