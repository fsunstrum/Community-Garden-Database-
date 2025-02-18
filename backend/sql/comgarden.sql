DROP TABLE Receives;
DROP TABLE Grows;
DROP TABLE Stores;
DROP TABLE Tool;
DROP TABLE GardenManages;
DROP TABLE GardenInfo;
DROP TABLE GardenManager;
DROP TABLE GardenerPlot;
DROP TABLE Gardener;
DROP TABLE HasCompost;
DROP TABLE Compost;
DROP TABLE PlantInfo;
DROP TABLE PlantColour;
DROP TABLE PlantHarvest;
DROP TABLE Donation;
DROP TABLE GardenNumPlots;

CREATE TABLE GardenInfo(
   address VARCHAR(20),
   garden_name VARCHAR(20) NOT NULL UNIQUE,
   num_of_plots INTEGER,
   PRIMARY KEY (garden_name, num_of_plots)
);

CREATE TABLE Donation(
   donation_id INTEGER PRIMARY KEY,
   donor_name VARCHAR(20),
   don_date DATE,
   item VARCHAR(20),
   UNIQUE (donor_name, don_date, item)
);

CREATE TABLE Tool(
   tool_type VARCHAR(20) PRIMARY KEY
);

CREATE TABLE GardenManager(
   name VARCHAR(20) NOT NULL,
   phone CHAR(12),
   email VARCHAR(30) PRIMARY KEY,
   UNIQUE (name, phone)
);

CREATE TABLE GardenNumPlots(
   address VARCHAR(20) PRIMARY KEY,
   num_of_plots INTEGER
);

CREATE TABLE Receives(
   donation_id INTEGER,
   garden_address VARCHAR(20),
   PRIMARY KEY (donation_id, garden_address),
   FOREIGN KEY (donation_id) REFERENCES Donation(donation_id),
   FOREIGN KEY (garden_address) REFERENCES 
      GardenNumPlots(address)
);


CREATE TABLE Stores(
   garden_address VARCHAR(20),
   tool_type VARCHAR(20),
   availability CHAR(1),
   PRIMARY KEY (garden_address, tool_type),
   FOREIGN KEY (garden_address) REFERENCES 
      GardenNumPlots(address),
   FOREIGN KEY (tool_type) REFERENCES Tool
);

CREATE TABLE GardenManages(
   garden_name VARCHAR(20) PRIMARY KEY,
   manager_email VARCHAR(30),
   FOREIGN KEY (garden_name) REFERENCES GardenInfo(garden_name),
   FOREIGN KEY (manager_email) REFERENCES 
      GardenManager(email)
);

CREATE TABLE Gardener(
   email VARCHAR(30) PRIMARY KEY,
   phone CHAR(12),
   name VARCHAR(20) NOT NULL,
   UNIQUE (name, phone)
);

CREATE TABLE GardenerPlot(
   garden_address VARCHAR(20),
   gardener_email VARCHAR(30),
   plot_num INTEGER,
   sun_exposure VARCHAR(20),
   plot_size INTEGER,
   PRIMARY KEY (garden_address, plot_num),
   FOREIGN KEY (garden_address) REFERENCES GardenNumPlots(address),
   FOREIGN KEY (gardener_email) REFERENCES Gardener(email)
      ON DELETE CASCADE
);

CREATE TABLE Compost(
   bin_id INTEGER PRIMARY KEY,
   capacity INTEGER
);

CREATE TABLE HasCompost(
   bin_id INTEGER,
   garden_address VARCHAR(20),
   PRIMARY KEY (bin_id, garden_address),
   FOREIGN KEY (bin_id) REFERENCES Compost,
   FOREIGN KEY (garden_address) REFERENCES 
      GardenNumPlots(address)
);

CREATE TABLE PlantColour(
   common_name VARCHAR(20) PRIMARY KEY,
   colour VARCHAR(20)
);

CREATE TABLE PlantHarvest(
   common_name VARCHAR(20) PRIMARY KEY,
   harvest_time INTEGER
);

