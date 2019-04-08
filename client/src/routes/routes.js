import {
  IndexPage,
  SignUp,
  SignIn,
  Dashboard,
  CreateParcel,
  Parcels,
  Details
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
      path: "/parcels",
      component: Parcels
    },
    {
      exact: true,
      path: "/parcels/:parcelId",
      component: Details
    }
  ]
};
export default routes;
