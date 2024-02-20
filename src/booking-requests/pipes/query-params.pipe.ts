import { PipeTransform, Injectable } from '@nestjs/common';
import {
  QueryBookingRequestDto,
  QueryRawBookingRequestDto,
} from '../dto/query-params.dto';

@Injectable()
export class QueryParamsTransformPipe
  implements PipeTransform<QueryRawBookingRequestDto, QueryBookingRequestDto>
{
  private readonly queryKeys: Array<keyof QueryBookingRequestDto> = [
    'buildingTypeId',
    'userId',
    'email',
    'phone',
    'checkInDate',
    'checkOutDate',
    'adultsCount',
    'childrenCount',
    'message',
  ];
  transform(
    value: QueryRawBookingRequestDto,
  ): QueryBookingRequestDto | Record<string, never> {
    return this.queryParser(value);
  }
  private queryParser(
    queryRawDto: QueryRawBookingRequestDto,
  ): QueryBookingRequestDto {
    const queryBookingRequestDto = {};
    this.queryKeys.forEach((queryKey) => {
      const queryRawKey = queryKey.toLowerCase();
      if (queryRawDto?.[queryRawKey]) {
        queryBookingRequestDto[queryKey] = queryRawDto[queryRawKey];
      }
    });
    return queryBookingRequestDto;
  }
}
