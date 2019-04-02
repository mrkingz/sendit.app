import { IndexPage, SignUp, SignIn } from "@pages";

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
  protected: []
};
export default routes;
