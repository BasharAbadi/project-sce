const username = localStorage.getItem('username');
if(username){
    document.getElementById("username").innerText = username;
}

document.getElementById('feature').addEventListener('click', (e) => {
    e.preventDefault();

    // Check if the clicked element is a card
    const cardId = e.target.closest('.feature-card')?.id;

    // Redirect based on the card's id
    if (cardId === 'card1') {
        window.location.href = '../addproject.html';
    } else if (cardId === 'card2') {
        window.location.href = '../Calculator.html';
    } else if (cardId === 'card3') {
        window.location.href = '../Budget.html';
    }
})


function logout(){
    localStorage.clear();
    alert("You have been logged out.");
    window.location.href = 'login.html';
}



let subMenu = document.getElementById("subMenu");
function toggleMenu(){
    subMenu.classList.toggle("open-menu");
}


