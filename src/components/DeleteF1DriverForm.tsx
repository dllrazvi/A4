import React, { useState } from 'react';
import axios from 'axios';
import './DeleteF1DriverForm.css';

interface Props {
    onDelete: (id: string) => void;
    drivers: { DriverName: string; _id: string }[]; // Update _id to be of type string
}

function DeleteF1DriverForm({ onDelete, drivers }: Props) {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Drivers:', drivers);
        
        // Check if the drivers array is empty or undefined
        if (!drivers || drivers.length === 0) {
            alert('No drivers found');
            return;
        }
    
        // Find the driver by name and get its ID
        const driverToDelete = drivers.find(driver => driver.DriverName === name);
        console.log('Driver to delete:', driverToDelete);
        if (!driverToDelete) {
            alert('Driver not found');
            return;
        }
    
        try {
            // Send delete request to the backend API with the driver's ID
            await axios.delete(`https://ubbprojects-badeavlad.onrender.com/api/f1drivers/${driverToDelete._id}`);
            // Call the onDelete function to update the drivers list
            onDelete(driverToDelete._id);
            // Clear the input field
            setName('');
        } catch (error) {
            console.error('Error deleting driver:', error);
            alert('Error deleting driver. Please try again later.');
        }
    };
    
    
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Delete F1 Driver</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Delete</button>
        </form>
    );
}

export default DeleteF1DriverForm;
