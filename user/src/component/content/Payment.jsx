import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Payment = () => {
    const [form, setForm] = useState({
        name: '',
        number: ''
    });
    const [amount, setAmount] = useState(0);

    // Handle form input changes
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle amount input change
    const handleAmountChange = (e) => {
        const parsedValue = parseFloat(e.target.value);
        setAmount(parsedValue);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the backend API
            const response = await axios.post('http://localhost:8080/api/payment-post', {
                name: form.name,
                number: form.number,
                amount: amount
            });

            // Redirect to the payment URL returned by the backend
            window.location.href = response.data;
        } catch (error) {
            console.error("Payment Submission Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={form.name}  // Ensure the form is a controlled component
                    onChange={handleChange} 
                    required 
                    className="border rounded-lg p-2 w-full"
                />
            </div>
            <div>
                <label className="block text-gray-700">Mobile Number:</label>
                <input 
                    type="text" 
                    name="number" 
                    value={form.number}  // Ensure the form is a controlled component
                    onChange={handleChange} 
                    required 
                    className="border rounded-lg p-2 w-full"
                />
            </div>
            <div>
                <label className="block text-gray-700">Amount:</label>
                <input 
                    type="number" 
                    value={amount}  // Ensure the amount is a controlled component
                    onChange={handleAmountChange} 
                    required 
                    className="border rounded-lg p-2 w-full"
                />
            </div>
            <button 
                type="submit" 
                className='border rounded-lg bg-green-700 text-white font-bold p-3 w-full'
            >
                Pay Now
            </button>
        </form>
    );
};

export default Payment;



// import React, { useState } from 'react'
// import axios from 'axios';
// const Payment = () => {
//     const [loading, setLoading]=useState(false)
//     const data={
//         name:'Aman',
//         amount:1,
//         number:'9999999999',
//         MUID:'MUID'+Date.now(),
//         transactionId:'T'+Date.now()
//     }

//     const handlePayment=(e)=>{
//         e.preventDefault()
//         setLoading(true)
//         axios.post('api/payment',{...data}).then(res=>{
//             setTimeout(()=>{
//                 setLoading(false);
//             },1500)
//         })
//     }
//   return (
//     <div className="payment-container">
//       <h2>Payment Form</h2>
//      <button onClick={handlePayment} className='border p-3 bg-green-600 text-white'>submit</button>
//     </div>
//   )
// }

// export default Payment