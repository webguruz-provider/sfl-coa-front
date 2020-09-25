import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as $ from "jquery";
import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export class Application  {
  constructor() {
      console.log($);
  }
}

platformBrowserDynamic().bootstrapModule(AppModule);
