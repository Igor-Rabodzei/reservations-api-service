module.exports = {
  async up(db) {
    return db
      .collection('amenities')
      .insertMany([
        { name: 'Swimming Pool' },
        { name: 'Gym' },
        { name: 'Tennis Court' },
        { name: 'Spa' },
        { name: 'Sauna' },
        { name: 'Fitness Center' },
        { name: 'Basketball Court' },
        { name: 'Yoga Studio' },
        { name: 'Game Room' },
        { name: 'Cinema' },
      ]);
  },

  async down(db) {
    return db.collection('amenity').deleteMany({});
  },
};
