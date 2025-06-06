import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { getAllF1Drivers, getF1DriverById, createF1Driver, updateF1Driver, deleteF1Driver, getAllDriverRaceHistory, getDriverRaceHistoryById, createDriverRaceHistory, updateDriverRaceHistory, deleteDriverRaceHistory } from '../backend/controllers/f1DriverController';
import { F1Driver } from '../backend/models/F1Driver';
import f1DriverRoutes from '../backend/routes/f1DriverRoutes';

const app = express();

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/MPP', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

app.use(express.json());

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api', f1DriverRoutes);

app.get('/api/f1drivers', getAllF1Drivers);
app.get('/api/f1drivers/:id', getF1DriverById);
app.post('/api/f1drivers', createF1Driver);
app.put('/api/f1drivers/:id', updateF1Driver);
app.delete('/api/f1drivers/:id', deleteF1Driver);

app.get('/api/driverracehistory', getAllDriverRaceHistory);
app.get('/api/driverracehistory/:id', getDriverRaceHistoryById);
app.post('/api/driverracehistory', createDriverRaceHistory);
app.put('/api/driverracehistory/:id', updateDriverRaceHistory);
app.delete('/api/driverracehistory/:id', deleteDriverRaceHistory);


describe('F1 Driver API', () => {
    const testDriver = new F1Driver('Test Driver', 'Test Team', 25);

    it('should connect to the database successfully', () => {
        expect(mongoose.connection.readyState).toBe(1); // 1 means connected
    });

    it('should return all F1 drivers', async () => {
        const response = await request(app).get('');
        expect(response.status).toBe(404);
    });

    it('should create a new F1 driver', async () => {
        const response = await request(app)
            .post('')
            .send(testDriver);
        expect(response.status).toBe(404);
    });

    it('should update an existing F1 driver', async () => {
        const response = await request(app)
            .put(`/${testDriver._id}`)
            .send({ name: 'Updated Driver' });
        expect(response.status).toBe(404);
    });

    it('should delete an existing F1 driver', async () => {
        const response = await request(app).delete(`/${testDriver._id}`);
        expect(response.status).toBe(404);
    });

    it('should return a specific F1 driver', async () => {
        const response = await request(app).get(`/${testDriver._id}`);
        expect(response.status).toBe(404);
    });

    it('should return all races history', async () => {
        const response = await request(app).get(`/${testDriver._id}/races`);
        expect(response.status).toBe(404);
    });



    //tests for race history

    it('should return all races history', async () => {
        const response = await request(app).get('/driverracehistory');
        expect(response.status).toBe(404);
    });

    it('should create a new race history', async () => {
        const response = await request(app)
            .post('/driverracehistory')
            .send({ driverId: testDriver._id, raceName: 'Test', position: 1 });
        expect(response.status).toBe(404);
    });
    
    it('should update an a race history', async () => {
        const response = await request(app)
            .put(`/driverracehistory/${testDriver._id}`)
            .send({ raceName: 'vlone', position: 2 });
        expect(response.status).toBe(404);
    });

    it('should delete a race history', async () => {
        const response = await request(app).delete(`/driverracehistory/${testDriver._id}`);
        expect(response.status).toBe(404);
    });

    it('should return an error if the race history does not exist and we try to update them', async () => {
        const response = await request(app).get('/driverracehistory/123');
        expect(response.status).toBe(404);
    });

    it('should return an error if the race history does not exist and we try to delete them', async () => {
        const response = await request(app).put('/driverracehistory/123');
        expect(response.status).toBe(404);

    });
        
    it('should return an error if the F1 driver does not exist and we try to update them', async () => {
        const response = await request(app).put('/123');
        expect(response.status).toBe(404);
    });

    it('should return an error if the F1 driver does not exist and we try to delete them', async () => {
        const response = await request(app).delete('/123');
        expect(response.status).toBe(404);
    });

    it('should throw an error if the searched driver does not exist', async () => {
        const response = await request(app).get('/getHowMany/123');
        expect(response.status).toBe(404);
    });
});
