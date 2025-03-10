import ReactDOM from 'react-dom/client'
import './styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './ErrorPage.tsx';
import { countriesLoader } from '../utils/loaders.ts';
import { queryClient } from '../utils/query-client.ts';
import { CountryDetailPage } from './CountryDetailPage.tsx';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { CountryListPage } from './CountryListPage.tsx';
import React from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CountryListPage />,
        loader: countriesLoader(queryClient),
      },
      {
        path: ":country",
        element: <CountryDetailPage />,
        loader: countriesLoader(queryClient),
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
