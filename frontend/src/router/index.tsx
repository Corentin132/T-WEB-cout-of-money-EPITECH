import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App.tsx";
import { complexRoutePath, routesName } from "@/constants/routes";
import Register from "@/pages/register";
import Login from "@/pages/login";
import NewsFeed from "@/pages/news/newsFeed";
// import CategoryNewsFeed from "@/pages/news/categoryNewsFeed";
// import NewsArticle from "@/pages/news/newsArticle";
// import BookmarkNewsFeed from "@/pages/news/bookmarkNewsFeed";
import { PropsWithChildren } from "react";
import AdminRSS from "@/pages/admin/AdminRss";

import { useAuth, userContext } from "../userContext";
import Dashboard from "@/pages/crypto/dashboard";
import CryptoOverview from "@/pages/crypto/cryptoOverview";

function AdminProtectedRoutes({ children }: PropsWithChildren) {
  const hook = useAuth();
  if (hook.isLoading) {
    return <p>Loading ... 🥱</p>;
  }
  if (
    !hook.user ||
    hook.user === null ||
    hook.user?.email === "" ||
    (hook.user.role != "admin" && hook.user.role != "superadmin")
  ) {
    return <Navigate to={routesName.login} replace />;
  }
  return (
    <>
      <userContext.Provider value={hook}>{children}</userContext.Provider>
    </>
  );
}

/* function ProtectedRoute({ children }: PropsWithChildren) {
  const hook = useAuth();
  if (hook.isLoading) {
    return <p>Loading ... 🥱</p>;
  }
  if (!hook.user || hook.user === null || hook.user?.email === "") {
    return <Navigate to={routesName.login} replace />;
  }
  return (
    <>
      <userContext.Provider value={hook}>{children}</userContext.Provider>
    </>
  );
} */

// Implement the router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <App />
      </>
    ),
    // errorElement: <ErrorPage />, // Need to create an ErrorPage to avoid 404 pages
    children: [
      // Use children so that every pages is within the App (includes the sidebar)

      /**
       *  NEWS
       */
      {
        path: routesName.news,
        element: <NewsFeed />,
      },
      // {
      //   path: complexRoutePath.newsCategoryPath,
      //   element: <CategoryNewsFeed />,
      // },
      // {
      //   path: complexRoutePath.articlePath,
      //   element: <NewsArticle />,
      // },
      // {
      //   path: routesName.bookmark,
      //   element: (
      //     <ProtectedRoute>
      //       <BookmarkNewsFeed />
      //     </ProtectedRoute>
      //   ),
      // },

      {
        path: routesName.admin,
        element: (
          <AdminProtectedRoutes>
            <AdminRSS />
          </AdminProtectedRoutes>
        ),
      },

      {
        path: routesName.dashboard,
        element: <Dashboard />,
      },
      {
        path: complexRoutePath.cryptoOverviewPath,
        element: <CryptoOverview />,
      },
    ],
  },

  // Other path that don't require the sidebar

  /**
   * AUTH
   */
  {
    path: routesName.login,
    element: <Login />,
  },
  {
    path: routesName.register,
    element: <Register />,
  },
]);

export default router;
