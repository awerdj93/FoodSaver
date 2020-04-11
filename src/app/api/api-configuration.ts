import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
  rootUrl: string = 'https://h1oszwe4ta.execute-api.ap-southeast-1.amazonaws.com/stag/';
  apiVersion: string = '/api/v1/';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
  apiVersion?: string;
}
