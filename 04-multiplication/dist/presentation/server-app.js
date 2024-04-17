"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverApp = void 0;
const create_table_use_case_1 = require("../domain/use-cases/create-table.use-case");
const save_file_use_case_1 = require("../domain/use-cases/save-file.use-case");
class serverApp {
    static run({ base, limit, showTable, fileDestination, fileName }) {
        console.log('Server running...');
        const table = new create_table_use_case_1.CreateTable()
            .execute({ base, limit });
        const wasCreated = new save_file_use_case_1.SaveFile()
            .execute({ fileContent: table, fileDestination, fileName });
        if (showTable)
            console.log(table);
        (wasCreated)
            ? console.log('File created!')
            : console.error('File not created');
    }
}
exports.serverApp = serverApp;
