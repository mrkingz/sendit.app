import React from "react";
import { Link } from "react-router-dom";

const UserOrders = props => {
  const ordersFields = [
    { cancelled: "Cancelled orders" },
    { delivered: "Delivered orders" },
    { transiting: "Transiting orders" },
    { placed: "Placed orders" },
    { total: "Total orders" }
  ];
  return (
    <div className="row">
      <div className="col-12">
        <div className="mt-lg height-transitio">
          <div className="nexted">
            <div className="card-header flex justify-content-between">
              <div className="card-title">
                <span className="size-12 bold">Delivery orders</span>
              </div>
            </div>
            <div className="outter-div-wrapper">
              <div className="innert-div-wrapper">
                <div className="card-wrapper">
                  {ordersFields.map((data, index) => {
                    return (
                      <div className="card-row" key={index}>
                        <div
                          className={`data-header ${
                            Object.keys(data)[0] === "total" ? "bold total" : ""
                          }`}
                        >
                          {Object.values(data)[0]}
                        </div>
                        <div
                          className={`${
                            Object.keys(data)[0] === "total"
                              ? "bold red-color total"
                              : ""
                          }`}
                          id="data-cancelled"
                        >
                          {props.orders[Object.keys(data)[0]]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <Link
              to={{
                pathname: "/users/parcels",
                state: {
                  isUserParcels: true,
                  userId: props.userId
                }
              }}
              className="btn btn-primary btn-lg"
            >
              <i className="fa fa-list-ol" /> See orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserOrders;
