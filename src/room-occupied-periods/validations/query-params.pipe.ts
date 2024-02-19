import { PipeTransform, Injectable } from '@nestjs/common';
import {
  QueryParamsDto,
  QueryParamsRaw,
} from '../interfaces/room-occupied-periods.interface';

@Injectable()
export class QueryParamsTransformPipe
  implements PipeTransform<QueryParamsRaw, QueryParamsDto | null>
{
  transform(value: QueryParamsRaw): QueryParamsDto | Record<string, never> {
    if (Object.keys(value).length === 0) {
      return {};
    }
    return {
      roomId: value?.roomid ?? value.roomid,
      checkInDate: value?.checkindate ?? value.checkindate,
      checkOutDate: value?.checkoutdate ?? value.checkoutdate,
    };
  }
}
