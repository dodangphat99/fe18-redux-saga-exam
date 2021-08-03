import { useSelector } from 'react-redux';
import { Router, Switch } from "react-router-dom";
import { ThemeProvider } from 'styled-components';
import { I18nextProvider } from 'react-i18next';

import history from './utils/history';
import i18n from './utils/locales/i18n';

import DefaultLayout from './layouts/DefaultLayout';
import AdminLayout from './layouts/AdminLayout';
import FullLayout from './layouts/FullLayout';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import NotFoundPage from './pages/NotFound';

import HomePage from './pages/user/Home';
import AboutPage from './pages/user/About';
import ProductDetailPage from './pages/user/ProductDetail';

import DashboardPage from './pages/admin/Dashboard';
import ProductListHocPage from './pages/admin/ProductListHoc';
import ProductListHookPage from './pages/admin/ProductListHook';
import ToDoListPage from './pages/admin/ToDoList';

import { lightTheme, darkTheme } from './styles/themes';

import './App.css';
import 'antd/dist/antd.css';

const THEME = {
  light: lightTheme,
  dark: darkTheme,
}

function App(props) {
  const { theme } = useSelector((state) => state.commonReducer);

  return (
    <ThemeProvider theme={THEME[theme]}>
      <I18nextProvider i18n={i18n}>
        <Router history={history}>
          <Switch>
            <DefaultLayout exact path="/" component={HomePage} />
            <DefaultLayout exact path="/about" component={AboutPage} />
            <DefaultLayout exact path="/product/:id" component={ProductDetailPage} />
          
            <AdminLayout exact path="/admin" component={DashboardPage} />
            <AdminLayout exact path="/admin/products-with-hoc" component={ProductListHocPage} />
            <AdminLayout exact path="/admin/products-with-hook" component={ProductListHookPage} />
            <AdminLayout exact path="/admin/to-do-list" component={ToDoListPage} />

            <FullLayout exact path="/login" component={LoginPage} />
            <FullLayout exact path="/register" component={RegisterPage} />
            <FullLayout component={NotFoundPage} />
          </Switch>
        </Router>
      </I18nextProvider>
    </ThemeProvider>
  );
}

export default App;
