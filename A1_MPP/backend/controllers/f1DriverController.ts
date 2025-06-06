import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'sorin', (err: any, user: any) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user
        const newUser = new UserModel({
            username,
            password, // Save password as plain text
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare passwords
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'sorin', { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Define MongoDB schema for F1Driver
const F1DriverSchema = new mongoose.Schema({
    DriverName: String,
    Team: String,
    Age: Number,
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
});


// Create Mongoose model for F1Driver
const F1DriverModel = mongoose.model('f1drivers', F1DriverSchema);
// Function to generate a random name


// Route handlers
export const getAllF1Drivers = async (_req: Request, res: Response) => {
    try {
        const userId = _req.user?.userId;
        const result = await F1DriverModel.find({ UserId: userId });
        console.log('Fetched F1 drivers:', result); // Log fetched data
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching F1 drivers:', error); // Log error
        res.status(500).json({ message: error.message });
    }
};

export const getF1DriverById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await F1DriverModel.findById(id); // Find F1 driver by ID
        if (!result) {
            res.status(404).json({ message: 'F1 driver not found' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createF1Driver = async (req: Request, res: Response) => {
    const { DriverName, Team, Age } = req.body;
    const UserId = req.user?.userId;
    try {
        const newDriver = await F1DriverModel.create({ DriverName, Team, Age, UserId });
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateF1Driver = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { DriverName, Team, Age } = req.body;
    try {
        const updatedDriver = await F1DriverModel.findByIdAndUpdate(id, { DriverName, Team, Age }, { new: true }); // Update F1 driver
        if (!updatedDriver) {
            res.status(404).json({ message: 'F1 driver not found' });
        } else {
            res.status(200).json(updatedDriver);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteF1Driver = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedDriver = await F1DriverModel.findByIdAndDelete(id); // Delete F1 driver
        if (!deletedDriver) {
            res.status(404).json({ message: 'F1 driver not found' });
        } else {
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateRandomF1Drivers = async (req: Request, res: Response) => {
    const { number } = req.params;
    const numberOfDrivers = parseInt(number);

    try {
        const drivers = Array.from({ length: numberOfDrivers }, () => ({
            DriverName: generateRandomName(), 
            Team: generateRandomTeam(),
            Age: generateRandomAge()
        }));
        // Assuming F1DriverModel is properly defined
        const createdDrivers = await F1DriverModel.create(drivers); // Create multiple F1 drivers
        res.status(201).json(createdDrivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Define MongoDB schema for DriverRaceHistory
// Define MongoDB schema for DriverRaceHistory
const DriverRaceHistorySchema = new mongoose.Schema({
    DriverId: mongoose.Types.ObjectId,
    DriverName: String,
    RaceName: String,
    Position: Number,
    Points: Number,
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to the user
});


// Create Mongoose model for DriverRaceHistory
const DriverRaceHistoryModel = mongoose.model('driverracehistories', DriverRaceHistorySchema);

// Route handlers
export const getAllDriverRaceHistory = async (_req: Request, res: Response) => {
    try {
        const result = await DriverRaceHistoryModel.find(); // Retrieve all driver race history
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDriverRaceHistoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await DriverRaceHistoryModel.findById(id); // Find driver race history by ID
        if (!result) {
            res.status(404).json({ message: 'Driver race history not found' });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createDriverRaceHistory = async (req: Request, res: Response) => {
    const { DriverId, DriverName, RaceName, Position, Points } = req.body;
    try {
        const newRaceHistory = await DriverRaceHistoryModel.create({ DriverId, DriverName, RaceName, Position, Points }); // Create new driver race history
        res.status(201).json(newRaceHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDriverRaceHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { DriverId, DriverName, RaceName, Position, Points } = req.body;
    try {
        const updatedRaceHistory = await DriverRaceHistoryModel.findByIdAndUpdate(id, { DriverId, DriverName, RaceName, Position, Points }, { new: true }); // Update driver race history
        if (!updatedRaceHistory) {
            res.status(404).json({ message: 'Driver race history not found' });
        } else {
            res.status(200).json(updatedRaceHistory);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDriverRaceHistory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedRaceHistory = await DriverRaceHistoryModel.findByIdAndDelete(id); // Delete driver race history
        if (!deletedRaceHistory) {
            res.status(404).json({ message: 'Driver race history not found' });
        } else {
            res.status(204).end();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const generateRandomDriverRaceHistory = async (req: Request, res: Response) => {
    const { number } = req.params;
    const numberOfEntries = parseInt(number);

    try {
        const raceHistoryEntries = Array.from({ length: numberOfEntries }, () => ({
            DriverId: new mongoose.Types.ObjectId(), // Create a new ObjectId for DriverId
            DriverName: generateRandomName(),
            RaceName: generateRandomRaceName(),
            Position:  generateRandomPosition(),
            Points: generateRandomPoints()
        }));

        const createdEntries = await DriverRaceHistoryModel.create(raceHistoryEntries); // Create multiple driver race history entries
        res.status(201).json(createdEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const generateRandomName = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
    const surnames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];
    const randomOptions = ['John', 'Jane', 'Michael', 'Emma', 'Oliver', 'Sophia', 'Liam', 'Ava', 'Noah', 'Isabella'];

    const randomIndex = Math.floor(Math.random() * 3); // Random index to choose between options

    let randomName;
    let randomSurname;

    if (randomIndex === 0) {
        // Generate a random name from the names array
        randomName = names[Math.floor(Math.random() * names.length)];
        randomSurname = surnames[Math.floor(Math.random() * surnames.length)];
    } else if (randomIndex === 1) {
        // Generate a random name from the surnames array
        randomName = surnames[Math.floor(Math.random() * surnames.length)];
        randomSurname = names[Math.floor(Math.random() * names.length)];
    } else {
        // Generate a random string
        const randomString = Math.random().toString(36).substring(7);
        randomName = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        randomSurname = randomString.charAt(0).toUpperCase() + randomString.slice(1);
    }

    return `${randomName} ${randomSurname}`;
};

export const countDriverRaceHistoryOccurrences = async (req, res) => {
    try {
        const driverOccurrences = await DriverRaceHistoryModel.aggregate([
            {
                $group: {
                    _id: "$DriverId",
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "f1drivers", 
                    localField: "_id",
                    foreignField: "_id",
                    as: "driver"
                }
            },
            {
                $unwind: "$driver"
            },
            {
                $project: {
                    driverName: "$driver.DriverName", 
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(driverOccurrences); 
    } catch (error) {
        res.status(500).json({ error: `Error counting occurrences: ${error.message}` }); 
    }
};






// Function to generate a random team
const generateRandomTeam = () => {
    const teams = ['Mercedes', 'Ferrari', 'Red Bull Racing', 'McLaren', 'Alpine', 'Aston Martin', 'Alfa Romeo Racing', 'AlphaTauri', 'Williams', 'Haas'];
    const randomTeamIndex = Math.floor(Math.random() * teams.length);
    return teams[randomTeamIndex];
};

// Function to generate a random age
const generateRandomAge = () => {
    return Math.floor(Math.random() * 28) + 18;
};

// Function to generate a random race name
// Function to generate a random race name
const generateRandomRaceName = () => {
    const races = ['Australian Grand Prix', 'Bahrain Grand Prix', 'Chinese Grand Prix', 'Azerbaijan Grand Prix', 'Spanish Grand Prix', 'Monaco Grand Prix', 'Canadian Grand Prix', 'French Grand Prix', 'Austrian Grand Prix', 'British Grand Prix'];
    const randomIndex = Math.floor(Math.random() * races.length);
    return races[randomIndex];
};


// Function to generate a random position
const generateRandomPosition = () => {
    return Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
};

// Function to generate random points
const generateRandomPoints = () => {
    return Math.floor(Math.random() * 25) + 1; // Random number between 1 and 25
};