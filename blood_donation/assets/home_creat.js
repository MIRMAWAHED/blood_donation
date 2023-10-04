function verify(id, status) {
    if (document.getElementById('verify' + id).textContent === "Unverify") {
        status = 1;
    }
    else {
        status = 0;
    }
    if (status == 1) {
        status = 0;
        document.getElementById('verify' + id).textContent = "Verify"
    }
    else {
        status = 1;
        document.getElementById('verify' + id).textContent = "Unverify"
    }
    const data = {
        id: id,
        status: status
    };
    fetch('/verify', {
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



        })
        .catch(error => {
            console.error('Erroris:', error);
        });
}
function delete1(id) {
    const data = {
        id: id,
        table: 'doner'
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
                document.getElementById('doner' + id).style.display = 'none';

            }


        })
        .catch(error => {
            console.error('Erroris:', error);
        });
}
function remove1(id)
{   const data = {
    id: id
    
};
    fetch('/delete_notfy', {
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
                document.getElementById('donerh' + id).style.display = 'none';
                window.location.href = '../m';
            }


        })
        .catch(error => {
            console.error('Erroris:', error);
        });
}
document.addEventListener('DOMContentLoaded', function () {
    console.log("oo no")
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
            console.log("ac")
            let current_id
            let current_users
            const parsedResult = JSON.parse(result);
             parsedResult.forEach(row => {
             current_id = row.current_id;
             current_users=row.user;
              });
              console.log("tc"+current_users)
              if(current_users ==='admin')
              {console.log("bc")
              document.getElementById('admin_home').style.display = 'block';
              document.getElementById('options').style.display = 'none';
                 display_admin()
              }
              else if(current_users==='doner')
              {console.log("dc")
              document.getElementById('options').style.display = 'none';
              document.getElementById('doner_home').style.display = 'block';
              document.getElementById('table3').style.display = 'block';
              document.getElementById('doner_form').style.display = 'none';
                display_doner_notify()
              }
              else if(current_users==='user')
              {console.log("pc")
              document.getElementById('options').style.display = 'none';
              document.getElementById('user_home').style.display = 'block';
                display_user_notify()
              }
            
        })
        .catch(error => {
          console.error('Error:', error);
        });
//    display_admin()
//     // Target the element whose style.display you want to monitor
// const targetElement = document.getElementById('table3');

// // Create a Mutation Observer instance
// const observer = new MutationObserver((mutationsList, observer) => {
//   // Check if the style.display property has changed to "block"
//   const currentDisplay = targetElement.style.display;
  
//   if (currentDisplay === 'block') {
//     display_doner_notify()
//   }
// });

// // Define which properties to observe (in this case, style)
// const config = {
//   attributes: true,
//   attributeFilter: ['style'],
// };

// // Start observing the target element
// observer.observe(targetElement, config);
// const targetElement2 = document.getElementById('user_home');

// // Create a Mutation Observer instance
// const observer2 = new MutationObserver((mutationsList, observer) => {
//   // Check if the style.display property has changed to "block"
//   const currentDisplay2 = targetElement2.style.display;
  
//   if (currentDisplay2 === 'block') {
//     console.log("table4 block")
//     display_user_notify()
//   }
// });

// // Define which properties to observe (in this case, style)
// const config2 = {
//   attributes: true,
//   attributeFilter: ['style'],
// };

// // Start observing the target element
// observer2.observe(targetElement2, config2);
// // display_user_notify()
// document.getElementById('logoutbtn').addEventListener('click', logouit()=>
//     { console.log("loged out")
//         window.location.href = './'
//     });


});

