import { createRoot } from 'react-dom/client'
import './index.css'
import { Layout } from './components/layout-area/layout/layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { interceptor } from './utils/interceptor'

interceptor.create();

createRoot(document.getElementById('root')!).render(
 
    <BrowserRouter>
      <Provider store={store}>
        <Layout />
      </Provider>
    </BrowserRouter>

)


// import { createRoot } from 'react-dom/client'
// import './index.css'
// import { Layout } from './components/layout-area/layout/layout'
// import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { store } from './redux/store'
// import interceptor from './utils/interceptor'
// import { ThemeProvider } from '@mui/material'
// import { appTheme } from './utils/app-theme'

// // Create interceptor:
// interceptor.create();

// createRoot(document.getElementById('root')!).render(
//     <ThemeProvider theme={appTheme}>
//         <BrowserRouter>
//             <Provider store={store}>
//                 <Layout />
//             </Provider>
//         </BrowserRouter>
//     </ThemeProvider>
// );