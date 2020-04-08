import { Injectable } from '@angular/core';

/**
 * Global configuration for Api services
 */
@Injectable({
  providedIn: 'root',
})
export class ApiConfiguration {
 //rootUrl: string = 'http://localhost:8080';
 // rootUrl: string = 'http://accountdev-stag-1.eba-bdptrqfm.ap-southeast-1.elasticbeanstalk.com/';
  rootUrl: string = 'https://dl9uil6np6.execute-api.ap-southeast-1.amazonaws.com/stag/';
  apiVersion: string = '/api/v1/';
}

export interface ApiConfigurationInterface {
  rootUrl?: string;
  apiVersion?: string;
}
