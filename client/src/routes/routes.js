import {
  IndexPage,
  SignUp,
  SignIn,
  Dashboard,
  CreateParcel,
  Parcels
} from "@pages";

const routes = {
  public: [
    {
      exact: true,
      path: "/",
      component: IndexPage
    },
    {
      path: "/signup",
      component: SignUp
    },
    {
      path: "/signin",
      component: SignIn
    }
  ],
  protected: [
    {
      path: "/dashboard",
      component: Dashboard
    },
    {
      path: "/create",
      component: CreateParcel
    },
    {
      exact: true,
      path: "/parcels/:parcelId",
      component: CreateParcel
    },
    {
      exact: true,
      path: "/parcels",
      component: Parcels
    }
  ]
};
export default routes;
