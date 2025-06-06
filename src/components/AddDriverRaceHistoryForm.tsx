// AddDriverRaceHistoryForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddF1DriverForm.css';

interface AddDriverRaceHistoryFormProps {
    onAdd: () => void;
}

interface Driver {
    _id: string;
    DriverName: string;
}

const AddDriverRaceHistoryForm: React.FC<AddDriverRaceHistoryFormProps> = ({ onAdd }) => {
    const [driverName, setDriverName] = useState('');
    const [raceName, setRaceName] = useState('');
    const [position, setPosition] = useState('');
    const [points, setPoints] = useState('');
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [selectedDriverId, setSelectedDriverId] = useState<string>('');

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get<Driver[]>('https://ubbprojects-badeavlad.onrender.com/api/f1drivers');
                setDrivers(response.data || []);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                // Handle error
            }
        };

        fetchDrivers();
    }, []);

    const fetchDriverId = (name: string) => {
        const selectedDriver = drivers.find(driver => driver.DriverName === name);
        if (selectedDriver) {
            setSelectedDriverId(selectedDriver._id);
        } else {
            setSelectedDriverId('');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!driverName || !raceName || !position || !points) {
            alert('Please fill in all fields');
            return;
        }
        const positionValue = parseInt(position);
        const pointsValue = parseInt(points);
        if (isNaN(positionValue) || isNaN(pointsValue) || positionValue <= 0 || pointsValue <= 0) {
            alert('Please enter valid position and points');
            return;
        }

        if (!selectedDriverId) {
            alert('Please select a valid driver');
            return;
        }

        try {
            await axios.post('https://ubbprojects-badeavlad.onrender.com/api/driverracehistory', {
                DriverId: selectedDriverId,
                DriverName: driverName,
                RaceName: raceName,
                Position: positionValue,
                Points: pointsValue
            });
            onAdd();
            setDriverName('');
            setRaceName('');
            setPosition('');
            setPoints('');
        } catch (error) {
            console.error('Error adding driver race history:', error);
            alert('Error adding driver race history. Please try again later.');
        }
    };

    return (
        <div className="add-f1-driver-container">
            <header>
                <h1 className="title">Add Driver Race History</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Driver Name:</label>
                    <input className="form-field" type="text" value={driverName} onChange={(e) => {
                        setDriverName(e.target.value);
                        fetchDriverId(e.target.value);
                    }} />
                </div>
                <div className="form-group">
                    <label className="form-label">Race Name:</label>
                    <input className="form-field" type="text" value={raceName} onChange={(e) => setRaceName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Position:</label>
                    <input className="form-field" type="number" value={position} onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Points:</label>
                    <input className="form-field" type="number" value={points} onChange={(e) => setPoints(e.target.value)} />
                </div>
                <button className='button' type="submit">Add Race History</button>
            </form>
        </div>
    );
}

export default AddDriverRaceHistoryForm;
