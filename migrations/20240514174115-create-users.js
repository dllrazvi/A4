module.exports = {
    async up(db, client) {
      // Code to apply the migration (e.g., create a users collection)
      await db.collection('users').createIndex({ email: 1 }, { unique: true });
    },
  
    async down(db, client) {
      // Code to rollback the migration (e.g., drop the users collection)
      await db.collection('users').dropIndex({ email: 1 });
    },
  };