import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";

const AdminUserUpadate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
    isAdmin: "",
  });
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const { authorizationToken, API ,user} = useAuth();

  const isEditingSelf = user?._id === params.id;

  //get single user data
  const getSingleUserData = async () => {
    try {
      setIsFetching(true);

      const URL = `${API}/api/admin/users/${params.id}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      };

      const response = await fetch(URL, options);
      const resData = await response.json();
      //console.log(`user single data,${resData}`);

      if (response.ok) {
        setData(resData.user || { username: "", email: "", phone: "" });
      } else {
        toast.error(
          resData.extraDetails || resData.message || "Failed to load user"
        );
      }
    } catch (error) {
      //console.log("Error fetching single user:", error);
      toast.error("Something went wrong while loading user.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, [params.id]);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  //updating the data dynamically
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const URL = `${API}/api/admin/users/update/${params.id}`;

      // if editing self, don't send isAdmin field
      const payload = { ...data };
      if (isEditingSelf) {
        delete payload.isAdmin;
      }

      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(URL, options);
      const resData = await response.json();
      //console.log("update user ", response);

      if (response.ok) {
        toast.success("User updated successfully");
      } else {
        toast.error(
          resData.extraDetails || resData.message || "User not updated"
        );
      }
    } catch (error) {
      //console.log("Error updating user:", error);
      toast.error("Something went wrong while updating user.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return <Loader />;
  }

  return (
    <section className="section-admin">
      <div className="update-main-heading">
        <h1>
          <span className="highlight">Update</span> User Details
        </h1>
      </div>
      <div className="admin-container">
        <div className="admin-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                required
                autoComplete="off"
                value={data.username}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                autoComplete="off"
                value={data.email}
                onChange={handleInput}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                autoComplete="off"
                value={data.phone}
                onChange={handleInput}
              />
            </div>
            {!isEditingSelf && (
              <div className="admin-checkbox-container">
                <span className="checkBox-label">
                  {data.isAdmin
                    ? "Disable Admin Privileges"
                    : "Enable Admin Privileges"}
                </span>
                <label htmlFor="isAdmin" className="switch-toggle">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    name="isAdmin"
                    checked={data.isAdmin}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        isAdmin: e.target.checked,
                      }))
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>
            )}
            {isEditingSelf && (
              <p>
               <strong>Note</strong>: You are editing your own account.
              </p>
            )}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AdminUserUpadate;
