import "./Dashboard.css";

function Dashboard({ user, onLogout }) {

  return (
    <div className="dashboard">

      <header className="dashboard-header">

        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.username}</p>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>

      </header>

      <main className="dashboard-content">

        <h2>Overview</h2>

        <div className="cards">

          <div className="card">
            <h3>Projects</h3>
            <p>5</p>
          </div>

          <div className="card">
            <h3>Tasks</h3>
            <p>12</p>
          </div>

          <div className="card">
            <h3>Messages</h3>
            <p>3</p>
          </div>

        </div>

        <div className="account">

          <h2>Account Information</h2>

          <p>
            <strong>Username:</strong>{" "}
            {user?.username}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {user?.email}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            Active
          </p>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;