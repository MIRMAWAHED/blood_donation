document.addEventListener('DOMContentLoaded', function () {
  // function handleSubmit(event) {
  //     console.log("a6")
  //     let current_id
  //     event.preventDefault();
  //     fetch('/current', {
  //         method: 'GET',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         }
  //     })
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             console.log("nnns")
  //             return response.text(); // Parse the response as text
  //         })
  //         .then(result => {
  //             console.log("b6")
  //             const parsedResult = JSON.parse(result);
  //         parsedResult.forEach(row => {
  //             current_id = row.current_id
  //         })
  //         })
  //         .catch(error => {
  //             console.error('Error:', error);
  //         });
  //         console.log("c6")
  //     const name = document.getElementById('patientname').value
  //     const ph = document.getElementById('patient_ph2').value
  //     const units =document.getElementById('units').value
  //     const urg  =document.getElementById('urg').value
  //     const b_grp = document.getElementById('bloodgroup1').value

  //     const adrs = document.getElementById('address1').value
  //     const data = {
  //         id: current_id,
  //         name: name,
  //         ph: ph,
  //         units:units,
  //         urg:urg,
  //         b_grp: b_grp,
  //         adrs: adrs,
  //     };
  //     console.log("c16")
  //     fetch('/fill_req', {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(data)
  //     })
  //         .then(response => response.json())
  //         .then(result => {
  //             // Handle the server's response here
  //             console.log("d6")
  //             console.log(result);
  //             if (result.success == true) {
  //                 alert("Request Send");
  //             }


  //         })
  //         .catch(error => {
  //             console.error('Error:', error);
  //         });

  // }
  function handleSubmit(event) {
    event.preventDefault();

    let current_id;

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
        const parsedResult = JSON.parse(result);
        parsedResult.forEach(row => {
          current_id = row.current_id;
        });

        // Continue with the rest of your code here
        const name = document.getElementById('patientname').value;
        const ph = document.getElementById('patient_ph2').value;
        const units = document.getElementById('units').value;
        const urg = document.getElementById('urg').value;
        const b_grp = document.getElementById('bloodgroup1').value;
        const adrs = document.getElementById('address1').value;
        const data = {
          id: current_id,
          name: name,
          ph: ph,
          units: units,
          urg: urg,
          b_grp: b_grp,
          adrs: adrs,
        };

        fetch('/fill_req', {
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
              alert("Request Send");
              document.getElementById('patientname').value = "";
              document.getElementById('patient_ph2').value = "";
              document.getElementById('units').value = "";
              document.getElementById('urg').value = "";
              document.getElementById('bloodgroup1').value = "";
              document.getElementById('address1').value = "";
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  document.getElementById('request_form').addEventListener('submit', handleSubmit);






})