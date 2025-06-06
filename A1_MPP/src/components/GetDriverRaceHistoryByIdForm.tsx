import React, { useState } from 'react';
import './GetF1DriverByIdForm.css'; // Import the CSS file

interface Props {
    driverHistory: { DriverName: string; _id: string; RaceName: string; Position: number; Points: number }[];
}

function GetDriverRaceHistoryByIdForm({ driverHistory }: Props) {
    const [name, setName] = useState('');
    const [driverRaceHistory, setDriverRaceHistory] = useState<{ raceName: string; position: number; points: number } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Find the driver race history by name
        const history = driverHistory.find(history => history.DriverName === name);
        if (!history) {
            alert('Driver race history not found');
            return;
        }

        try {
            // Get driver race history details
            const { RaceName, Position, Points } = history;
            // Update state with driver race history info
            setDriverRaceHistory({ raceName: RaceName, position: Position, points: Points });
        } catch (error) {
            console.error('Error getting driver race history info:', error);
            alert('Error getting driver race history info. Please try again later.');
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
            {driverRaceHistory && (
                <div className="driver-race-history-info">
                    <p><strong>Race Name:</strong> {driverRaceHistory.raceName}</p>
                    <p><strong>Position:</strong> {driverRaceHistory.position}</p>
                    <p><strong>Points:</strong> {driverRaceHistory.points}</p>
                </div>
            )}
        </div>
    );
}

export default GetDriverRaceHistoryByIdForm;
