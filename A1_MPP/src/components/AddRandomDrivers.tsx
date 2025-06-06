import React, { useState } from 'react';
import axios from 'axios';
import './AddF1DriverForm.css';

interface AddRandomDriversFormProps {
    onGenerate: () => void;
}

const AddRandomDriversForm: React.FC<AddRandomDriversFormProps> = ({ onGenerate }) => {
    const [howMany, setHowMany] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!howMany) {
            alert('Please enter the number of drivers to generate');
            return;
        }
        const howManyValue = parseInt(howMany);
        if (isNaN(howManyValue) || howManyValue <= 0) {
            alert('Please enter a valid number');
            return;
        }
        try {
            await axios.post(`https://ubbprojects-badeavlad.onrender.com/api/f1drivers/generate/${howMany}}`);
            onGenerate();
            setHowMany('');
        } catch (error) {
            console.error('Error generating random drivers:', error);
            alert('Error generating random drivers. Please try again later.');
        }
    };

    return (
        <div className="add-f1-driver-container">
            <header>
                <h1 className="title">Generate Random Drivers</h1>
            </header>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">How Many:</label>
                    <input className="form-field" type="number" value={howMany} onChange={(e) => setHowMany(e.target.value)} />
                </div>
                <button className='button' type="submit">Generate Drivers</button>
            </form>
        </div>
    );
}

export default AddRandomDriversForm;
