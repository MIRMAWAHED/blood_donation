document.addEventListener('DOMContentLoaded', function(){
    const requestTypeRadios = document.querySelectorAll('input[name="btnradio1"]');

    // Add a change event listener to the radio buttons
    requestTypeRadios.forEach(radio => {
        console.log("fgfd")
        radio.addEventListener('change', function () {
            // Check if the "Blood Request" radio button is selected
            if (this.value === 'signin' && this.checked) {
                // Redirect to /request.html
                window.location.href = '../m';
            }
            if (this.value === 'Request' && this.checked) {
                // Redirect to /request.html
                window.location.href = './request.html';
            }
            else if (this.value === 'myrequest' && this.checked) {
                // Redirect to /request.html
                window.location.href = './myrequest.html';
            }
        });
    });
});