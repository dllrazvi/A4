import React from 'react';
import './ShowF1DriverList.css';

interface F1DriverListProps {
    drivers: any[]; // Assuming the shape of driver objects from MongoDB
    currentPage: number;
    perPage: number;
    isLoading: boolean;
    setCurrentPage: (page: number) => void;
}

const ShowF1DriverList: React.FC<F1DriverListProps> = ({ drivers, currentPage, perPage, isLoading, setCurrentPage }) => {
    console.log('Drivers:', drivers);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!Array.isArray(drivers) || drivers.length === 0) {
        console.error("Drivers is not an array or is empty:", drivers);
        return <div>No drivers available</div>;
    }

    // Calculate index range for displaying drivers
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = Math.min(startIndex + perPage, drivers.length);

    return (
        <div className="f1-driver-list-container">
            <h2 className="list-title">F1 Drivers</h2>
            <ul className="driver-list">
                {drivers.slice(startIndex, endIndex).map((driver: any) => {
                    return (
                        <li key={driver._id} className="driver-list-item">
                            <div className='driver-list-item-content'>
                                Name: {driver.DriverName}, Team: {driver.Team}, Age: {driver.Age}
                            </div>
                        </li>
                    );
                })}
            </ul>
            {/* Pagination controls */}
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                <span>{currentPage} of {Math.ceil(drivers.length / perPage)}</span>
                <button disabled={endIndex >= drivers.length} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>
        </div>
    );
}

export default ShowF1DriverList;