function display_user_notify()
{console.log("display_user_notify")
    let current_id
    let arr=[]
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
            console.log("nnns")
            return response.text(); // Parse the response as text
        })
        .then(result => {
            console.log("a")
            const parsedResult = JSON.parse(result);
            parsedResult.forEach(row => {
                current_id = row.current_id
            })
            fetch('/get_notify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log("nnns")
                    return response.text(); // Parse the response as text
                })
                .then(result2 =>{
                    console.log("b")
                    const parsedResult1 = JSON.parse(result2);
                    parsedResult1.forEach(row => {
                    if (current_id === row.user_id)
                    {
                        arr.push(row.doner_id)
                    }
                    })
                    fetch('/doner_ex', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            console.log("nnns")
                            return response.text(); // Parse the response as text
                        })
                        .then(result3 => {
                            console.log("c ."+current_id+"arr="+arr)
                            const parsedResult2 = JSON.parse(result3);
                            parsedResult2.forEach(row => {
                                if (arr.includes(row.id))
                                {console.log("d")
                                        const id = row.id;
                                        const user_name=row.name;
                                        const ph=row.phone_number;
                                        const age=row.age
                                        const mc=row.medical_conditions
                                        const bgrp=row.blood_group
                                        const tablebody = document.getElementById('tablebody4')
                                        const newRow = document.createElement('tr');
                                        newRow.setAttribute('id', 'userdis' + id);
                                       
                               
                                        newRow.innerHTML = `
                                        <th scope="row">${id}</th>
                                        <td>${user_name}</td>
                                        <td>${ph}</td>
                                        <td>${age}</td>
                                        <td>${mc}</td>
                                        <td>${bgrp}</td>
                                        
                                        
                                    `;
                                    tablebody.appendChild(newRow)
                                    
                                }
                            })
                
                                
                               
                            
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function display_doner_notify()
{
    let current_id
    let arr=[]
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
            console.log("nnns")
            return response.text(); // Parse the response as text
        })
        .then(result => {
            console.log("a")
            const parsedResult = JSON.parse(result);
            parsedResult.forEach(row => {
                current_id = row.current_id
            })
            fetch('/get_notify', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    console.log("nnns")
                    return response.text(); // Parse the response as text
                })
                .then(result2 =>{
                    console.log("b")
                    const parsedResult1 = JSON.parse(result2);
                    parsedResult1.forEach(row => {
                    if (current_id === row.doner_id)
                    {
                        arr.push(row.request_id)
                    }
                    })
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
                            console.log("nnns")
                            return response.text(); // Parse the response as text
                        })
                        .then(result3 => {
                            console.log("c")
                            const parsedResult2 = JSON.parse(result3);
                            parsedResult2.forEach(row => {
                                if (arr.includes(row.id))
                                {console.log("ce")
                                        const id = row.id;
                                        const user_name=row.name;
                                        const ph=row.phone_num;
                                        const urg=row.urgency
                                        const bgrp=row.blood_type
                                        const tablebody = document.getElementById('tablebody3')
                                        const newRow = document.createElement('tr');
                                        newRow.setAttribute('id', 'donerh' + id);
                                        newRow.style.margin='10px'
                               
                                        newRow.innerHTML = `
                                        <th>${id}</th>
                                        <td>${user_name}</td>
                                        <td>${bgrp}</td>
                                        <td>${urg}</td>
                                        <td>${ph}</td>
                                        <td><button type="button" onclick="remove1(${id})" id="${id}" class="btn btn-danger">Remove</button></td> 
                                    `;
                                    tablebody.appendChild(newRow)
                                    
                                }
                            })
                
                                
                               
                            
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                })
                .catch(error => {
                    console.error('Error:', error);
                });
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
function display_admin()
{
    fetch('/doner_ex', {
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
                const ph =row.phone_number
                const age =row.age
                const gender =row.gender
                const bgrp =row.blood_group
                const mc =row.medical_conditions
                const add =row.address
                
                const tablebody = document.getElementById('tablebody2')
                const newRow = document.createElement('tr');
                newRow.setAttribute('id', 'doner' + id);
                // Add table cells (columns) to the new row
                // console.log(currentuser);
                if (verify == 1) {
                    console.log("admin login");
                    newRow.innerHTML = `
                <th scope="row">${id}</th>
                <td>${name}</td>
                <td><!-- Button trigger modal -->
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${id}">
                Launch static backdrop modal
              </button>
              
              <!-- Modal -->
              <div class="modal fade" id="staticBackdrop${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel${id}">Doner Information</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <div><span style="margin-right: 10px;"><H5>Doner Id:</H5> ${id}</span>
                    <span><H5>Doner Name:</H5> ${name}</span></div>
                    <br>
                    <div><span style="margin-right: 10px;"><H5>Phone Number:</H5> ${ph}</span>
                    <span><H5>Doner Age:</H5> ${age}</span></div>
                    <br>
                    <div><span style="margin-right: 10px;"><H5>Gender:</H5> ${gender}</span>
                    <span><H5>Blood Group:</H5> ${bgrp}</span></div>
                    <br>
                    <div><span><H5>Medical Condition:</H5> ${mc}</span></div>
                    <br>
                    <div><span><H5>Address:</H5> ${add}</span></div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" id="verify${id}"  onclick="verify(${id},${0})" class="btn btn-success">Unverify</button>
                      <button type="button" onclick="delete1(${id})" data-bs-dismiss="modal" id="${id}" class="btn btn-danger">Delete</button>
                   
                    </div>
                  </div>
                </div>
              </div></td>
              <hr>
                
            `;
                }

                else {
                    console.log("no login");
                    newRow.innerHTML = `
                    <th scope="row">${id}</th>
                    <td>${name}</td>
                    <td><!-- Button trigger modal -->
                  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop${id}">
                    View More Information
                  </button>
                  
                  <!-- Modal -->
                  <div class="modal fade" id="staticBackdrop${id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="staticBackdropLabel${id}">Doner Information</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <div><span style="margin-right: 10px;"><H5>Doner Id:</H5> ${id}</span>
                        <span><H5>Doner Name:</H5> ${name}</span></div>
                        <br>
                        <div><span style="margin-right: 10px;"><H5>Phone Number:</H5> ${ph}</span>
                        <span><H5>Doner Age:</H5> ${age}</span></div>
                        <br>
                        <div><span style="margin-right: 10px;"><H5>Gender:</H5> ${gender}</span>
                        <span><H5>Blood Group:</H5> ${bgrp}</span></div>
                        <br>
                        <div><span><H5>Medical Condition:</H5> ${mc}</span></div>
                        <br>
                        <div><span><H5>Address:</H5> ${add}</span></div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" id="verify${id}"  onclick="verify(${id},${1})" class="btn btn-success">verify</button>
                          <button type="button" onclick="delete1(${id})" data-bs-dismiss="modal" id="${id}" class="btn btn-danger">Delete</button>
                        
                        </div>
                      </div>
                    </div>
                  </div></td>
                    <hr>
                `;
                }

                // Append the new row to the table body
                tablebody.appendChild(newRow);
                // Do something with the data, e.g., display it
                // console.log(`ID: ${id}, Name: ${name}, Blood Type: ${bloodType}, Units: ${units}, Address: ${hospitalAddress}, Phone: ${phoneNum}, Urgency: ${urgency}`);
            });

        })
        .catch(error => {
            console.error('Error:', error);
        });
}