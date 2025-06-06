// DeleteF1DriverForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeleteF1DriverForm.css';

interface Props {
    onDelete: () => void;
    driverHistory: DriverRaceHistory[];
}

interface DriverRaceHistory {
    _id: string;
    DriverId: string;
    DriverName: string;
    RaceName: string;
    Position: number;
    Points: number;
}

const DeleteF1DriverForm: React.FC<Props> = ({ onDelete }) => {
    const [name, setName] = useState('');
    const [driverHistory, setDriverHistory] = useState<DriverRaceHistory[]>([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get<DriverRaceHistory[]>('https://ubbprojects-badeavlad.onrender.com/api/driverracehistory');
                setDriverHistory(response.data || []);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                // Handle error
            }
        };

        fetchDrivers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name) {
            alert('Please enter a driver name');
            return;
        }

        const driverToDelete = driverHistory.find(driver => driver.DriverName === name);

        if (!driverToDelete) {
            alert('Driver not found');
            return;
        }

        try {
            await axios.delete(`https://ubbprojects-badeavlad.onrender.com/api/driverracehistory/${driverToDelete._id}`);
            onDelete();
            setName('');
        } catch (error) {
            console.error('Error deleting driver race history:', error);
            alert('Error deleting driver race history. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Delete F1 Driver Race History</h2>
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
