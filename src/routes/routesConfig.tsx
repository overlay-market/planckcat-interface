import { Claim } from "../pages/Claim";

const routesConfig = [
  {
    path: "/",
    breadcrumb: null
  },
  {
    path: "/claim",
    component: () => Claim,
    exact: true,
    breadcrumb: "Claim"
  }
];

export default routesConfig;
