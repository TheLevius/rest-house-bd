import { PipeTransform, Injectable } from '@nestjs/common';
import {
  QueryParamsDto,
  QueryParamsRaw,
} from '../interfaces/room-occupied-periods.interface';

@Injectable()
export class QueryParamsTransformPipe
  implements PipeTransform<QueryParamsRaw, QueryParamsDto>
{
  private readonly queryKeys: Array<keyof QueryParamsDto> = [
    'roomId',
    'checkInDate',
    'checkOutDate',
  ];
  transform(value: QueryParamsRaw): QueryParamsDto {
    return this.queryParser(value);
  }
  private queryParser(queryParamsRaw: QueryParamsRaw): QueryParamsDto {
    const queryParamsDto = {};
    this.queryKeys.forEach((queryKey) => {
      const queryRawKey = queryKey.toLowerCase();
      if (queryParamsRaw?.[queryRawKey]) {
        queryParamsDto[queryKey] = queryParamsRaw[queryRawKey];
      }
    });
    return queryParamsDto;
  }
}