CREATE TABLE PlantInfo(
   species VARCHAR(30),
   genus VARCHAR(20),
   variety VARCHAR(20),
   common_name VARCHAR(20) NOT NULL,
   PRIMARY KEY (species, genus, variety),
   FOREIGN KEY (common_name) REFERENCES PlantColour(common_name),
   FOREIGN KEY (common_name) REFERENCES PlantHarvest(common_name)
);

CREATE TABLE Grows(
   species VARCHAR(30),
   genus VARCHAR(20),
   variety VARCHAR(20),
   plot_num INTEGER,
   garden_address VARCHAR(20),
   qty INTEGER,
   plant_date DATE,
   PRIMARY KEY (species, genus, variety, plot_num, garden_address),
   FOREIGN KEY (species, genus, variety) REFERENCES PlantInfo(species, genus, variety),
   FOREIGN KEY (plot_num, garden_address) REFERENCES GardenerPlot(plot_num, garden_address)
      ON DELETE CASCADE
);

INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (1, 'Alice', TO_DATE('2024-07-01', 'YYYY-MM-DD'), 'Orange Seeds');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (2, 'Bob', TO_DATE('2024-07-05', 'YYYY-MM-DD'), 'Shovel');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (3, 'Charlie', TO_DATE('2024-07-10', 'YYYY-MM-DD'), 'Carrot Seeds');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (4, 'Diana', TO_DATE('2024-07-15', 'YYYY-MM-DD'), 'Grape Tomato Seeds');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (5, 'Eve', TO_DATE('2024-07-20', 'YYYY-MM-DD'), 'Lawn Chair');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (6, 'Alice', TO_DATE('2024-07-25', 'YYYY-MM-DD'), 'Gardening Gloves');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (7, 'Alice', TO_DATE('2024-07-27', 'YYYY-MM-DD'), 'Rake');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (8, 'Frank', TO_DATE('2024-08-01', 'YYYY-MM-DD'), 'Watering Can');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (9, 'George', TO_DATE('2024-08-01', 'YYYY-MM-DD'), 'Trowel');
INSERT INTO Donation (donation_id, donor_name, don_date, item) VALUES (10, 'Bob', TO_DATE('2024-08-02', 'YYYY-MM-DD'), 'Shovel');

INSERT INTO GardenInfo (address, garden_name, num_of_plots) VALUES ('123 Elm St', 'Elm Garden', 10);
INSERT INTO GardenInfo (address, garden_name, num_of_plots) VALUES ('456 Oak St', 'Oak Garden', 15);
INSERT INTO GardenInfo (address, garden_name, num_of_plots) VALUES ('789 Pine St', 'Pine Garden', 20);
INSERT INTO GardenInfo (address, garden_name, num_of_plots) VALUES ('101 Maple St', 'Maple Garden', 25);
INSERT INTO GardenInfo (address, garden_name, num_of_plots) VALUES ('202 Birch St', 'Birch Garden', 30);

INSERT INTO Tool (tool_type) VALUES ('Shovel');
INSERT INTO Tool (tool_type) VALUES ('Rake');
INSERT INTO Tool (tool_type) VALUES ('Hoe');
INSERT INTO Tool (tool_type) VALUES ('Pruner');
INSERT INTO Tool (tool_type) VALUES ('Trowel');

INSERT INTO GardenManager (name, phone, email) VALUES ('John Doe', '123-456-7890', 'john@vancouver.com');
INSERT INTO GardenManager (name, phone, email) VALUES ('Jane Smith', '234-567-8901', 'jane@burnaby.com');
INSERT INTO GardenManager (name, phone, email) VALUES ('Emily Davis', '345-678-9012', 'emily@gmail.com');
INSERT INTO GardenManager (name, phone, email) VALUES ('Michael Brown', '456-789-0123', 'michael@gmail.com');
INSERT INTO GardenManager (name, phone, email) VALUES ('Sarah Wilson', '567-890-1234', 'sarah@burnaby.com');

INSERT INTO GardenNumPlots (address, num_of_plots) VALUES ('123 Elm St', 10);
INSERT INTO GardenNumPlots (address, num_of_plots) VALUES ('456 Oak St', 15);
INSERT INTO GardenNumPlots (address, num_of_plots) VALUES ('789 Pine St', 20);
INSERT INTO GardenNumPlots (address, num_of_plots) VALUES ('101 Maple St', 25);
INSERT INTO GardenNumPlots (address, num_of_plots) VALUES ('202 Birch St', 30);

