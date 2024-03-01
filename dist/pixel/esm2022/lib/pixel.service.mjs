import { Inject, Injectable, Optional, PLATFORM_ID, } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class PixelService {
    config;
    injectedDocument;
    platformId;
    router;
    rendererFactory;
    doc;
    renderer;
    constructor(config, injectedDocument, platformId, router, rendererFactory) {
        this.config = config;
        this.injectedDocument = injectedDocument;
        this.platformId = platformId;
        this.router = router;
        this.rendererFactory = rendererFactory;
        // DOCUMENT cannot be injected directly as Document type, see https://github.com/angular/angular/issues/20351
        // It is therefore injected as any and then cast to Document
        this.doc = injectedDocument;
        this.renderer = rendererFactory.createRenderer(null, null);
        if (router) {
            // Log page views after router navigation ends
            router.events
                .pipe(filter((event) => event instanceof NavigationEnd))
                .subscribe((event) => {
                if (this.isLoaded()) {
                    this.track('PageView');
                }
            });
        }
    }
    /**
     * @description
     * Initialize the Pixel tracking script
     * - Adds the script to page's head
     * - Tracks first page view
     */
    initialize(pixelId = this.config.pixelId) {
        if (this.isLoaded()) {
            console.warn('Tried to initialize a Pixel instance while another is already active. Please call `remove()` before initializing a new instance.');
            return;
        }
        this.config.enabled = true;
        this.addPixelScript(pixelId);
    }
    /**
     * @description
     * Remove the Pixel tracking script */
    remove() {
        this.removePixelScript();
        this.config.enabled = false;
    }
    /**
     * @description
     * Track a Standard Event as predefined by Facebook
     *
     * See {@link https://developers.facebook.com/docs/facebook-pixel/reference Facebook Pixel docs - reference}
     * @param eventName The name of the event that is being tracked
     * @param properties Optional properties of the event
     */
    track(eventName, properties) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!this.isLoaded()) {
            console.warn('Tried to track an event without initializing a Pixel instance. Call `initialize()` first.');
            return;
        }
        if (properties) {
            fbq('track', eventName, properties);
        }
        else {
            fbq('track', eventName);
        }
    }
    /**
     * @description
     * Track a custom Event
     *
     * See {@link https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-conversions Facebook Pixel docs - custom conversions}
     * @param eventName The name of the event that is being tracked
     * @param properties Optional properties of the event
     */
    trackCustom(eventName, properties) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (!this.isLoaded()) {
            console.warn('Tried to track an event without initializing a Pixel instance. Call `initialize()` first.');
            return;
        }
        if (properties) {
            fbq('trackCustom', eventName, properties);
        }
        else {
            fbq('trackCustom', eventName);
        }
    }
    /**
     * @description
     * Adds the Facebook Pixel tracking script to the application
     * @param pixelId The Facebook Pixel ID to use
     */
    addPixelScript(pixelId) {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const pixelCode = `
    var pixelCode = function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    ${pixelId.map((id) => `fbq('init', ${id})`).join(';')}
      fbq('track', 'PageView');
    `;
        const scriptElement = this.renderer.createElement('script');
        this.renderer.setAttribute(scriptElement, 'id', 'pixel-script');
        this.renderer.setAttribute(scriptElement, 'type', 'text/javascript');
        this.renderer.setProperty(scriptElement, 'innerHTML', pixelCode);
        this.renderer.appendChild(this.doc.head, scriptElement);
    }
    /**
     * @description
     * Remove Facebook Pixel tracking script from the application
     */
    removePixelScript() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        const pixelElement = this.doc.getElementById('pixel-script');
        if (pixelElement) {
            pixelElement.remove();
        }
    }
    /**
     * @description
     * Checks if the script element is present
     */
    isLoaded() {
        if (isPlatformBrowser(this.platformId)) {
            const pixelElement = this.doc.getElementById('pixel-script');
            return !!pixelElement;
        }
        return false;
    }
    static ɵfac = function PixelService_Factory(t) { return new (t || PixelService)(i0.ɵɵinject('config'), i0.ɵɵinject(DOCUMENT), i0.ɵɵinject(PLATFORM_ID), i0.ɵɵinject(i1.Router, 8), i0.ɵɵinject(i0.RendererFactory2)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PixelService, factory: PixelService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PixelService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], () => [{ type: undefined, decorators: [{
                type: Inject,
                args: ['config']
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }, { type: Object, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }, { type: i1.Router, decorators: [{
                type: Optional
            }] }, { type: i0.RendererFactory2 }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl4ZWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3BpeGVsL3NyYy9saWIvcGl4ZWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFDVixRQUFRLEVBQ1IsV0FBVyxHQUdaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQVUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPeEMsTUFBTSxPQUFPLFlBQVk7SUFLSztJQUNBO0lBQ0c7SUFDVDtJQUNaO0lBUkYsR0FBRyxDQUFXO0lBQ2QsUUFBUSxDQUFZO0lBRTVCLFlBQzRCLE1BQTBCLEVBQzFCLGdCQUFxQixFQUNsQixVQUFrQixFQUMzQixNQUFjLEVBQzFCLGVBQWlDO1FBSmYsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDMUIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFLO1FBQ2xCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDM0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUMxQixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFFekMsNkdBQTZHO1FBQzdHLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsR0FBRyxHQUFHLGdCQUE0QixDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLDhDQUE4QztZQUM5QyxNQUFNLENBQUMsTUFBTTtpQkFDVixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVksYUFBYSxDQUFD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aW9uLFxuICBQaXhlbEV2ZW50UHJvcGVydGllcyxcbn0gZnJvbSAnLi9waXhlbC5tb2RlbHMnO1xuaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBPcHRpb25hbCxcbiAgUExBVEZPUk1fSUQsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJGYWN0b3J5Mixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZGVjbGFyZSBjb25zdCBmYnE6IGFueTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBpeGVsU2VydmljZSB7XG4gIHByaXZhdGUgZG9jOiBEb2N1bWVudDtcbiAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoJ2NvbmZpZycpIHByaXZhdGUgY29uZmlnOiBQaXhlbENvbmZpZ3VyYXRpb24sXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBpbmplY3RlZERvY3VtZW50OiBhbnksXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyRmFjdG9yeTogUmVuZGVyZXJGYWN0b3J5MlxuICApIHtcbiAgICAvLyBET0NVTUVOVCBjYW5ub3QgYmUgaW5qZWN0ZWQgZGlyZWN0bHkgYXMgRG9jdW1lbnQgdHlwZSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwMzUxXG4gICAgLy8gSXQgaXMgdGhlcmVmb3JlIGluamVjdGVkIGFzIGFueSBhbmQgdGhlbiBjYXN0IHRvIERvY3VtZW50XG4gICAgdGhpcy5kb2MgPSBpbmplY3RlZERvY3VtZW50IGFzIERvY3VtZW50O1xuICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbCk7XG5cbiAgICBpZiAocm91dGVyKSB7XG4gICAgICAvLyBMb2cgcGFnZSB2aWV3cyBhZnRlciByb3V0ZXIgbmF2aWdhdGlvbiBlbmRzXG4gICAgICByb3V0ZXIuZXZlbnRzXG4gICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaXNMb2FkZWQoKSkge1xuICAgICAgICAgICAgdGhpcy50cmFjaygnUGFnZVZpZXcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogSW5pdGlhbGl6ZSB0aGUgUGl4ZWwgdHJhY2tpbmcgc2NyaXB0XG4gICAqIC0gQWRkcyB0aGUgc2NyaXB0IHRvIHBhZ2UncyBoZWFkXG4gICAqIC0gVHJhY2tzIGZpcnN0IHBhZ2Ugdmlld1xuICAgKi9cbiAgaW5pdGlhbGl6ZShwaXhlbElkID0gdGhpcy5jb25maWcucGl4ZWxJZCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzTG9hZGVkKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RyaWVkIHRvIGluaXRpYWxpemUgYSBQaXhlbCBpbnN0YW5jZSB3aGlsZSBhbm90aGVyIGlzIGFscmVhZHkgYWN0aXZlLiBQbGVhc2UgY2FsbCBgcmVtb3ZlKClgIGJlZm9yZSBpbml0aWFsaXppbmcgYSBuZXcgaW5zdGFuY2UuJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jb25maWcuZW5hYmxlZCA9IHRydWU7XG4gICAgdGhpcy5hZGRQaXhlbFNjcmlwdChwaXhlbElkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogUmVtb3ZlIHRoZSBQaXhlbCB0cmFja2luZyBzY3JpcHQgKi9cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlUGl4ZWxTY3JpcHQoKTtcbiAgICB0aGlzLmNvbmZpZy5lbmFibGVkID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRyYWNrIGEgU3RhbmRhcmQgRXZlbnQgYXMgcHJlZGVmaW5lZCBieSBGYWNlYm9va1xuICAgKlxuICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9mYWNlYm9vay1waXhlbC9yZWZlcmVuY2UgRmFjZWJvb2sgUGl4ZWwgZG9jcyAtIHJlZmVyZW5jZX1cbiAgICogQHBhcmFtIGV2ZW50TmFtZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnQgdGhhdCBpcyBiZWluZyB0cmFja2VkXG4gICAqIEBwYXJhbSBwcm9wZXJ0aWVzIE9wdGlvbmFsIHByb3BlcnRpZXMgb2YgdGhlIGV2ZW50XG4gICAqL1xuICB0cmFjayhldmVudE5hbWU6IFBpeGVsRXZlbnROYW1lLCBwcm9wZXJ0aWVzPzogUGl4ZWxFdmVudFByb3BlcnRpZXMpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuaXNMb2FkZWQoKSkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnVHJpZWQgdG8gdHJhY2sgYW4gZXZlbnQgd2l0aG91dCBpbml0aWFsaXppbmcgYSBQaXhlbCBpbnN0YW5jZS4gQ2FsbCBgaW5pdGlhbGl6ZSgpYCBmaXJzdC4nXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICBmYnEoJ3RyYWNrJywgZXZlbnROYW1lLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmJxKCd0cmFjaycsIGV2ZW50TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUcmFjayBhIGN1c3RvbSBFdmVudFxuICAgKlxuICAgKiBTZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5mYWNlYm9vay5jb20vZG9jcy9mYWNlYm9vay1waXhlbC9pbXBsZW1lbnRhdGlvbi9jb252ZXJzaW9uLXRyYWNraW5nI2N1c3RvbS1jb252ZXJzaW9ucyBGYWNlYm9vayBQaXhlbCBkb2NzIC0gY3VzdG9tIGNvbnZlcnNpb25zfVxuICAgKiBAcGFyYW0gZXZlbnROYW1lIFRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGlzIGJlaW5nIHRyYWNrZWRcbiAgICogQHBhcmFtIHByb3BlcnRpZXMgT3B0aW9uYWwgcHJvcGVydGllcyBvZiB0aGUgZXZlbnRcbiAgICovXG4gIHRyYWNrQ3VzdG9tKGV2ZW50TmFtZTogc3RyaW5nLCBwcm9wZXJ0aWVzPzogb2JqZWN0KTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmlzTG9hZGVkKCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgJ1RyaWVkIHRvIHRyYWNrIGFuIGV2ZW50IHdpdGhvdXQgaW5pdGlhbGl6aW5nIGEgUGl4ZWwgaW5zdGFuY2UuIENhbGwgYGluaXRpYWxpemUoKWAgZmlyc3QuJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocHJvcGVydGllcykge1xuICAgICAgZmJxKCd0cmFja0N1c3RvbScsIGV2ZW50TmFtZSwgcHJvcGVydGllcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZicSgndHJhY2tDdXN0b20nLCBldmVudE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQWRkcyB0aGUgRmFjZWJvb2sgUGl4ZWwgdHJhY2tpbmcgc2NyaXB0IHRvIHRoZSBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0gcGl4ZWxJZCBUaGUgRmFjZWJvb2sgUGl4ZWwgSUQgdG8gdXNlXG4gICAqL1xuICBwcml2YXRlIGFkZFBpeGVsU2NyaXB0KHBpeGVsSWQ6IHN0cmluZ1tdKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGl4ZWxDb2RlID0gYFxuICAgIHZhciBwaXhlbENvZGUgPSBmdW5jdGlvbihmLGIsZSx2LG4sdCxzKVxuICAgIHtpZihmLmZicSlyZXR1cm47bj1mLmZicT1mdW5jdGlvbigpe24uY2FsbE1ldGhvZD9cbiAgICBuLmNhbGxNZXRob2QuYXBwbHkobixhcmd1bWVudHMpOm4ucXVldWUucHVzaChhcmd1bWVudHMpfTtcbiAgICBpZighZi5fZmJxKWYuX2ZicT1uO24ucHVzaD1uO24ubG9hZGVkPSEwO24udmVyc2lvbj0nMi4wJztcbiAgICBuLnF1ZXVlPVtdO3Q9Yi5jcmVhdGVFbGVtZW50KGUpO3QuYXN5bmM9ITA7XG4gICAgdC5zcmM9djtzPWIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoZSlbMF07XG4gICAgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LHMpfSh3aW5kb3csIGRvY3VtZW50LCdzY3JpcHQnLFxuICAgICdodHRwczovL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL2ZiZXZlbnRzLmpzJyk7XG4gICAgJHtwaXhlbElkLm1hcCgoaWQpID0+IGBmYnEoJ2luaXQnLCAke2lkfSlgKS5qb2luKCc7Jyl9XG4gICAgICBmYnEoJ3RyYWNrJywgJ1BhZ2VWaWV3Jyk7XG4gICAgYDtcblxuICAgIGNvbnN0IHNjcmlwdEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHNjcmlwdEVsZW1lbnQsICdpZCcsICdwaXhlbC1zY3JpcHQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShzY3JpcHRFbGVtZW50LCAndHlwZScsICd0ZXh0L2phdmFzY3JpcHQnKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHNjcmlwdEVsZW1lbnQsICdpbm5lckhUTUwnLCBwaXhlbENvZGUpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5kb2MuaGVhZCwgc2NyaXB0RWxlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFJlbW92ZSBGYWNlYm9vayBQaXhlbCB0cmFja2luZyBzY3JpcHQgZnJvbSB0aGUgYXBwbGljYXRpb25cbiAgICovXG4gIHByaXZhdGUgcmVtb3ZlUGl4ZWxTY3JpcHQoKTogdm9pZCB7XG4gICAgaWYgKCFpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHBpeGVsRWxlbWVudCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeUlkKCdwaXhlbC1zY3JpcHQnKTtcbiAgICBpZiAocGl4ZWxFbGVtZW50KSB7XG4gICAgICBwaXhlbEVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBDaGVja3MgaWYgdGhlIHNjcmlwdCBlbGVtZW50IGlzIHByZXNlbnRcbiAgICovXG4gIHByaXZhdGUgaXNMb2FkZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIGNvbnN0IHBpeGVsRWxlbWVudCA9IHRoaXMuZG9jLmdldEVsZW1lbnRCeUlkKCdwaXhlbC1zY3JpcHQnKTtcbiAgICAgIHJldHVybiAhIXBpeGVsRWxlbWVudDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=