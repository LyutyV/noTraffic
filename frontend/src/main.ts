import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { ZoneManagerComponent } from './app/components/zones-handler/zone-manager.component';

bootstrapApplication(ZoneManagerComponent, appConfig).catch((err) => console.error(err));