INSERT INTO Stores (garden_address, tool_type, availability) VALUES ('123 Elm St', 'Shovel', 'Y');
INSERT INTO Stores (garden_address, tool_type, availability) VALUES ('123 Elm St', 'Hoe', 'N');
INSERT INTO Stores (garden_address, tool_type, availability) VALUES ('202 Birch St', 'Shovel', 'Y');
INSERT INTO Stores (garden_address, tool_type, availability) VALUES ('789 Pine St', 'Trowel', 'N');
INSERT INTO Stores (garden_address, tool_type, availability) VALUES ('101 Maple St', 'Rake', 'Y');

INSERT INTO GardenManages (garden_name, manager_email) VALUES ('Elm Garden', 'john@vancouver.com');
INSERT INTO GardenManages (garden_name, manager_email) VALUES ('Oak Garden', 'jane@burnaby.com');
INSERT INTO GardenManages (garden_name, manager_email) VALUES ('Pine Garden', 'emily@gmail.com');
INSERT INTO GardenManages (garden_name, manager_email) VALUES ('Maple Garden', 'michael@gmail.com');
INSERT INTO GardenManages (garden_name, manager_email) VALUES ('Birch Garden', 'sarah@burnaby.com');

INSERT INTO Gardener (email, phone, name) VALUES ('johndoe@gmail.com', '604-123-4567', 'John Doe');
INSERT INTO Gardener (email, phone, name) VALUES ('janedoe@gmail.com', '778-321-1234', 'Jane Doe');
INSERT INTO Gardener (email, phone, name) VALUES ('marysmith@outlook.com', '627-000-1111', 'Mary Smith');
INSERT INTO Gardener (email, phone, name) VALUES ('maria_rodriguez@yahoo.com', '778-900-8888', 'Maria Rodriguez');
INSERT INTO Gardener (email, phone, name) VALUES ('jamesj@gmail.com', '604-444-4444', 'James Johnson');

INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('123 Elm St', 'johndoe@gmail.com', 1, 'full sun', 5);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('123 Elm St', 'janedoe@gmail.com', 4, 'part sun', 5);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('456 Oak St', 'marysmith@outlook.com', 3, 'part shade', 3);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('456 Oak St', 'marysmith@outlook.com', 2, 'part sun', 3);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('789 Pine St', 'jamesj@gmail.com', 5, 'full shade', 4);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('789 Pine St', 'jamesj@gmail.com', 6, 'full shade', 4);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('123 Elm St', 'johndoe@gmail.com', 6, 'full shade', 4);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('123 Elm St', 'johndoe@gmail.com', 5, 'full shade', 4);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('202 Birch St', 'maria_rodriguez@yahoo.com', 5, 'full shade', 4);
INSERT INTO GardenerPlot (garden_address, gardener_email, plot_num, sun_exposure, plot_size) VALUES ('101 Maple St', 'maria_rodriguez@yahoo.com', 5, 'full shade', 4);


INSERT INTO Compost (bin_id, capacity) VALUES (123, 7);
INSERT INTO Compost (bin_id, capacity) VALUES (001, NULL);
INSERT INTO Compost (bin_id, capacity) VALUES (1004, 10);
INSERT INTO Compost (bin_id, capacity) VALUES (22, NULL);
INSERT INTO Compost (bin_id, capacity) VALUES (2098, 12);

INSERT INTO HasCompost (bin_id, garden_address) VALUES (123, '123 Elm St');
INSERT INTO HasCompost (bin_id, garden_address) VALUES (001, '456 Oak St');
INSERT INTO HasCompost (bin_id, garden_address) VALUES (1004, '789 Pine St');
INSERT INTO HasCompost (bin_id, garden_address) VALUES (22, '101 Maple St');
INSERT INTO HasCompost (bin_id, garden_address) VALUES (2098, '202 Birch St');

