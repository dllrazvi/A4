import React, { useState } from 'react';
import axios from 'axios';
import './AddF1DriverForm.css';

interface GenerateRandomDriversFormProps {
    onGenerate: () => Promise<void>; // Define the onGenerate prop with the appropriate type
}

const GenerateRandomDriversForm: React.FC<GenerateRandomDriversFormProps> = ({ onGenerate }) => {
    const [numberOfDrivers, setNumberOfDrivers] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://ubbprojects-badeavlad.onrender.com/api/f1drivers/generate/' + numberOfDrivers);
            onGenerate(); // Call the onGenerate function after successfully generating random drivers
        } catch (error) {
            console.error('Error generating random drivers:', error);
            // Handle error
        }
    };

    return (
        <div>
            <h2>Generate Random F1 Drivers</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Number of Drivers:
                    <input type="number" value={numberOfDrivers} onChange={(e) => setNumberOfDrivers(e.target.value)} />
                </label>
                <button type="submit">Generate</button>
            </form>
        </div>
    );
};

export default GenerateRandomDriversForm;
