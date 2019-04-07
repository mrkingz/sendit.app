import { IndexPage, SignUp, SignIn, Dashboard, CreateParcel } from "@pages";

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
    }
  ]
};
export default routes;
