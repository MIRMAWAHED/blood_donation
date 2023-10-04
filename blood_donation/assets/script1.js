document.addEventListener('DOMContentLoaded', function () {

  const loginBtn = document.getElementById('loginBtn');
  const signInBtn = document.getElementById('signInBtn');
  const form = document.getElementById('form1');
  const options = document.getElementById('options');
  const admin_home = document.getElementById('admin_home');
  const doner_home = document.getElementById('doner_home');
  const user_home = document.getElementById('user_home');
  //     // options.style.display='block';
  //     // Show the login form when the "Login" button is clicked
  //     loginBtn.addEventListener('click', function () {
  //         form.style.display = 'block';
  //         options.style.display = 'none';
  //         document.getElementById('submitBtn').addEventListener('click', function() {
  //             // Get form values
  //             const selectedRole = document.querySelector('input[name="btnradio"]:checked').value;
  //             const email = document.getElementById('exampleInputEmail1').value;
  //             const password = document.getElementById('exampleInputPassword1').value;

  //             const data = {
  //               email: email,
  //               password: password,
  //               role: selectedRole
  //             };

  //             // Send a POST request to the server
  //             fetch('/login', {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/json'
  //               },
  //               body: JSON.stringify(data)
  //             })
  //             .then(response => response.json())
  //             .then(result => {
  //               // Handle the server's response here
  //               console.log(result);
  //               if (result.success != true)
  //               {
  //                 alert("Wrong Crendientials");
  //               }
  //               else{

  //               }

  //             })
  //             .catch(error => {
  //               console.error('Erroris:', error);
  //             });
  //             });
  //     });

  //     // Show the Sign In form when the "Sign In" button is clicked
  //     signInBtn.addEventListener('click', function () {
  //         options.style.display = 'none';
  //         form.style.display = 'block';
  //         document.getElementById('submitBtn').addEventListener('click', function() {
  //             // Get form values
  //             const selectedRole = document.querySelector('input[name="btnradio"]:checked').value;
  //             const email = document.getElementById('exampleInputEmail1').value;
  //             const password = document.getElementById('exampleInputPassword1').value;

  //             const data = {
  //               email: email,
  //               password: password,
  //               role: selectedRole
  //             };

  //             // Send a POST request to the server
  //             fetch('/signin', {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/json'
  //               },
  //               body: JSON.stringify(data)
  //             })
  //             .then(response => response.json())
  //             .then(result => {
  //               // Handle the server's response here
  //               console.log(result);
  //             })
  //             .catch(error => {
  //               console.error('Erroris:', error);
  //             });
  //             });
  //     });
  function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    options.remove();
    // Get the ID of the clicked button
    const clickedButtonId = event.target.id;

    // Get form values
    const selectedRole = document.querySelector('input[name="btnradio"]:checked').value;
    const email = document.getElementById('exampleInputEmail1').value;
    const password = document.getElementById('exampleInputPassword1').value;
    const name = document.getElementById('name').value;
    console.log("selected role=" + selectedRole);
    const data = {
      name: name,
      email: email,
      password: password,
      role: selectedRole
    };

    // Determine whether it's a "Sign In" or "Login" request based on the button ID
    if (clickedButtonId === 'submitBtnLogin') {
      // Send a POST request to the server for login
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          // Handle the server's response here
          console.log(result);
          if (result.success != true) {
            alert("Wrong Crendientials");
          }
          else {
            form.remove();
            if (data.role === 'admin') {
              admin_home.style.display = 'block';
              window.location.href = '../m';
            }
            else if (data.role === 'doner') {
              doner_home.style.display = 'block';
              document.getElementById('table3').style.display = 'block';
              document.getElementById('doner_form').style.display = 'none';
              window.location.href = '../m';
            }
            else if (data.role === 'user') {
              user_home.style.display = 'block';
              window.location.href = '../m';
            }
          }

        })
        .catch(error => {
          console.error('Erroris:', error);
        });
    } else if (clickedButtonId === 'submitBtnSignIn') {
      // Send a POST request to the server for sign in
      fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(result => {
          // Handle the server's response here
          console.log(result);
          if (result.success != true) {
            alert("Wrong Crendientials");
          }
          else {
            const id = result.id;
            form.remove();
            if (data.role === 'admin') {
              admin_home.style.display = 'block';
              window.location.href = '../m';
            }
            else if (data.role === 'doner') {
              doner_home.style.display = 'block';
              document.getElementById('doner_form').style.display = 'block';
              document.getElementById('table3').style.display = 'none';
              document.getElementById('doner_id').innerText =id
              document.getElementById('staticEmail').innerText =data.email
              document.getElementById('donername').innerText =data.name
            }
            else if (data.role === 'user') {
              user_home.style.display = 'block';
              window.location.href = '../m';
            }
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }

    // Remove the click event listener after submission
    event.target.removeEventListener('click', handleSubmit);
  }

  // Show the login form when the "Login" button is clicked
  loginBtn.addEventListener('click', function () {

    // options.style.display = 'none';
    form.style.display = 'block';
    loginBtn.remove();

    // Attach the form submission event listener
    document.getElementById('form1').addEventListener('submit', handleSubmit);
    // Set a unique ID for the submit button to distinguish between "Sign In" and "Login" requests
    document.getElementById('form1').id = 'submitBtnLogin';
  });

  // Show the Sign In form when the "Sign In" button is clicked
  signInBtn.addEventListener('click', function () {
    // options.style.display = 'none';
    form.style.display = 'block';
    options.remove();
    // Attach the form submission event listener
    document.getElementById('form1').addEventListener('submit', handleSubmit);
    // Set a unique ID for the submit button to distinguish between "Sign In" and "Login" requests
    document.getElementById('form1').id = 'submitBtnSignIn';
  });
  // options.style.display='none';
});