INSERT INTO PlantColour (common_name, colour) VALUES ('Cucumber', 'Green');
INSERT INTO PlantColour (common_name, colour) VALUES ('Tomato', 'Red');
INSERT INTO PlantColour (common_name, colour) VALUES ('Cabbage', 'Green');
INSERT INTO PlantColour (common_name, colour) VALUES ('Carrot', 'Orange');
INSERT INTO PlantColour (common_name, colour) VALUES ('Pepper', NULL);
INSERT INTO PlantColour (common_name, colour) VALUES ('China Rose', 'Pink');

INSERT INTO PlantHarvest (common_name, harvest_time) VALUES ('Cucumber', 60);
INSERT INTO PlantHarvest (common_name, harvest_time) VALUES ('Tomato', 75);
INSERT INTO PlantHarvest (common_name, harvest_time) VALUES ('Cabbage', 85);
INSERT INTO PlantHarvest (common_name, harvest_time) VALUES ('Carrot', 70);
INSERT INTO PlantHarvest (common_name, harvest_time) VALUES ('Pepper', 80);
INSERT INTO PlantHarvest (common_name, harvest_time) VALUES ('China Rose', NULL);

INSERT INTO PlantInfo (species, genus, variety, common_name) VALUES ('Cucumis sativus', 'Cucumis', 'pickling', 'Cucumber');
INSERT INTO PlantInfo (species, genus, variety, common_name) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 'Tomato');
INSERT INTO PlantInfo (species, genus, variety, common_name) VALUES ('Brassica oleracea', 'Brassica', 'capitata', 'Cabbage');
INSERT INTO PlantInfo (species, genus, variety, common_name) VALUES ('Daucus carota', 'Daucus', 'imperator', 'Carrot');
INSERT INTO PlantInfo (species, genus, variety, common_name) VALUES ('Capsicum annuum', 'Capsicum', 'bell', 'Pepper');
INSERT INTO PlantInfo (species, genus, variety, common_name) VALUES ('Rosa chinensis', 'Rosa', 'chinese', 'China Rose');

INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 1, '123 Elm St', 4, TO_DATE('2024-05-24', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Capsicum annuum', 'Capsicum', 'bell', 2, '456 Oak St', 6, TO_DATE('2024-06-23', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Capsicum annuum', 'Capsicum', 'bell', 3, '456 Oak St', 7, TO_DATE('2024-05-31', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Rosa chinensis', 'Rosa', 'chinese', 4, '123 Elm St', 11, TO_DATE('2024-08-13', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 5, '789 Pine St', 20, TO_DATE('2024-04-23', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 5, '123 Elm St', 5, TO_DATE('2024-05-24', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 3, '456 Oak St', 4, TO_DATE('2024-05-24', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 6, '789 Pine St', 5, TO_DATE('2024-05-24', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 5, '101 Maple St', 4, TO_DATE('2024-05-24', 'YYYY-MM-DD'));
INSERT INTO Grows (species, genus, variety, plot_num, garden_address, qty, plant_date) VALUES ('Lycopersicon esculentum', 'Lycopersicon', 'roma', 5, '202 Birch St', 4, TO_DATE('2024-05-24', 'YYYY-MM-DD'));

INSERT INTO Receives (donation_id, garden_address) VALUES (1, '123 Elm St');
INSERT INTO Receives (donation_id, garden_address) VALUES (2, '456 Oak St');
INSERT INTO Receives (donation_id, garden_address) VALUES (3, '789 Pine St');
INSERT INTO Receives (donation_id, garden_address) VALUES (4, '101 Maple St');
INSERT INTO Receives (donation_id, garden_address) VALUES (5, '202 Birch St');
INSERT INTO Receives (donation_id, garden_address) VALUES (6, '202 Birch St');
INSERT INTO Receives (donation_id, garden_address) VALUES (7, '123 Elm St');
INSERT INTO Receives (donation_id, garden_address) VALUES (8, '202 Birch St');
INSERT INTO Receives (donation_id, garden_address) VALUES (9, '789 Pine St');
INSERT INTO Receives (donation_id, garden_address) VALUES (10, '101 Maple St');

COMMIT;