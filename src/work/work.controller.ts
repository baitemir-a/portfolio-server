import { Controller, Get } from '@nestjs/common';

@Controller('/work')
export class WorkController {
    @Get()
    async getWork() {
        return 'work';
    }
}
