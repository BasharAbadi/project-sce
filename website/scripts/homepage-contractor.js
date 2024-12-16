const username = localStorage.getItem('username');
if(username){
    document.getElementById("username").innerText = username;
}

function logout(){
    localStorage.clear();
    alert("You have been logged out.");
    window.location.href = 'login.html';
}