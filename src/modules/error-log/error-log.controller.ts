import { Controller, Get } from "node_modules/@nestjs/common";
import { ErrorLogService } from "./error-log.service";

@Controller('error-log')
export class ErrorLogController {
    constructor(private readonly errorLogService: ErrorLogService) {}

    @Get()
    findAll() {
        return;
    }
}