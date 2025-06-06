import React, { useState } from 'react';
import './GetF1DriverByIdForm.css'; // Import the CSS file

interface Props {
    drivers: { DriverName: string; _id: string; Team: string; Age: number }[];
}

function GetF1DriverByIdForm({ drivers }: Props) {
    const [name, setName] = useState('');
    const [driverInfo, setDriverInfo] = useState<{ team: string; age: number } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Find the driver by name
        const driver = drivers.find(driver => driver.DriverName === name);
        if (!driver) {
            alert('Driver not found');
            return;
        }

        try {
            // Get driver's team and age
            const { Team, Age } = driver;
            // Update state with driver's info
            setDriverInfo({ team: Team, age: Age });
        } catch (error) {
            console.error('Error getting driver info:', error);
            alert('Error getting driver info. Please try again later.');
        }
    };

    return (
        <div className="get-f1-driver-by-id-container">
            <header>
                <h2 className="title">Get F1 Driver Info by Name</h2>
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
                <button type="submit" className="button get-button">Get Info</button>
            </form>
            {driverInfo && (
                <div className="driver-info">
                    <p><strong>Team:</strong> {driverInfo.team}</p>
                    <p><strong>Age:</strong> {driverInfo.age}</p>
                </div>
            )}
        </div>
    );
}

export default GetF1DriverByIdForm;
