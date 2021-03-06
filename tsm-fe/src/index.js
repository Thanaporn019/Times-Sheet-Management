// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import { BrowserRouter } from 'react-router-dom'

// const AppWithRouter = () => (
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )

// ReactDOM.render(<AppWithRouter />, document.getElementById('root'))
// reportWebVitals();
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { HashRouter } from 'react-router-dom'
const store = createStore(

  applyMiddleware(ReduxThunk)
)
ReactDOM.render(

  <Provider store={store}>
<HashRouter>
    <App/>
    </HashRouter>
    </Provider>,
    document.getElementById('root'))
     reportWebVitals();