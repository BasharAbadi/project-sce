//For Paint Catalog
async function fetchPaints() {
  try {
    const response = await fetch("/api/paints");
    const paints = await response.json();
    const paintList = document.getElementById("paintList");

    paintList.innerHTML = "";

    //name, quality, price, rating
    paints.forEach((paint, index) => {
      const row = document.createElement("tr");

      // Add numbering to the leftmost cell
      const numberCell = document.createElement("td");
      numberCell.textContent = index + 1; // Add 1 to make it human-readable (starting from 1)
      row.appendChild(numberCell);

      const name = document.createElement("td");
      name.textContent = paint.name;
      row.appendChild(name);

      const quality = document.createElement("td");
      quality.textContent = paint.quality;
      row.appendChild(quality);

      const rating = document.createElement("td");
      rating.textContent = paint.rating;
      row.appendChild(rating);

      const price = document.createElement("td");
      price.textContent = `$${paint.price}`;
      row.appendChild(price);

      //Add Edit Button
      const actions = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => openEditform(paint);
      actions.appendChild(editButton);
      row.appendChild(actions);

      paintList.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to fetch paints: ", error);
  }
}
function openEditform(paint) {

  document.getElementById("editFormSection").style.display = "block";
 
  document.getElementById("editName").value = paint.name;
  document.getElementById("editQuality").value = paint.quality;
  document.getElementById("editPrice").value = paint.price;
  document.getElementById("editRating").value = paint.rating;

  const form = document.getElementById("editPaintForm");
  form.onsubmit = (event) => saveChanges(event, paint._id);


  const deleteButton = document.querySelector("button[type='button']");
  deleteButton.onclick = () =>deletePaint(paint._id);

}

function cancelEdit() {
  document.getElementById("editFormSection").style.display = "none";
}

async function saveChanges(event, paintId) {
  event.preventDefault();

  const updatedPaint = {
    id: paintId,
    name: document.getElementById("editName").value,
    quality: document.getElementById("editQuality").value,
    price: document.getElementById("editPrice").value,
    rating: document.getElementById("editRating").value,
  };
  try {
    const response = await fetch(`/api/paints/update`, {
      method: "POST", // Use POST instead of PUT
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPaint),
    });

    if (response.ok) {
      alert("Paint updated successfully!");
      fetchPaints(); // Reload the table with updated data
      cancelEdit(); // Hide the edit form
    } else {
      const errorMessage = await response.text();
      alert(`Failed to update paint: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error saving changes:", error);
  }
}

async function deletePaint(paintId) {
  if (confirm("Are you sure you want to delete this paint?")) {
    try {
      const response = await fetch(`/api/paints/${paintId}`, {
        method: "DELETE", // Use DELETE method to remove the paint
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Paint deleted successfully!");
        fetchPaints(); // Reload the table to remove the deleted paint
      } else {
        alert("Failed to delete paint.");
      }
    } catch (error) {
      console.error("Error deleting paint:", error);
    }
  }
}
window.onload = fetchPaints;








// Show the Add Paint form when the + button is clicked
document.getElementById("addPaintBtn").onclick = function() {
    document.getElementById("addPaintFormSection").style.display = "block";
  };
  
  // Handle form submission to add the new paint
  document.getElementById("addPaintForm").onsubmit = async function(event) {
    event.preventDefault();
  
    const newPaint = {
      name: document.getElementById("newName").value,
      quality: document.getElementById("newQuality").value,
      price: document.getElementById("newPrice").value,
      rating: document.getElementById("newRating").value,
    };
  
    try {
      const response = await fetch("/api/paints", {
        method: "POST", // Using POST to add a new paint
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPaint),
      });
  
      if (response.ok) {
        alert("Paint added successfully!");
        fetchPaints(); // Refresh the table to show the new paint
        cancelAdd(); // Hide the form after adding the paint
      } else {
        alert("Failed to add paint.");
      }
    } catch (error) {
      console.error("Error adding paint:", error);
    }
  };
  
  // Hide the form when the cancel button is clicked
  function cancelAdd() {
    document.getElementById("addPaintFormSection").style.display = "none";
  }
  





