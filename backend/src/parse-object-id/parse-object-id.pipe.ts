import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform {
  transform(value: string | undefined) {
    if (value === null || value === undefined || value === '') return value;

    if (!Types.ObjectId.isValid(value))
      throw new BadRequestException(
        `Invalid ObjectId: ${value} is not a valid MongoDB ObjectId`,
      );
    else return value;
  }
}
