/*
 * Copyright 2015-2021 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private readonly renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) private readonly document: HTMLDocument,
    private readonly rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Get the favicon of the current HTML document.
   */
  getFavicon(): HTMLLinkElement | null {
    return this.document.querySelector<HTMLLinkElement>('link[rel*=\'icon\']');
  }

  /**
   * Set the title of the current HTML document.
   * @param iconURL - Default favicon URL
   */
  setFavicon(iconURL: string): void {
    const link: HTMLLinkElement = this.getFavicon() || this.renderer.createElement('link');
    this.appendLinkTag(link, iconURL);
  }

  /**
   * Append new link to HEAD
   * @param link - DOM element
   * @param iconURL - favicon URL
   */
  private appendLinkTag(link: HTMLLinkElement, iconURL: string): void {
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconURL;
    const head = this.document.getElementsByTagName('head')[0];
    this.renderer.appendChild(head, link);
  }
}
