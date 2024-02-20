import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import {
  QueryBookingRequestDto,
  QueryRawBookingRequestDto,
} from '../dto/query-params.dto';

@Injectable()
export class QueryParamsTransformPipe
  implements PipeTransform<QueryRawBookingRequestDto, QueryBookingRequestDto>
{
  private readonly querySerializer: Record<
    keyof QueryRawBookingRequestDto,
    keyof QueryBookingRequestDto
  > = {
    buildingtypeid: 'buildingTypeId',
    userid: 'userId',
    email: 'email',
    phone: 'phone',
    checkindate: 'checkInDate',
    checkoutdate: 'checkOutDate',
    adultscount: 'adultsCount',
    childrencount: 'childrenCount',
    message: 'message',
  };
  transform(value: QueryRawBookingRequestDto): QueryBookingRequestDto {
    return this.queryParser(value);
  }

  private queryParser(
    queryRawDto: QueryRawBookingRequestDto,
  ): QueryBookingRequestDto {
    const rawKeys = Object.keys(queryRawDto);

    return rawKeys.reduce((qBRDto, rawKey) => {
      const filterKey = this.querySerializer?.[rawKey];
      if (filterKey) {
        qBRDto[filterKey] = queryRawDto[rawKey];
      } else {
        throw new BadRequestException(`Invalid parameter: ${rawKey}`);
      }

      return qBRDto;
    }, {});
  }
}
