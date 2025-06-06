import React, { useState } from 'react';
import axios from 'axios';
import './AddF1DriverForm.css';

interface AddF1DriverFormProps {
    onAdd: () => void;
}

const AddF1DriverForm: React.FC<AddF1DriverFormProps> = ({ onAdd }) => {
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [age, setAge] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !team || !age) {
            alert('Please fill in all fields');
            return;
        }
        const ageValue = parseInt(age);
        if (isNaN(ageValue) || ageValue <= 0) {
            alert('Please enter a valid age');
            return;
        }
        try {
            await axios.post('https://ubbprojects-badeavlad.onrender.com/api/f1drivers', { DriverName: name, Team: team, Age: ageValue });
            onAdd();
            setName('');
            setTeam('');
            setAge('');
        } catch (error) {
            console.error('Error adding F1 driver:', error);
            alert('Error adding F1 driver. Please try again later.');
        }
    };

    return (
        <div className="add-f1-driver-container">
            <header>
                <h1 className="title">Add F1 Driver</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input className="form-field" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Team:</label>
                    <input className="form-field" type="text" value={team} onChange={(e) => setTeam(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className="form-label">Age:</label>
                    <input className="form-field" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
                <button className='button' type="submit">Add Driver</button>
            </form>
        </div>
    );
}

export default AddF1DriverForm;
