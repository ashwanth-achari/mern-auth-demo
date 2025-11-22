import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const { authorizationToken, API } = useAuth();

  // getting all the contact data
  const getAllContactMessageData = async () => {
    try {
      setIsFetching(true);

      const URL = `${API}/api/admin/contacts`;
      const options = {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      };

      const response = await fetch(URL, options);
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts || []);
      } else {
        toast.error(
          data.extraDetails || data.message || "Failed to load contacts."
        );
        setContacts([]);
      }
    } catch (error) {
      console.log("Error fetching contacts:", error);
      toast.error("Something went wrong while loading contacts.");
      setContacts([]);
    } finally {
      setIsFetching(false);
    }
  };

  // Delete Contact by Id
  const deleteContact = async (id) => {
    try {
      setDeletingId(id);

      const URL = `${API}/api/admin/contacts/delete/${id}`;
      const options = {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      };

      const response = await fetch(URL, options);
      const resData = await response.json();

      if (response.ok) {
        // faster: update locally instead of refetching
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
        toast.success("Contact deleted successfully");
      } else {
        toast.error(
          resData.extraDetails || resData.message || "Contact not deleted"
        );
      }
    } catch (error) {
      console.log("Error deleting contact:", error);
      toast.error("Something went wrong while deleting contact.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getAllContactMessageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <section>
      <div className="container">
        <h1 className="admin-user-heading">
          <span className="highlight">Admin</span> Contacts Data
        </h1>
      </div>

      <div className="container admin-user">
        {contacts.length === 0 ? (
          <p className="empty-text">No contact messages found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((curContact) => (
                <tr key={curContact._id}>
                  <td>{curContact.username}</td>
                  <td>{curContact.email}</td>
                  <td>{curContact.message}</td>
                  <td>
                    <Popup
                      trigger={
                        <button
                          className="admin-btn delete-btn"
                          disabled={deletingId === curContact._id}
                        >
                          {deletingId === curContact._id
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
                            Are you sure you want to delete this contact?
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
                                await deleteContact(curContact._id);
                                close();
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default AdminContacts;
