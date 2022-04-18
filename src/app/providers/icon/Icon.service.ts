import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  registerSvgIcon(iconName: string, iconFileName: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `../../../assets/svg/${iconFileName}`
      )
    );
  }
}
