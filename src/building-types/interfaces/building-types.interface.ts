import { BuildingType } from '@prisma/client';
import { ServiceDates } from 'src/interfaces/service-dates.interface';
export type BuildingTypeResponse = Omit<BuildingType, ServiceDates>;
