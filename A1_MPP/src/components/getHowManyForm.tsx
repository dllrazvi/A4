import React, { useState } from 'react';
import './GetF1DriverByIdForm.css'; // Import the CSS file

interface Props {
    driverHistory: { DriverName: string; _id: string }[];
    onSubmit: (id: string, count: number) => void;
}

function GetDriverRaceHistoryByIdForm({ driverHistory, onSubmit }: Props) {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Find the driver ID by name
        const driver = driverHistory.find(driver => driver.DriverName === name);
        if (!driver) {
            alert('Driver not found');
            return;
        }

        try {
            // Send request to backend to count entries
            const response = await fetch('https://ubbprojects-badeavlad.onrender.com/api/countDriverRaceHistoryOccurrences', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: driver._id })
            });
            const data = await response.json();
            // Call onSubmit function with ID and count
            onSubmit(driver._id, data.count);
        } catch (error) {
            console.error('Error counting driver race history occurrences:', error);
            alert('Error counting driver race history occurrences. Please try again later.');
        }
    };

    return (
        <div className="get-f1-driver-by-id-container">
            <header>
                <h2 className="title">Get Driver Race History by Name</h2>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="form-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="button get-button">Get Race History</button>
            </form>
        </div>
    );
}

export default GetDriverRaceHistoryByIdForm;
