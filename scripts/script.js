$('document').ready(function(){
  
  console.log("Dom is ready");

const importOrder = {
  name: "Justin",
  contact: "256-222-2222",
  burgerType: "cheeseburger",
  toppings: ["bacon", "lettuce"],
  condiments: ["mayo", "mustard"],
  sides: "fries"
};
   // Event listener for the Previous Order button
  $('#importOrder').on('click', function () {
    console.log("Clicked Import Order Button");
    
    // Add the imported values into form
    $('#orderName').val(importOrder.name);
    $('#phoneContact').val(importOrder.contact);
    $('#burgerType').val(importOrder.burgerType);
    $('#sides').val(importOrder.sides);

    // Iterate toppings & set as checked 
    $('input[name="toppings"]').each(function () {
      $(this).prop('checked', importOrder.toppings.includes($(this).val()));
    });

    // Iterate condiments & set as checked
    $('input[name="condiments"]').each(function () {
      $(this).prop('checked', importOrder.condiments.includes($(this).val()));
    });
    // same thing for sides
    $('input[name="sides"]').each(function () {
      $(this).prop('checked', $(this).val() === importOrder.sides);
    });

  });

  // Create the submit function
  $('#orderForm').on('submit', function (e) {
    e.preventDefault();

    // Get all form values
    const name = $('#orderName').val();
    const contact = $('#phoneContact').val();
    const burgerType = $('#burgerType').val();

    // toppings grabbed
    const toppings = [];
    $('input[name="toppings"]:checked').each(function () {
      toppings.push($(this).val());
    });

    // condiments grabbed
    const condiments = [];
    $('input[name="condiments"]:checked').each(function () {
      condiments.push($(this).val());
    });

    // sides grabbed
    const sides = $('input[name="sides"]:checked').val();

    //json object for console
    const orderData = {
        name,
        contact,
        burgerType,
        toppings,
        condiments,
        sides: sides || null, // If no side is selected, set to null
      };
  
      // log the json object 2 the console
      console.log(JSON.stringify(orderData, null, 2));

    // create seperate card within the orderOutput div
    const orderCard = `
      <div class="card mt-4">
        <div class="card-body">
          <h2 class="card-title">Order Details</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Contact:</strong> ${contact}</p>
          <p><strong>Burger Type:</strong> ${burgerType}</p>
          <p><strong>Toppings:</strong> ${toppings.length > 0 ? toppings.join(', ') : 'None'}</p>
          <p><strong>Condiments:</strong> ${condiments.length > 0 ? condiments.join(', ') : 'None'}</p>
          <p><strong>Side:</strong> ${sides || 'None'}</p>
        </div>
      </div>
    `;

    // Append the order card to the output div
    $('#orderOutput').html(orderCard);

  });


});