
import {React , useEffect} from 'react';
import AOS from 'aos';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import '../src/assets/font/font-awesome.css'
import routes from './pages';
import Page404 from './pages/404';

import { MoralisProvider } from 'react-moralis';
function App() {

    useEffect(() => {
        AOS.init({
          duration : 2000
        }); 
      }, []);

    return (
        <><MoralisProvider
        appId="Ule3vKGffPvCeljv5O1GMC28a3A7OGebTRQZmDhG"
        serverUrl="https://e7e8lhnsdker.usemoralis.com:2053/server"
      >

            <Header />

            <Routes>

                {
                    routes.map((data,idx) => (
                        <Route key={idx} path={data.path} element={data.component} exact />
                    ))
                }

                <Route path='*' element={<Page404 />} />
            </Routes>

            <Footer /></MoralisProvider>
        </>
    );
}

export default App;
