import React, { useState } from 'react';
import axios from 'axios';
import './AddF1DriverForm.css';

interface GenerateRandomDriverRaceHistoryFormProps {
    onGenerate: () => Promise<void>; // Define the onGenerate prop with the appropriate type
}

const GenerateRandomDriverRaceHistoryForm: React.FC<GenerateRandomDriverRaceHistoryFormProps> = ({ onGenerate }) => {
    const [numberOfEntries, setNumberOfEntries] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('https://ubbprojects-badeavlad.onrender.com/driverracehistory/generate/' + numberOfEntries);
            onGenerate(); // Call the onGenerate function after successfully generating random driver race history entries
        } catch (error) {
            console.error('Error generating random driver race history entries:', error);
            // Handle error
        }
    };

    return (
        <div>
            <h2>Generate Random Driver Race History Entries</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Number of Entries:
                    <input type="number" value={numberOfEntries} onChange={(e) => setNumberOfEntries(e.target.value)} />
                </label>
                <button type="submit">Generate</button>
            </form>
        </div>
    );
};

export default GenerateRandomDriverRaceHistoryForm;
