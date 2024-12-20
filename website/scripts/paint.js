 // Fetch paints from the API and display them
 async function fetchPaints() {
    try {
      const response = await fetch("/api/paints"); // Fetch paints from the server
      const paints = await response.json(); // Parse the JSON response
      const container = document.getElementById("paint-container");

      // Clear container before rendering
      container.innerHTML = "";

      // Render each paint product
      paints.forEach((paint) => {
        const paintCard = document.createElement("div");
        paintCard.classList.add("content");
        paintCard.innerHTML = `
          <img src="../images/Paint.jpeg" alt="${
          paint.name
        }" />
          <h3>${paint.name}</h3>
          <p>Quality: ${paint.quality}</p>
          <h6>$${paint.price}</h6>
         <div class="rating">
            ${getStars(paint.rating)}
          </div>
          <button>Add to Cart</button>
        `;
        container.appendChild(paintCard);
      });
    } catch (error) {
      console.error("Failed to fetch paints:", error);
    }
  }

  function getStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `<i class="fa fa-star ${i <= rating ? "checked" : ""}"></i>`;
    }
    return stars;
  }

  // Load paints on page load

  window.onload = fetchPaints;