import axios from "axios";
import React, { useEffect, useState } from "react";
import "./loader.css";

const App = () => {
  const [data, setData] = useState({
    name: "",
    body: "",
  });

  
  const [res, setRes] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    axios
      .get("/api/v1/getData")
      .then((response) => {
        console.log(response);
        setRes(response.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // window.location.reload();
  }, [res]);

  function dataHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();

    if (editId) {
      axios
        .put(`/api/v1/updateData/${editId}`, data)
        .then((response) => {
          console.log(response);
          setData({
            name: "",
            body: "",
          });
          setEditId(null);
          updateDataInState(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      axios
        .post("/api/v1/addData", data)
        .then((response) => {
          console.log(response);
          setData({
            name: "",
            body: "",
          });
          setRes((prevState) => [...prevState, response.data]);
        })
        .catch((e) => {
          console.log(e);
        });
      window.location.reload();
    }
  }

  const deleteHandler = (id) => {
    axios
      .delete(`/api/v1/deleteData/${id}`)
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        setRes(res.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
    window.location.reload();
  };

  const editHandler = (id, name, body) => {
    setEditId(id);
    setData({
      name: name,
      body: body,
    });
  };

  const statusHandler = (id, currentStatus) => {
    const newStatus = !currentStatus;

    axios
      .put(`/api/v1/updateStatus/${id}`, { status: newStatus })
      .then((response) => {
        console.log("Status updated:", response.data);
        updateDataInState(response.data);
      })
      .catch((e) => {
        console.error("Error updating status:", e);
      });
    window.location.reload();
  };

  const updateDataInState = (updatedItem) => {
    const updatedData = res.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setRes(updatedData);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-green-600 text-center">
          React CRUD App
        </h1>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              onChange={dataHandler}
              type="text"
              name="name"
              id="name"
              value={data.name}
              className="w-full p-3 mt-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 transition duration-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="block text-lg font-medium text-gray-700"
            >
              Body:
            </label>
            <input
              onChange={dataHandler}
              type="text"
              name="body"
              id="body"
              value={data.body}
              className="w-full p-3 mt-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 transition duration-300"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-300"
            >
              {editId ? "Update Data" : "Add Data"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {res.length > 0 ? (
            res.map((val, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {val.name}
                </h2>
                <p className="text-gray-600">{val.body}</p>
                <small>{new Date(val.createdAt).toLocaleString()}</small>

                <div className="mt-3 flex justify-between gap-2 ">
                  <button
                    onClick={() => editHandler(val._id, val.name, val.body)}
                    className="bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-800 w-[100px] transition duration-200 font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => statusHandler(val._id, val.status)}
                    className={`hidden md:flex p-2 rounded-lg font-semibold text-white w-[100px] ${
                      val.status
                        ? "bg-indigo-500 hover:bg-indigo-800"
                        : "bg-red-700 hover:bg-red-800"
                    }`}
                  >
                    {val.status ? "Completed" : "Incomplete"}
                  </button>

                  <button
                    onClick={() => deleteHandler(val._id)}
                    className="text-white hover:bg-red-700 transition duration-200 bg-red-400 font-semibold rounded-lg p-2 w-[200px]"
                  >
                    Delete
                  </button>
                </div>

                <div className="sm:hidden ">
                  <button
                    onClick={() => statusHandler(val._id, val.status)}
                    className={`p-2 m-2 rounded-lg font-semibold text-white w-[100px] ${
                      val.status
                        ? "bg-indigo-500 hover:bg-indigo-800"
                        : "bg-red-700 hover:bg-red-800"
                    }`}
                  >
                    {val.status ? "Completed" : "Incomplete"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <span class="loader"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
