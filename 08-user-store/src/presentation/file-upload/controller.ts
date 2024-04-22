import { Response, Request } from "express";
import { CustomError } from "../../domain";
import { FileUploadService } from "../services/file-upload.service";
import { error } from "console";
import { UploadedFile } from "express-fileupload";

export class FileUploadController {


    constructor(
        private readonly fileuploadService: FileUploadService,
    ) { }

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({ error: error.message })
        }
        console.log(`${error}`);
        return res.status(500).json({ error: 'Internal server error' });
    }


    uploadFile = (req: Request, res: Response) => {

        const type = req.params.type;
        const validTypes = ['users', 'products', 'categories'];

        const file = req.body.files.at(0) as UploadedFile;

        this.fileuploadService.uploadSingle(file, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res))
    }

    uploadMultipleFiles = async (req: Request, res: Response) => {
        const type = req.params.type;
        const validTypes = ['users', 'products', 'categories'];

        const files = req.body.files as UploadedFile[];

        this.fileuploadService.uploadMultiple(files, `uploads/${type}`)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res))
    }

}