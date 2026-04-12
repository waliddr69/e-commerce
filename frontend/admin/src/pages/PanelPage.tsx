import logo from "../assets/forever.png";
import { NavLink, Switch, Route, useHistory } from "react-router-dom";
import OrderPage from "./OrderPage";
import ItemPage from "./ItemPage";
import AddPage from "./AddPage";
import AnalyticsPage from "./analytics/analyticsPage";
const Panel: React.FC = () => {
  const history = useHistory();
  const handleLogout = async () => {
    const req = await fetch(process.env.REACT_APP_API_USER_URL + "/logout", {
      credentials: "include",
    });

    const res = await req.json();
    if (res.success) {
      localStorage.removeItem("isAuthenticated");
      history.push("/");
    }
  };

  return (
    <>
      <header>
        <div className="header-wrapper">
          <div className="img-wrapper">
            <img src={logo} alt="" width={200} height={90} />
            <p>ADMIN PANEL</p>
          </div>

          <button className="rounded-pill" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <hr />
      </header>
      <main>
        <div className="side-bar">
          <div className="side-bar-wrapper">
            <ul>
              <li>
                <NavLink to={"/panel/add"} activeClassName="active">
                  <span
                    className="material-symbols-rounded"
                    style={{ color: "black" }}
                  >
                    add_box
                  </span>{" "}
                  <p>Add Items</p>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/panel/items"} activeClassName="active">
                  <span
                    className="material-symbols-rounded"
                    style={{ color: "black" }}
                  >
                    list_alt
                  </span>{" "}
                  <p>List Items</p>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/panel/orders"} activeClassName="active">
                  <span
                    className="material-symbols-rounded"
                    style={{ color: "black" }}
                  >
                    fact_check
                  </span>{" "}
                  <p>Orders</p>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/panel/analytics"} activeClassName="active">
                  <span className="material-symbols-rounded">analytics</span>{" "}
                  <p>Analytics</p>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Switch>
          <Route exact path={"/panel/orders"} component={OrderPage} />
          <Route exact path={"/panel/items"} component={ItemPage} />
          <Route exact path={"/panel/add"} component={AddPage} />
          <Route exact path={"/panel/analytics"} component={AnalyticsPage} />
        </Switch>
      </main>
    </>
  );
};

export default Panel;
