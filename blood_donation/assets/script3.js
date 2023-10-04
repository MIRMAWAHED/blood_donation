function delete2(id) {
    const data = {
        id: id,
        table: `request`
    };
    fetch('/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            // Handle the server's response here
            // console.log(result);
            if (result.success == true) {
                // Reload the current page
                document.getElementById('request' + id).style.display = 'none';

            }


        })
        .catch(error => {
            console.error('Erroris:', error);
        });
}
function donate(id) {
    const data={
        id:id
    }
    fetch('/notify', {
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
          if (result.success == true) {
           document.getElementById('request' + id).style.display = 'none';
          }
          

        })
        .catch(error => {
          console.error('Erroris:', error);
        });
       
}

document.addEventListener('DOMContentLoaded', function () {
    var currentuser = 'default'
    fetch('/current', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Parse the response as text
        })
        .then(result => {
            // Handle the server's response here (result contains the HTML content)
            console.log(result);
            // Assuming 'result' contains the JSON string
            const parsedResult = JSON.parse(result);
            parsedResult.forEach(row => {
                currentuser = row.user
            })
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('/request', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text(); // Parse the response as text
        })
        .then(result => {
            // Handle the server's response here (result contains the HTML content)
            console.log(result);
            // Assuming 'result' contains the JSON string
            const parsedResult = JSON.parse(result);

            // Iterate through the rows (each object in the array)
            parsedResult.forEach(row => {
                // Access columns by property name
                const id = row.id;
                const name = row.name;
                const bloodType = row.blood_type;
                const units = row.units;
                const hospitalAddress = row.hospital_address;
                const phoneNum = row.phone_num;
                const urgency = row.urgency;
                const tablebody = document.getElementById('tablebody')
                const newRow = document.createElement('tr');
                newRow.setAttribute('id', 'request' + id);
                // Add table cells (columns) to the new row
                console.log(currentuser);
                if (currentuser === 'admin') {
                    console.log("admin login");
                    newRow.innerHTML = `
                    <th scope="row">${id}</th>
                    <td>${name}</td>
                    <td>${bloodType}</td>
                    <td>${hospitalAddress}</td>
                    <td>${phoneNum}</td>
                    <td>${units}</td>
                    <td>${urgency}</td>
                    <td><button type="button" onclick="delete2(${id})" id="${id}" class="btn btn-danger">Delete</button></td>
                `;
                    document.getElementById("extra").textContent = "Delete"
                }
                else if (currentuser === 'doner') {
                    var verify = 0;
                    fetch('/doner_verify', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text(); // Parse the response as text
                        })
                        .then(result => {
                            // Handle the server's response here (result contains the HTML content)
                            console.log(result);
                            // Assuming 'result' contains the JSON string
                            const parsedResult = JSON.parse(result);
                            parsedResult.forEach(row => {
                                verify = row.verified;

                                // Now that you have the 'verify' value, you can use it here
                                console.log("doner login");
                                if (verify == 1) {
                                    const data = {
                                        id: id
                                    };
                                    fetch('/check_notify', {
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
                                            if (result.success == true) {
                                                newRow.innerHTML = `
                                        <th scope="row">${id}</th>
                                        <td>${name}</td>
                                        <td>${bloodType}</td>
                                        <td>${hospitalAddress}</td>
                                        <td>${phoneNum}</td>
                                        <td>${units}</td>
                                        <td>${urgency}</td>
                                        <td><button type="button" id="donate${id}" onclick="donate(${id})" class="btn btn-success">Donate</button></td>
                                    `;
                                                document.getElementById("extra").textContent = "Donate";
                                            }

                                        })
                                        .catch(error => {
                                            console.error('Error:', error);
                                        });

                                } else {
                                    newRow.innerHTML = `
                                        <th scope="row">${id}</th>
                                        <td>${name}</td>
                                        <td>${bloodType}</td>
                                        <td>${hospitalAddress}</td>
                                        <td>${phoneNum}</td>
                                        <td>${units}</td>
                                        <td>${urgency}</td>
                                    `;
                                    document.getElementById("extra").style.display = 'none';
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                }
                else {
                    newRow.innerHTML = `
                    <th scope="row">${id}</th>
                    <td>${name}</td>
                    <td>${bloodType}</td>
                    <td>${hospitalAddress}</td>
                    <td>${phoneNum}</td>
                    <td>${units}</td>
                    <td>${urgency}</td>
                    
                `
                    document.getElementById("extra").style.display = 'none'
                        ;
                }

                // Append the new row to the table body
                tablebody.appendChild(newRow);
                // Do something with the data, e.g., display it
                console.log(`ID: ${id}, Name: ${name}, Blood Type: ${bloodType}, Units: ${units}, Address: ${hospitalAddress}, Phone: ${phoneNum}, Urgency: ${urgency}`);
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });


});
