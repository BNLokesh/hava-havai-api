const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Country = sequelize.define('Country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  continent_id: { type: DataTypes.INTEGER },
  // Remove created_at and updated_at if not present in your SQLite schema
});

const City = sequelize.define('City', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  country_id: { type: DataTypes.INTEGER },
  is_active: { type: DataTypes.BOOLEAN },
  lat: { type: DataTypes.FLOAT },
  long: { type: DataTypes.FLOAT }
});

const Airport = sequelize.define('Airport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  icao_code: { type: DataTypes.STRING },
  iata_code: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  latitude_deg: { type: DataTypes.FLOAT },
  longitude_deg: { type: DataTypes.FLOAT },
  elevation_ft: { type: DataTypes.INTEGER },
  city_id: { type: DataTypes.INTEGER }
});

City.belongsTo(Country, { foreignKey: 'country_id' });
Airport.belongsTo(City, { foreignKey: 'city_id' });

module.exports = { sequelize, Country, City, Airport };
