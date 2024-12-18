// Fetch users from the API
async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users'); // Ensure this URL matches your API route
    if (response.ok) {
      const users = await response.json();
      renderUsers(users);
    } else {
      alert('Failed to fetch users');
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    alert('An error occurred while fetching the users.');
  }
}

// Render the users in the table
function renderUsers(users) {
  const usersList = document.getElementById('usersList');
  usersList.innerHTML = ''; // Clear any previous data

  if (users.length === 0) {
    const row = document.createElement('tr');
    const emptyMessage = document.createElement('td');
    emptyMessage.colSpan = 3;
    emptyMessage.textContent = 'No users found.';
    row.appendChild(emptyMessage);
    usersList.appendChild(row);
    return;
  }

  users.forEach((user,index) => {
    const row = document.createElement('tr');

    // Add numbering to the leftmost cell
    const numberCell = document.createElement('td');
    numberCell.textContent = index + 1;  // Add 1 to make it human-readable (starting from 1)
    row.appendChild(numberCell);


    const usernameCell = document.createElement('td');
    usernameCell.textContent = user.username;
    row.appendChild(usernameCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    
    const accountTypeCell = document.createElement('td');
    accountTypeCell.textContent = user.accountType;
    row.appendChild(accountTypeCell);

    const geneder = document.createElement('td');
    geneder.textContent = user.gender;
    row.appendChild(geneder);


    usersList.appendChild(row);
  });
}

// Call the function to fetch users when the page loads
window.onload = fetchUsers;
