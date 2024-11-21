async function sendDataToServer(name, microid, units, amount,microGridId) {
    try {
        // ... (your existing code for sending data to the server)
        const response = await fetch(process.env.REACT_APP_BackendUrl+'/createTransactionBills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name, "microid": microid, "units": units, "amount": amount ,"microGridId":microGridId}),
        });
        
        const responseData = await response.json(); // Await the response text
        const simulationResponse = await fetch(process.env.REACT_APP_BackendUrl+"/simulation/requireUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "userName": responseData._id, "energyRequired": units, "microGridId": microGridId })
        })
        console.log('Server response:', responseData);
    } catch (error) {
        console.error('Error sending data to the server:', error);
        // Handle errors, e.g., show an error message to the user
    }
};
