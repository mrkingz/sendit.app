import { IndexPage, SignUp } from "@pages";

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
    }
  ],
  protected: []
};
export default routes;
