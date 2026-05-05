import { Injectable } from '@angular/core';
import { CATALAN_FAIRS } from '../models/fairs';
import { Fair } from '../models/fair';

@Injectable({
  providedIn: 'root'
})
export class FairsService {

  constructor() { }

  getAllFairs(): Fair[] {
    return CATALAN_FAIRS;
  }

  getFairsByRegion(regionName: string): Fair[] {
    return CATALAN_FAIRS.filter(fair => fair.regionName === regionName);
  }

  getUniqueRegions(): string[] {
    const regions = new Set(CATALAN_FAIRS.map(fair => fair.regionName));
    return Array.from(regions).sort();
  }

  getFairById(activityId: string): Fair | undefined {
    return CATALAN_FAIRS.find(fair => fair.activityId === activityId);
  }
}
