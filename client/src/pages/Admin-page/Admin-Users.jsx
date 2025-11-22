import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import "./Admin.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const { authorizationToken, API,user } = useAuth();

  //getting all the users data
  const getAllUserData = async () => {
    try {
      setIsFetching(true);

      const URL = `${API}/api/admin/users`;
      const options = {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      };

      const response = await fetch(URL, options);
      const data = await response.json();

      // console.log(data.users);
      if (response.ok) {
        setUsers(data.users || []);
      } else {
        toast.error(
          data.extraDetails || data.message || "Failed to load users."
        );
        setUsers([]);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
      toast.error("Something went wrong while loading users.");
      setUsers([]);
    } finally {
      setIsFetching(false);
    }
  };

  //deleting user by Id
  const deleteUser = async (id) => {
    try {
      setDeletingId(id);

      const URL = `${API}/api/admin/users/delete/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      };

      const response = await fetch(URL, options);
      const resData = await response.json();

      if (response.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== id));
        toast.success("User Deleted Successfully");
      } else {
        toast.error(
          resData.extraDetails || resData.message || "User not deleted"
        );
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      toast.error("Something went wrong while deleting user.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  if (isFetching) {
    return <Loader />;
  }
  return (
    <>
      <section>
        <div className="container">
          <h1 className="admin-user-heading">
            <span className="highlight">Admin</span> Users Data
          </h1>
        </div>
        {users.length === 0 ? (
          <p className="empty-text">No users found.</p>
        ) : (
          <div className="container admin-user">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((curUser) => {
                const isSelf = user?._id === curUser._id;
                  return (
                    <tr key={curUser._id}>
                      <td>{curUser.username}</td>
                      <td>{curUser.email}</td>
                      <td>{curUser.phone}</td>
                      <td>
                        <Link
                          to={`/admin/users/${curUser._id}/edit`}
                          className="edit-link"
                        >
                          Edit
                        </Link>
                      </td>
                      <td>
                        {isSelf ? (
                          <span>You</span>
                        ) : (
                          <Popup
                            trigger={
                              <button
                                className="admin-btn delete-btn"
                                disabled={deletingId === curUser._id}
                              >
                                {deletingId === curUser._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            }
                            modal
                            nested
                          >
                            {(close) => (
                              <div className="pop-container">
                                <h3 className="pop-heading">Confirm Delete</h3>
                                <p className="pop-msg">
                                  Are you sure you want to delete this user?
                                </p>
                                <div className="pop-btn-container">
                                  <button
                                    className="pop-cancel-btn"
                                    onClick={close}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="pop-dlt-btn"
                                    onClick={async () => {
                                      await deleteUser(curUser._id);
                                      close();
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </Popup>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
};

export default AdminUsers;
