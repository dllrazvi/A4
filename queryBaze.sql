use [F1DB]

CREATE TABLE F1Driver (
    Id INT PRIMARY KEY IDENTITY(1,1),
    DriverName NVARCHAR(100) UNIQUE,
    Team NVARCHAR(MAX),
    Age INT
);

CREATE TABLE DriverRaceHistory (
    RaceId INT PRIMARY KEY IDENTITY(1,1),
    DriverId INT,
    DriverName NVARCHAR(100), 
    RaceName NVARCHAR(MAX),
    Position INT,
    Points INT,
    CONSTRAINT FK_DriverRaceHistory_F1Driver FOREIGN KEY (DriverId) REFERENCES F1Driver(Id)
);

-- Insert 10 drivers
INSERT INTO F1Driver (DriverName, Team, Age)
VALUES 
('Lewis Hamilton', 'Mercedes', 36),
('Max Verstappen', 'Red Bull Racing', 23),
('Valtteri Bottas', 'Mercedes', 31),
('Lando Norris', 'McLaren', 21),
('Daniel Ricciardo', 'McLaren', 31),
('Sergio Perez', 'Red Bull Racing', 31),
('Charles Leclerc', 'Ferrari', 24),
('Carlos Sainz', 'Ferrari', 26),
('Pierre Gasly', 'AlphaTauri', 25),
('Fernando Alonso', 'Alpine', 39);

-- Insert 2 races for each driver
-- Race history for Lewis Hamilton
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(1, 'Lewis Hamilton', 'Race1', 1, 25),
(1, 'Lewis Hamilton', 'Race2', 3, 15);

-- Race history for Max Verstappen
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(2, 'Max Verstappen', 'Race1', 2, 18),
(2, 'Max Verstappen', 'Race2', 1, 25);

-- Race history for Valtteri Bottas
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(3, 'Valtteri Bottas', 'Race1', 3, 15),
(3, 'Valtteri Bottas', 'Race2', 2, 18);

-- Race history for Lando Norris
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(4, 'Lando Norris', 'Race1', 4, 12),
(4, 'Lando Norris', 'Race2', 5, 10);

-- Race history for Daniel Ricciardo
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(5, 'Daniel Ricciardo', 'Race1', 5, 10),
(5, 'Daniel Ricciardo', 'Race2', 4, 12);

-- Race history for Sergio Perez
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(6, 'Sergio Perez', 'Race1', 6, 8),
(6, 'Sergio Perez', 'Race2', 6, 8);

-- Race history for Charles Leclerc
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(7, 'Charles Leclerc', 'Race1', 7, 6),
(7, 'Charles Leclerc', 'Race2', 7, 6);

-- Race history for Carlos Sainz
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(8, 'Carlos Sainz', 'Race1', 8, 4),
(8, 'Carlos Sainz', 'Race2', 8, 4);

-- Race history for Pierre Gasly
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(9, 'Pierre Gasly', 'Race1', 9, 2),
(9, 'Pierre Gasly', 'Race2', 9, 2);

-- Race history for Fernando Alonso
INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
VALUES 
(10, 'Fernando Alonso', 'Race1', 10, 1),
(10, 'Fernando Alonso', 'Race2', 10, 1);

GO
CREATE OR ALTER PROCEDURE GetDriverRaceHistory
    @DriverName NVARCHAR(100)
AS
BEGIN
    SELECT d.DriverName, d.Team, d.Age, r.RaceName, r.Position, r.Points
    FROM F1Driver d
    INNER JOIN DriverRaceHistory r ON d.Id = r.DriverId
    WHERE d.DriverName = @DriverName;
END;


GO
CREATE OR ALTER PROCEDURE GetDriverRaceHistory
    @DriverName NVARCHAR(100)
AS
BEGIN
    SELECT d.DriverName, d.Team, d.Age, r.RaceName, r.Position, r.Points
    FROM F1Driver d
    INNER JOIN DriverRaceHistory r ON d.Id = r.DriverId
    WHERE d.DriverName = @DriverName;
END;

go
CREATE OR ALTER PROCEDURE GetDriverByName
    @DriverName NVARCHAR(100)
AS
BEGIN
    SELECT *
    FROM F1Driver
    WHERE DriverName = @DriverName;
END;


go
CREATE OR ALTER PROCEDURE GetDriverRaceHistoryByNameAndRaceName
    @DriverName NVARCHAR(100),
    @RaceName NVARCHAR(MAX)
AS
BEGIN
    Select *
	FROM DriverRaceHistory
	WHERE DriverName = @DriverName AND RaceName = @RaceName
END;

GO
CREATE OR ALTER PROCEDURE InsertF1Driver
    @DriverName NVARCHAR(100),
    @Team NVARCHAR(MAX),
    @Age INT
AS
BEGIN
    INSERT INTO F1Driver (DriverName, Team, Age)
    VALUES (@DriverName, @Team, @Age);
END;


GO
CREATE OR ALTER PROCEDURE InsertDriverRaceHistory
    @DriverName NVARCHAR(100),
    @RaceName NVARCHAR(MAX),
    @Position INT,
    @Points INT
AS
BEGIN
    DECLARE @DriverId INT;
    SELECT @DriverId = Id FROM F1Driver WHERE DriverName = @DriverName;

    INSERT INTO DriverRaceHistory (DriverId, DriverName, RaceName, Position, Points)
    VALUES (@DriverId, @DriverName, @RaceName, @Position, @Points);
END;

GO
CREATE OR ALTER PROCEDURE RemoveF1Driver
    @DriverName NVARCHAR(100)
AS
BEGIN
    DELETE FROM F1Driver
    WHERE DriverName = @DriverName;
END;

GO
CREATE OR ALTER PROCEDURE RemoveDriverRaceHistory
    @DriverName NVARCHAR(100),
    @RaceName NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM DriverRaceHistory
    WHERE DriverName = @DriverName AND RaceName = @RaceName;
END;


go
CREATE OR ALTER PROCEDURE UpdateF1Driver
    @DriverName NVARCHAR(100),
    @NewTeam NVARCHAR(MAX),
    @NewAge INT
AS
BEGIN
    UPDATE F1Driver
    SET Team = @NewTeam, Age = @NewAge
    WHERE DriverName = @DriverName;
END;


go
CREATE OR ALTER PROCEDURE UpdateDriverRaceHistory
    @DriverName NVARCHAR(100),
    @RaceName NVARCHAR(MAX),
    @NewRaceName NVARCHAR(MAX),
    @NewPosition INT,
    @NewPoints INT
AS
BEGIN
    UPDATE DriverRaceHistory
    SET RaceName = @NewRaceName, Position = @NewPosition, Points = @NewPoints
    WHERE DriverName = @DriverName AND RaceName = @RaceName;
END;

EXEC InsertF1Driver 'Sebastian Vettel', 'Aston Martin', 34;
EXEC InsertDriverRaceHistory 'Sebastian Vettel', 'Australian GP', 3, 15;
EXEC GetDriverRaceHistory 'Lewis Hamilton';
EXEC GetDriverByName 'Max Verstappen';
EXEC GetDriverRaceHistoryByNameAndRaceName 'Max Verstappen', 'Race1';
EXEC UpdateF1Driver 'Sebastian Vettel', 'Alpine', 40;
EXEC UpdateDriverRaceHistory 'Sebastian Vettel', 'Australian GP', 'Race1', 1, 25;
EXEC RemoveF1Driver 'Sebastian Vettel';
EXEC RemoveDriverRaceHistory 'Sebastian Vettel', 'Race1';


select * from F1Driver
select * from DriverRaceHistory
SELECT @@SERVERNAME