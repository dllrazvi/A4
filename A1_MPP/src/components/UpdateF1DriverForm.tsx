import React, { useState } from 'react';
import axios from 'axios';
import './UpdateF1DriverForm.css'; // Import the CSS file

interface Props {
    onUpdate: (id: string) => void; // Change the type of id to string
    drivers: { DriverName: string; _id: string }[]; // Change the type of _id to string
}

function UpdateF1DriverForm({ onUpdate, drivers }: Props) {
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Find the driver by name and get its ID
        const driverToUpdate = drivers.find(driver => driver.DriverName === name);
        if (!driverToUpdate) {
            alert('Driver not found');
            return;
        }

        try {
            // Prepare the updated data
            const updatedData = {
                DriverName: name, // Change to DriverName
                Team: team,
                Age: parseInt(age) // Convert age to number
            };

            // Send PUT request to the backend API with the updated data
            await axios.put(`https://ubbprojects-badeavlad.onrender.com/api/f1drivers/${driverToUpdate._id}`, updatedData);

            // Call the onUpdate function to update the drivers list
            onUpdate(driverToUpdate._id);

            // Clear the input fields
            setName('');
            setTeam('');
            setAge('');
        } catch (error) {
            console.error('Error updating driver:', error);
            alert('Error updating driver. Please try again later.');
        }
    };

    return (
        <div className="update-f1-driver-container">
            <title>
                <h2 className="title">Update F1 Driver</h2>
            </title>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Update F1 Driver <br></br>Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="team" className="form-label">Team:</label>
                    <input
                        type="text"
                        id="team"
                        className="form-field"
                        value={team}
                        onChange={(e) => setTeam(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="age" className="form-label">Age:</label>
                    <input
                        type="number"
                        id="age"
                        className="form-field"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button update-button">Update</button>
            </form>
        </div>
    );
}

export default UpdateF1DriverForm;
