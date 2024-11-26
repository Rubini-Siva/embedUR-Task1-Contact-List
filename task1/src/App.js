import React, { useState, useEffect } from 'react';
import './index.css'; // Assuming you have your styles in index.css

// Function to import images dynamically from the img folder
const importImage = (imageName) => {
  console.log('Received image name:', imageName);  // Log the image name to console
  try {
    // Attempt to require the image based on the provided name
    return require(`${imageName}`);
  } catch (error) {
    // Return a default image if the specific one is not found
    return require(`./img/img1.jpg`);
  }
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedRole, setSelectedRole] = useState(""); // New state for role filter
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Fetch contacts from the Go server
    const fetchContacts = async () => {
      const response = await fetch('http://localhost:8000/api/contact');
      const data = await response.json();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const locations = [...new Set(contacts.map(contact => contact.location))]; // Unique locations
  const roles = [...new Set(contacts.map(contact => contact.role))]; // Unique roles

  const filteredContacts = contacts.filter(contact => {
    return (
      (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === "") &&
      (selectedGender === "" || contact.gender === selectedGender) &&
      (selectedLocation === "" || contact.location === selectedLocation) &&
      (selectedRole === "" || contact.role === selectedRole) // Added role filter
    );
  });

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
  };

  const closePopup = () => {
    setSelectedContact(null);
  };

  return (
    <div className="container p-0 bg-gray-100 w-full h-screen flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-black" id="heading">Contact Management System</h1>

      <div className="flex mb-4 flex-grow w-full pb-10">
        <div className="w-1/5 mr-4 flex flex-col items-center bg-gray-200 p-4 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center text-black">Search</h2>
          <div className="flex flex-col items-center mb-4 w-full">
            <input
              type="text"
              placeholder="Search by name"
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-2 text-lg font-semibold text-center text-black">Search by gender:</label>
            <select
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label className="block mb-2 text-lg font-semibold text-center text-black">Search by location:</label>
            <select
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          {/* New Role Filter */}
          <div className="mb-4 w-full">
            <label className="block mb-2 text-lg font-semibold text-center text-black">Search by role:</label>
            <select
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-black"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="">All</option>
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-4/5 contact-list flex-grow pl-3">
          <h2 className="text-3xl font-bold mb-4 text-center text-black ">Contact List</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.length > 0 ? (
              filteredContacts.map(contact => (
                <div key={contact.id} className="border border-gray-300 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 flex flex-col items-center text-center bg-white">
                  <img src={importImage(contact.photo)} alt={contact.name} className="w-50 h-50 object-fill border-2 border-gray-300 mb-4 shadow-md" />
                  <h3 className="font-bold text-xl text-black">{contact.name}</h3>
                  <p className="text-gray-700 text-lg mb-2">{contact.role}</p>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-full transition-colors hover:bg-blue-700 text-lg shadow-md"
                    onClick={() => handleContactClick(contact)}
                  >
                    Details
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500  text-lg font-bold text-center" id="no">No contacts found.</p>
            )}
          </div>
        </div>
      </div>

      {selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-1/3 border border-gray-300">
            <h2 className="text-2xl font-bold text-black text-center">{selectedContact.name}</h2>
            <img src={importImage(selectedContact.photo)} alt={selectedContact.name} className="w-50 h-43 object-fill rounded-5 border-2 border-gray-300 mt-2 mb-2 mx-auto shadow-md" />
            <div className="flex flex-col items-center">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td><p className="text-lg text-black"><strong>Gender</strong></p></td>
                    <td><p className="text-lg text-black"><strong>:</strong> {selectedContact.gender}</p></td>
                  </tr>
                  <tr>
                    <td><p className="text-lg text-black"><strong>Role</strong></p></td>
                    <td><p className="text-lg text-black"><strong>:</strong> {selectedContact.role}</p></td>
                  </tr>
                  <tr>
                    <td><p className="text-lg text-black"><strong>Location</strong></p></td>
                    <td><p className="text-lg text-black"><strong>:</strong> {selectedContact.location}</p></td>
                  </tr>
                  <tr>
                    <td><p className="text-lg text-black"><strong>Email</strong></p></td>
                    <td><p className="text-lg text-black"><strong>:</strong> {selectedContact.email}</p></td>
                  </tr>
                  <tr>
                    <td><p className="text-lg text-black"><strong>Phone</strong></p></td>
                    <td><p className="text-lg text-black"><strong>:</strong> {selectedContact.phone}</p></td>
                  </tr>
                  <tr>
                    <td><p className="text-lg text-black"><strong>Date of Birth</strong></p></td>
                    <td><p className="text-lg text-black"><strong>:</strong> {selectedContact.dob}</p></td>
                  </tr>
                </tbody>
              </table>
              <button
                className="mt-4 bg-red-500 text-white px-6 py-2 rounded-full transition-colors hover:bg-red-700 text-lg shadow-md"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;   