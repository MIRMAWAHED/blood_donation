document.addEventListener('DOMContentLoaded', function () {
    function handleSubmit(event) {
        event.preventDefault();
        const id = document.getElementById('doner_id').innerText
        const email = document.getElementById('staticEmail').innerText
        const name = document.getElementById('donername').innerText
        const ph = document.getElementById('doner_ph2').value
        const age = document.getElementById('doner_age').value
        const gender = document.getElementById('genderSelect').value
        const b_grp = document.getElementById('bloodgroup').value
        const m_con = document.getElementById('medcon').value
        const adrs = document.getElementById('address').value
        const data = {
            id: id,
            email: email,
            name: name,
            ph: ph,
            age: age,
            gender: gender,
            b_grp: b_grp,
            m_con: m_con,
            adrs: adrs,


        };
        fetch('/doner_ex', {
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
                    document.getElementById('doner_form').style.display = 'none';
                    document.getElementById('table3').style.display = 'block';
                    window.location.href = '../m';
                    event.target.removeEventListener('click', handleSubmit);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }

    document.getElementById('doner_form').addEventListener('submit', handleSubmit);
    

});