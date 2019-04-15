import {
  IndexPage,
  SignUp,
  SignIn,
  Dashboard,
  CreateParcel,
  Parcels,
  Profile,
  Parcel
} from "../components/pages";

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
      path: "/profile",
      component: Profile
    },
    {
      path: "/create",
      component: CreateParcel
    },
    {
      exact: true,
      path: "/parcels/:parcelId",
      component: Parcel
    },
    {
      exact: true,
      path: "/parcels",
      component: Parcels
    },
    {
      exact: true,
      path: "/users/:parcels",
      component: Parcels
    }
  ]
};
export default routes;
