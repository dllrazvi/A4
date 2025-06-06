import React, { useState } from 'react';
import axios from 'axios';
import './UpdateF1DriverForm.css'; // Import the CSS file

interface Props {
    onUpdate: (id: string) => void; // Change the type of id to string
    driverHistory: { DriverName: string; _id: string }[]; // Change the type of _id to string
}

function UpdateDriverRaceHistoryForm({ onUpdate, driverHistory }: Props) {
    const [name, setName] = useState('');
    const [raceName, setRaceName] = useState('');
    const [position, setPosition] = useState('');
    const [points, setPoints] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Find the driver race history by name and get its ID
        const historyToUpdate = driverHistory.find(history => history.DriverName === name);
        if (!historyToUpdate) {
            alert('Driver race history not found');
            return;
        }

        try {
            // Prepare the updated data
            const updatedData = {
                DriverName: name, // Change to DriverName
                RaceName: raceName,
                Position: parseInt(position), // Convert position to number
                Points: parseInt(points) // Convert points to number
            };

            // Send PUT request to the backend API with the updated data
            await axios.put(`https://ubbprojects-badeavlad.onrender.com/api/driverracehistory/${historyToUpdate._id}`, updatedData);

            // Call the onUpdate function to update the driver race history list
            onUpdate(historyToUpdate._id);

            // Clear the input fields
            setName('');
            setRaceName('');
            setPosition('');
            setPoints('');
        } catch (error) {
            console.error('Error updating driver race history:', error);
            alert('Error updating driver race history. Please try again later.');
        }
    };

    return (
        <div className="update-f1-driver-container">
            <title>
                Update Driver Race History
            </title>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Update Driver Race History<br></br>Driver Name:</label>
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
                    <label htmlFor="raceName" className="form-label">Race Name:</label>
                    <input
                        type="text"
                        id="raceName"
                        className="form-field"
                        value={raceName}
                        onChange={(e) => setRaceName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position" className="form-label">Position:</label>
                    <input
                        type="number"
                        id="position"
                        className="form-field"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="points" className="form-label">Points:</label>
                    <input
                        type="number"
                        id="points"
                        className="form-field"
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button update-button">Update</button>
            </form>
        </div>
    );
}

export default UpdateDriverRaceHistoryForm;
