// import { useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import AppNavbar from './components/AppNavbar';
// import Dashboard from './pages/Dashboard';
// import Applications from './pages/Applications';
// import initialApplications from './data/applications';

// const API_URL = 'http://localhost:5001/api/applications';

// function App() {
//   const [applications, setApplications] = useState(() => {
//     const savedApplications = localStorage.getItem('applications');

//     if (savedApplications) {
//       return JSON.parse(savedApplications);
//     }

//     return initialApplications;
//   });

//   useEffect(() => {
//     localStorage.setItem('applications', JSON.stringify(applications));
//   }, [applications]);

//   const addApplication = (newApplication) => {
//     setApplications([
//       ...applications,
//       {
//         ...newApplication,
//         id: Date.now(),
//       },
//     ]);
//   };

//   const deleteApplication = (id) => {
//     setApplications(applications.filter((app) => app.id !== id));
//   };

//   const editApplication = (updatedApplication) => {
//     setApplications(
//       applications.map((app) =>
//         app.id === updatedApplication.id ? updatedApplication : app
//       )
//     );
//   };

//   return (
//     <>
//       <AppNavbar />

//       <div className="container py-4">
//         <Routes>
//           <Route path="/" element={<Dashboard applications={applications} />} />

//           <Route
//             path="/applications"
//             element={
//               <Applications
//                 applications={applications}
//                 addApplication={addApplication}
//                 deleteApplication={deleteApplication}
//                 editApplication={editApplication}
//               />
//             }
//           />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;


import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';

const API_URL = 'http://localhost:5001/api/applications';

function App() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const addApplication = async (newApplication) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApplication),
      });

      const savedApplication = await response.json();
      setApplications([savedApplication, ...applications]);
    } catch (error) {
      console.error('Failed to add application:', error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      setApplications(applications.filter((app) => app.id !== id));
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  const editApplication = async (updatedApplication) => {
    try {
      const response = await fetch(`${API_URL}/${updatedApplication.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedApplication),
      });

      const savedApplication = await response.json();

      setApplications(
        applications.map((app) =>
          app.id === savedApplication.id ? savedApplication : app
        )
      );
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  if (loading) {
    return (
      <>
        <AppNavbar />
        <div className="container py-5">
          <div className="alert alert-info">Loading applications...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <AppNavbar />

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Dashboard applications={applications} />} />

          <Route
            path="/applications"
            element={
              <Applications
                applications={applications}
                addApplication={addApplication}
                deleteApplication={deleteApplication}
                editApplication={editApplication}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;