
import { createRoot } from 'react-dom/client'
import './App.css'
import MainLayout from './components/layaout/MainLayout';

  import { HashRouter } from "react-router-dom";
createRoot(document.getElementById('root')!).render(

<HashRouter>
   <MainLayout/>
</HashRouter>

)
