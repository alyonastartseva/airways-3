import { TTimeZoneForm } from '@/interfaces/time-zone.interfaces';

export const mapTimezonesFormData = (data: TTimeZoneForm): TTimeZoneForm => {
  const { gmt, gmtWinter } = data;
  const timezone = { ...data };

  if (gmt) {
    timezone.gmt = `GMT+${gmt}`;
  }
  if (gmtWinter) {
    timezone.gmtWinter = `GMT+${gmtWinter}`;
  }

  return timezone;
};
