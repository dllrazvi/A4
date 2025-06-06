import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowF1DriverList from './components/ShowF1DriverList';
import DeleteF1DriverForm from './components/DeleteF1DriverForm';
import AddF1DriverForm from './components/AddF1DriverForm';
import UpdateF1DriverForm from './components/UpdateF1DriverForm';
import GetF1DriverByIdForm from './components/GetF1DriverByIdForm';
import GenerateRandomDriversForm from './components/generateRandomDrivers';
import ShowDriverHistoryList from './components/ShowHistoryForm';
import AddDriverRaceHistoryForm from './components/AddDriverRaceHistoryForm';
import DeleteDriverRaceHistoryForm from './components/DeleteDriverRaceHistoryForm';
import UpdateDriverRaceHistoryForm from './components/UpdateDriverRaceHistoryForm';
import GetDriverRaceHistoryByIdForm from './components/GetDriverRaceHistoryByIdForm';
import GenerateRandomDriverRaceHistoryForm from './components/generateRandomDriverRaceHistory';
import './App.css';

interface F1Driver {
    _id: string;
    DriverName: string;
    Team: string;
    Age: number
}

interface DriverRaceHistory {
    _id: string;
    DriverId: string;
    DriverName: string;
    RaceName: string;
    Position: number;
    Points: number;
}

function MainApp() {
    const [drivers, setDrivers] = useState<F1Driver[]>([]);
    const [driverHistory, setDriverHistory] = useState<DriverRaceHistory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage] = useState<number>(10);
    const [_, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get<F1Driver[]>(`https://ubbprojects-badeavlad.onrender.com/api/f1drivers`);
                setDrivers(response.data || []);
                const totalCount = response.headers['x-total-count'];
                setTotalPages(Math.ceil(totalCount / perPage));
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching drivers:', error);
                setError('Error fetching drivers - Server is closed');
                setIsLoading(false);
            }
        };

        fetchDrivers();
    }, [perPage]);

    useEffect(() => {
        const handleOnlineStatusChange = () => {
            setIsOnline(navigator.onLine);
        };
        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);
        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, []);

    useEffect(() => {
        const fetchDriverHistory = async () => {
            try {
                const response = await axios.get<DriverRaceHistory[]>(`https://ubbprojects-badeavlad.onrender.com/api/driverracehistory`);
                setDriverHistory(response.data || []);
            } catch (error) {
                console.error('Error fetching driver race history:', error);
                setError('Error fetching driver race history - Server is closed');
            }
        };

        fetchDriverHistory();
    }, []);

    const handleAddDriver = async () => {
        try {
            const updatedDriversResponse = await axios.get<F1Driver[]>('https://ubbprojects-badeavlad.onrender.com/api/f1drivers');
            setDrivers(updatedDriversResponse.data || []);
        } catch (error) {
            console.error('Error adding driver:', error);
        }
    };

    const handleGenerateRandomDrivers = async () =>
        {
            try {
                const updatedDriversResponse = await axios.get<F1Driver[]>('https://ubbprojects-badeavlad.onrender.com/api/f1drivers');
                setDrivers(updatedDriversResponse.data || []);
            } catch (error) {
                console.error('Error adding driver:', error);
            }
            finally{
                const updatedDriversResponse = await axios.get<F1Driver[]>('https://ubbprojects-badeavlad.onrender.com/api/f1drivers');
                setDrivers(updatedDriversResponse.data || []);
            }
        };
    
    const handleDeleteDriver = async () => {
        try {
            const updatedDriversResponse = await axios.get<F1Driver[]>('https://ubbprojects-badeavlad.onrender.com/api/f1drivers');
            setDrivers(updatedDriversResponse.data || []);
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    const handleUpdateDriver = async () => {
        try {
            const updatedDriversResponse = await axios.get<F1Driver[]>('https://ubbprojects-badeavlad.onrender.com/api/f1drivers');
            setDrivers(updatedDriversResponse.data || []);
        } catch (error) {
            console.error('Error updating driver:', error);
        }
    };

    const handleAddDriverRaceHistory = async () => {
        try {
            const updatedDriverHistoryResponse = await axios.get<DriverRaceHistory[]>('https://ubbprojects-badeavlad.onrender.com/api/driverracehistory');
            setDriverHistory(updatedDriverHistoryResponse.data || []);
        } catch (error) {
            console.error('Error adding driver race history:', error);
        }
    };

    const handleDeleteDriverRaceHistory = async () => {
        try {
            const updatedDriverHistoryResponse = await axios.get<DriverRaceHistory[]>('https://ubbprojects-badeavlad.onrender.com/api/driverracehistory');
            setDriverHistory(updatedDriverHistoryResponse.data || []);
        } catch (error) {
            console.error('Error deleting driver race history:', error);
        }
    };

    const handleUpdateDriverRaceHistory = async () => {
        try {
            const updatedDriverHistoryResponse = await axios.get<DriverRaceHistory[]>('https://ubbprojects-badeavlad.onrender.com/api/driverracehistory');
            setDriverHistory(updatedDriverHistoryResponse.data || []);
        } catch (error) {
            console.error('Error updating race history:', error);
        }
    };

    const handleGenerateRandomDriverRaceHistory = async () => {
        try {
            const updatedDriverHistoryResponse = await axios.get<DriverRaceHistory[]>('https://ubbprojects-badeavlad.onrender.com/api/driverracehistory');
            setDriverHistory(updatedDriverHistoryResponse.data || []);
        } catch (error) {
            console.error('Error generating random race history:', error);
        }
    };

        

    return (
        <div className="App">
            <header className="App-header">
                <h1>F1 Driver Manager</h1>
                {isLoading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {!isOnline && <p>No internet connection</p>}
                <table>
                    <tbody>
                        <tr>
                            <td>
                            <ShowF1DriverList drivers={drivers} currentPage={currentPage} perPage={perPage} isLoading={isLoading} setCurrentPage={setCurrentPage} />
                            </td>
                            <td>
                                <AddF1DriverForm onAdd={handleAddDriver} />
                            </td>
                            <td>
                                <DeleteF1DriverForm onDelete={handleDeleteDriver} drivers={drivers} />
                            </td>
                        </tr>
                        <tr>
                        <td>
                                <UpdateF1DriverForm onUpdate={handleUpdateDriver} drivers={drivers} />
                            </td>
                            <td>
                                <GetF1DriverByIdForm drivers={drivers} />
                            </td>
                            <td>
                                <GenerateRandomDriversForm onGenerate={handleGenerateRandomDrivers} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h1>F1 Driver Race History</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                    <ShowDriverHistoryList
                                        driverHistory={driverHistory}
                                        currentPage={currentPage}
                                        perPage={perPage}
                                        setCurrentPage={setCurrentPage}
                                    />
                            </td>
                            <td>
                                <AddDriverRaceHistoryForm onAdd={handleAddDriverRaceHistory} />
                            </td>
                            <td>
                                <DeleteDriverRaceHistoryForm onDelete={handleDeleteDriverRaceHistory} driverHistory={driverHistory}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <UpdateDriverRaceHistoryForm onUpdate={handleUpdateDriverRaceHistory} driverHistory={driverHistory} />
                            </td>
                            <td>
                                <GetDriverRaceHistoryByIdForm driverHistory={driverHistory} />
                            </td>
                            <td>
                                <GenerateRandomDriverRaceHistoryForm onGenerate={handleGenerateRandomDriverRaceHistory} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </header>
        </div>
    );
}

export default MainApp;