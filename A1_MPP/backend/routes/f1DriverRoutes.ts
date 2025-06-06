import express from 'express';
import * as f1DriverController from '../controllers/f1DriverController';

const router = express.Router();

router.post('/register', f1DriverController.registerUser);
router.post('/login', f1DriverController.loginUser);

router.use(f1DriverController.authenticateToken); // Apply to all routes below

// F1Driver routes
router.get('/f1drivers', f1DriverController.getAllF1Drivers);
router.get('/f1drivers/:id', f1DriverController.getF1DriverById);
router.post('/f1drivers', f1DriverController.createF1Driver);
router.put('/f1drivers/:id', f1DriverController.updateF1Driver);
router.delete('/f1drivers/:id', f1DriverController.deleteF1Driver);
router.post('/f1drivers/generate/:number', f1DriverController.generateRandomF1Drivers);


// DriverRaceHistory routes
router.get('/driverracehistory', f1DriverController.getAllDriverRaceHistory);
router.get('/driverracehistory/:id', f1DriverController.getDriverRaceHistoryById);
router.post('/driverracehistory', f1DriverController.createDriverRaceHistory);
router.put('/driverracehistory/:id', f1DriverController.updateDriverRaceHistory);
router.delete('/driverracehistory/:id', f1DriverController.deleteDriverRaceHistory);
router.post('/driverracehistory/generate/:number', f1DriverController.generateRandomDriverRaceHistory);

router.get('/driver-occurrences', f1DriverController.countDriverRaceHistoryOccurrences);


export default router;
