import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [filterSubject, setFilterSubject] = useState("");

  const addAssignment = () => {
    const newAssignment = {
      title: title,
      subject: subject,
      dueDate: dueDate,
      status: "Pending",
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setSubject("");
    setDueDate("");
  };
  
  const markAsSubmitted = (index) =>{
    const updatedAssignments = [...assignments];

    updatedAssignments[index].status = "Submitted";

    setAssignments(updatedAssignments);
  };

  const markAsLate = (index) =>{
    const updatedAssignments = [...assignments];

    updatedAssignments[index].status= "Late";

    setAssignments(updatedAssignments);
  };

  const pendingCount = assignments.filter(
    (item) => item.status === "Pending"
  ).length;
  
  const submittedCount = assignments.filter(
    (item) => item.status === "Submitted"
  ).length;
  
  const lateCount = assignments.filter(
    (item) => item.status === "Late"
  ).length;

  const filteredAssignments = assignments.filter(
    (item) =>
      filterSubject === ""|| item.subject === filterSubject
  );

  return (
    <div>
      <h1>COLLEGE ASSIGNMENT SUBMISSION TRACKER</h1>

      <div className="dashboard">

        <div className="card">
          <h3>Total</h3>
          <p>{assignments.length}</p>
          </div>
          
          <div className="card">
            <h3>Pending</h3>
            <p>{pendingCount}</p>
            </div>

            <div className="card">
              <h3>Submitted</h3>
              <p>{submittedCount}</p>
              </div>
              
              <div className="card">
                <h3>Late</h3>
                <p>{lateCount}</p>
                </div>

      </div>

      <input
        type="text"
        placeholder="Assignment Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <br />
      <br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <br />
      <br />

      <button onClick={addAssignment}>
        Add Assignment
      </button>

      <h3 className="filter-heading">
        FILTER BY SUBJECT
      </h3>

      <select
      value = {filterSubject}
      onChange = {(e) => setFilterSubject(e.target.value)}
      >

      <option value ="">All Subjects</option>
      <option value="AI">AI</option>
      <option value="Web Technology">Web Technology</option>
      <option value="Python">Python</option>
      </select>

      <br/>
      <br/>
      

      <hr />

      <h2 className="assignment-heading">ASSIGNMENTS LIST</h2>

      {filteredAssignments.map((item, index) => (
        <div key={index}className="assignment-box">
          <p><b>Title:</b> {item.title}</p>
          <p><b>Subject:</b> {item.subject}</p>
          <p><b>Due Date:</b> {item.dueDate}</p>
          <p>
            <b>Status:</b>
            <span className={item.status.toLowerCase()}>
              {" "}{item.status}
            </span>
          </p>
          <button 
          className="submit-btn"
          onClick={() =>markAsSubmitted(index)}
          >
            MARK AS SUBMITTED
          </button>

          <button className="late-btn"
          onClick={() =>markAsLate(index)}
          >
            MARK AS LATE
          </button>
             
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;