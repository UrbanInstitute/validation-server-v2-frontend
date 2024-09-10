import { addRxPlugin, createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBMigrationPlugin);

const createDatabase = async () => {
  // create RxDB
  const db = await createRxDatabase({
    name: "ui_val_local_v2",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });

  // create a collection
  const collections = await db.addCollections({
    jobs: {
      schema: {
        title: "jobs",
        version: 1,

        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          scriptName: {
            type: "string",
          },
          script: {
            type: "string",
          },
          status: {
            type: "string",
          },
        },
      },
      migrationStrategies: {
        // 1 means, this transforms data from version 0 to version 1
        1: function (oldDoc) {
          oldDoc.status = "inProgress";
          return oldDoc;
        },
      },
    },
    runs: {
      schema: {
        primaryKey: "id",
        title: "runs",
        version: 0,
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          jobId: {
            type: "string",
          },
          runId: {
            type: "string",
          },
          statusOk: {
            type: "boolean",
          },
          statusInfo: {
            type: "string",
          },
        },
      },
    },
    accounts: {
      schema: {
        primaryKey: "id",
        title: "accounts",
        version: 0,
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          userName: {
            type: "string",
          },
          password: {
            type: "string",
          },
          lastLoginTime: {
            type: "number",
          },
        },
      },
    },
    notifications: {
      schema: {
        title: "notifications",
        version: 2,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          message: {
            type: "string",
          },
          receiveTime: {
            type: "number",
          },
          status: {
            type: "string",
          },
          jobId: {
            type: "string",
          },
          runId: {
            type: "string",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          changeCheck: {
            type: "string",
          },
          linkText: {
            type: "string",
          },
        },
      },
      migrationStrategies: {
        // 1 means, this transforms data from version 0 to version 1
        1: function (oldDoc) {
          oldDoc.jobId = "id";
          oldDoc.runId = "id";
          oldDoc.linkText = "";
          return oldDoc;
        },

        2: function (oldDoc) {
          oldDoc.title = oldDoc.message;
          oldDoc.description = oldDoc.message;
          oldDoc.changeCheck = oldDoc.message;
          return oldDoc;
        },
      },
    },
  });

  // maybe sync collection to a remote
  // ...

  return { db, collections };
};

const { db, collections } = await createDatabase();

export { db, collections };
