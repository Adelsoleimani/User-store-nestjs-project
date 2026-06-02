import { Injectable, NestMiddleware } from '@nestjs/common';
import { IpTrackerService } from './ip_tracker.service';
import { Request, Response } from 'express';

@Injectable()
export class IpTrackerMiddleware implements NestMiddleware {
  constructor(private readonly ipTrackerService: IpTrackerService) {}
  async use(req: Request, res: Response, next: () => void) {
    await this.ipTrackerService.track(req.ip);

    next();
  }
}
