import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store.js';
// import reportWebVitals from './reportWebVitals';

import './css/index.css';

//* Components
import './css/components/modal.css';
import './css/components/footer.css';
import './css/components/dateInput.css';
import './css/components/ratingStar.css';
import './css/components/numberInput.css';
import './css/components/breadCrumbs.css';
import './css/components/navbar/navBar.css';
import './css/components/passwordStrength.css';
import './css/components/navbar/brandLogo.css';
import './css/components/navbar/cartBadge.css';
import './css/components/navbar/secondary/secondaryBar.css';
import './css/components/navbar/secondary/navBarDropdown.css';
import './css/components/navbar/secondary/navBarUserSubmenu.css';
import './css/components/product/productList.css';
import './css/components/product/productCarousel.css';
import './css/components/product/productDescription.css';
import './css/components/loading/productDetailsLoading.css';

//* Pages
import './css/pages/cartPage.css';
import './css/pages/authPage.css';
import './css/pages/errorPage.css';
import './css/pages/profilePage.css';
import './css/pages/checkoutPage.css';
import './css/pages/productDetailsPage.css';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

// reportWebVitals(console.log);
