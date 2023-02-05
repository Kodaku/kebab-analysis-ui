import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { fetchOrders, getOrder } from "../../store/order/order-actions";
import Footer from "../UI/Footer";
import Sidebar from "../UI/Sidebar";
import TableHead from "../UI/table/TableHead";

const Order = () => {
  const tableHeads = [
    "ID",
    "Name",
    "Date",
    "Total",
    "Tipology",
    "Time",
    "Address",
    "Phone",
    "Company",
    "Update",
    "Delete",
  ];
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const deleteClickHandler = (orderId: number) => {
    dispatch(getOrder(orderId));
  };

  const displayOrders = () => {
    return orders.map((order, index) => {
      let time = "";
      if (orders[orders.length - index - 1].time) {
        let s: number = orders[orders.length - index - 1].time!;
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        time = hrs + ":" + mins + ":" + secs + "." + ms;
      }
      return (
        <tr key={orders[orders.length - index - 1].id}>
          <td>{orders[orders.length - index - 1].id}</td>
          <td>{orders[orders.length - index - 1].name}</td>
          <td>
            {new Date(
              orders[orders.length - index - 1].date
            ).toLocaleDateString()}
          </td>
          <td>{orders[orders.length - index - 1].totalAmount}</td>
          <td>{orders[orders.length - index - 1].orderType}</td>
          <td>{time}</td>
          <td>{orders[orders.length - index - 1].address}</td>
          <td>{orders[orders.length - index - 1].phoneNumber}</td>
          <td>{orders[orders.length - index - 1].orderCompanyId}</td>
          <td>
            <Link to="/orders/update" type="button" className="btn btn-info">
              Update
            </Link>
          </td>
          <td>
            <Link to="/orders/delete">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteClickHandler(order.id!);
                }}
              >
                Delete
              </button>
            </Link>
          </td>
        </tr>
      );
    });
  };
  return (
    <Fragment>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <h4 className="card-title">Orders</h4>
              <Link
                to="/orders/create"
                type="button"
                className="btn btn-success"
              >
                Add Order
              </Link>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <TableHead heads={tableHeads} />
                  </thead>
                  <tbody>{displayOrders()}</tbody>
                </table>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Order;
