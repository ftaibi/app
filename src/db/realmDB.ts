import Realm from 'realm';
import schemas from './schemas';

/**
 * Single Realm instance for the app. All model access goes through this.
 * deleteRealmIfMigrationNeeded: in __DEV__, Realm wipes the DB when the schema changes
 * instead of throwing; in production you would use proper migration blocks.
 */
const realmDB = new Realm({
  schema: schemas,
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: __DEV__,
});

export default realmDB;
