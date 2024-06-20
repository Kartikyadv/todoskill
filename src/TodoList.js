import React, { useState } from "react";
import deleteicon from "./deleteicon.jpg";
import greentick from "./greentick.png";
import moment from "moment";

const TodoList = () => {
  const [List, setList] = useState([
    {
      Task: "Dummy",
      Description: "dummy",
      Priority: "high",
      "Created At": new Date().getTime(),
      done: true,
    },
  ]);
  const [formData, setFormData] = useState({
    Task: "",
    Description: "",
    Priority: "low",
    "Created At": new Date().getTime(),
    done: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setList((items) => [...items, formData]);
    setFormData({
      Task: "",
      Description: "",
      Priority: "low",
      "Created At": new Date().getTime(),
      done: false,
    });
  };

  const handleCheckboxChange = (index) => {
    setList((items) =>
      items.map((item, idx) =>
        idx === index ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteTask = (index) => {
    const updatedList = [...List];
    updatedList.splice(index, 1);
    setList(updatedList);
  };

  const getPriorityValue = (priority) => {
    switch (priority) {
      case "high":
        return 3;
      case "medium":
        return 2;
      case "low":
        return 1;
      default:
        return 0;
    }
  };

  const sortList = (type) => {
    let sortedList = List;
    switch (type) {
      case "task":
        sortedList = [...List].sort((a, b) => a.Task.localeCompare(b.Task));
        setList(sortedList);
        break;
      case "description":
        sortedList = [...List].sort((a, b) => a.Task.localeCompare(b.Task));
        setList(sortedList);
        break;
      case "priority":
        sortedList = [...List].sort(
          (a, b) => getPriorityValue(b.Priority) - getPriorityValue(a.Priority)
        );
        setList(sortedList);
        break;
      case "created at":
        sortedList = [...List].sort((a, b) => b["Created At"] - a["Created At"]);
        setList(sortedList);
        break;
      case "done":
        sortedList = [...List].sort((a, b) => b.done - a.done);
        setList(sortedList);
        break;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-[90%] mt-2">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <form onSubmit={submitHandler} className="mb-4">
          <input
            name="Task"
            value={formData.Task}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter a new task"
          />
          <input
            name="Description"
            value={formData.Description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Enter task description"
          />
          <select
            name="Priority"
            onChange={handleInputChange}
            value={formData.Priority}
            className="mb-5 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="high" className="bg-red-400">
              High
            </option>
            <option value="medium" className="bg-yellow-400">
              Medium
            </option>
            <option value="low" className="bg-green-400">
              Low
            </option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
        <table className="w-full table-fixed space-y-3">
          <thead>
            <tr className="border">
              <th
                onClick={() => sortList("task")}
                className="w-1/12 border  cursor-pointer border-gray-200"
              >
                Task
              </th>
              <th
                onClick={() => sortList("description")}
                className="w-5/12 border  cursor-pointer border-gray-200"
              >
                Description
              </th>
              <th
                onClick={() => sortList("priority")}
                className="w-1/12 border  cursor-pointer border-gray-200"
              >
                Priority
              </th>
              <th
                onClick={() => sortList("created at")}
                className="w-2/12 border  cursor-pointer border-gray-200"
              >
                Created At
              </th>
              <th
                onClick={() => sortList("done")}
                className="w-1/12 border  cursor-pointer border-gray-200"
              >
                Done
              </th>
              <th className="w-1/12 border border-gray-200">Delete</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr
                key={index}
                className={`text-center cursor-pointer m-4 ${
                  item.done ? "bg-gray-200" : ""
                }`}
                onClick={() => handleCheckboxChange(index)}
              >
                <td className="w-1/12 border border-gray-100">{item.Task}</td>
                <td className="w-5/12 break-words border border-gray-100">
                  {item.Description}
                </td>
                <td
                  className={`w-1/12 rounded-md border border-gray-100 ${
                    item.Priority === "high"
                      ? "bg-red-400"
                      : item.Priority === "medium"
                      ? "bg-yellow-400"
                      : "bg-green-400"
                  }`}
                >
                  {item.Priority}
                </td>
                <td className="w-2/12 border border-gray-100">
                  {moment(item["Created At"]).fromNow()}
                </td>
                <td className="w-.5/12 border border-gray-100">
                  {item.done ? (
                    <img className=" w-8 h-8 m-auto" src={greentick} />
                  ) : null}
                </td>
                <td className="w-1/12 border border-gray-100">
                  <img
                    onClick={() => deleteTask(index)}
                    src={deleteicon}
                    className="w-8 m-auto cursor-pointer rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
