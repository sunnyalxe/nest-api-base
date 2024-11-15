import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    // Check if the value is a valid integer string
    if (!/^-?\d+$/.test(value)) {
      // Regex to match only integer numbers (positive or negative)
      throw new BadRequestException(`Invalid value is given to '${metadata.data}'.`);
    }

    const val = parseInt(value, 10);
    return val;
  }
}
