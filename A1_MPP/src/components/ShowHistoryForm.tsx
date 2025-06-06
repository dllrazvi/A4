// ShowDriverHistoryList.tsx
import React, { useState } from 'react';
import './ShowF1DriverList.css';

interface DriverRaceHistory {
    _id: string;
    DriverId: string;
    DriverName: string;
    RaceName: string;
    Position: number;
    Points: number;
}

interface DriverHistoryListProps {
    driverHistory: DriverRaceHistory[];
    currentPage: number;
    perPage: number;
    setCurrentPage: (page: number) => void;
}

const ShowDriverHistoryList: React.FC<DriverHistoryListProps> = ({ driverHistory, currentPage, perPage, setCurrentPage }) => {
    const [startIndex, setStartIndex] = useState<number>(0);

    const endIndex = startIndex + perPage;

    const totalPages = Math.ceil(driverHistory.length / perPage);

    const handlePreviousPage = () => {
        if (startIndex - perPage >= 0) {
            setStartIndex(startIndex - perPage);
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (endIndex < driverHistory.length) {
            setStartIndex(startIndex + perPage);
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="f1-driver-list-container">
            <h2 className="list-title">Driver Race History</h2>
            <ul className="driver-list">
                {driverHistory.slice(startIndex, endIndex).map((entry: DriverRaceHistory) => (
                    <li key={entry._id} className="driver-list-item">
                        <div className='driver-list-item-content'>
                            Driver Name: {entry.DriverName}, Race Name: {entry.RaceName}, Position: {entry.Position}, Points: {entry.Points}
                        </div>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={handlePreviousPage}>Previous</button>
                <span>{currentPage} of {totalPages}</span>
                <button disabled={endIndex >= driverHistory.length} onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
}

export default ShowDriverHistoryList;
