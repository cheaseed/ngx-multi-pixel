import { Inject, NgModule, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PixelService } from './pixel.service';
import * as i0 from "@angular/core";
import * as i1 from "./pixel.service";
export class PixelModule {
    pixel;
    static config = null;
    constructor(pixel, platformId) {
        this.pixel = pixel;
        if (!PixelModule.config) {
            throw Error(' not configured correctly. Pass the `pixelId` property to the `forRoot()` function');
        }
        if (PixelModule.config.enabled && isPlatformBrowser(platformId)) {
            this.pixel.initialize();
        }
    }
    /**
     * @description
     * Initiale the Facebook Pixel Module
     * Add your Pixel ID as parameter
     */
    static forRoot(config) {
        this.config = config;
        const pixelId = config.pixelId;
        this.verifyPixelId(pixelId);
        return {
            ngModule: PixelModule,
            providers: [PixelService, { provide: 'config', useValue: config }],
        };
    }
    /**
     * @description
     * Verifies the Pixel ID that was passed into the configuration.
     * - Checks if Pixel was initialized
     * @param pixelId Pixel ID to verify
     */
    static verifyPixelId(pixelId) {
        // Have to verify first that all Pixel IDs follow the same 15 digit format
        pixelId.forEach((id) => {
            if (id === null || id === undefined || id.length === 0) {
                throw Error('Invalid Facebook Pixel ID. Did you pass the ID into the forRoot() function?');
            }
        });
    }
    static ɵfac = function PixelModule_Factory(t) { return new (t || PixelModule)(i0.ɵɵinject(i1.PixelService), i0.ɵɵinject(PLATFORM_ID)); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PixelModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({});
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PixelModule, [{
        type: NgModule,
        args: [{
                imports: [],
            }]
    }], () => [{ type: i1.PixelService }, { type: Object, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl4ZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvcGl4ZWwvc3JjL2xpYi9waXhlbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUNMLE1BQU0sRUFFTixRQUFRLEVBQ1IsV0FBVyxHQUNaLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBSy9DLE1BQU0sT0FBTyxXQUFXO0lBSVo7SUFIRixNQUFNLENBQUMsTUFBTSxHQUE4QixJQUFJLENBQUM7SUFFeEQsWUFDVSxLQUFtQixFQUNOLFVBQWtCO1FBRC9CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFHM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN4QixNQUFNLEtBQUssQ0FDVCxvRkFBb0YsQ0FDckYsQ0FBQztRQUNKLENBQUM7UUFDRCxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDaEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQTBCO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QixPQUFPO1lBQ0wsUUFBUSxFQUFFLFdBQVc7WUFDckIsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUM7U0FDbkUsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLE1BQU0sQ0FBQyxhQUFhLENBQUMsT0FBaUI7UUFDNUMsMEVBQTBFO1FBQzFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtZQUNyQixJQUFJLEVBQUUsS0FBSyxJQUFJLElBQUksRUFBRSxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN2RCxNQUFNLEtBQUssQ0FDVCw2RUFBNkUsQ0FDOUUsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7cUVBaERVLFdBQVcsNENBS1osV0FBVzs0REFMVixXQUFXOzs7aUZBQVgsV0FBVztjQUh2QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLEVBQUU7YUFDWjs7c0JBTUksTUFBTTt1QkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGl4ZWxDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9waXhlbC5tb2RlbHMnO1xuaW1wb3J0IHtcbiAgSW5qZWN0LFxuICBNb2R1bGVXaXRoUHJvdmlkZXJzLFxuICBOZ01vZHVsZSxcbiAgUExBVEZPUk1fSUQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUGl4ZWxTZXJ2aWNlIH0gZnJvbSAnLi9waXhlbC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW10sXG59KVxuZXhwb3J0IGNsYXNzIFBpeGVsTW9kdWxlIHtcbiAgcHJpdmF0ZSBzdGF0aWMgY29uZmlnOiBQaXhlbENvbmZpZ3VyYXRpb24gfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBpeGVsOiBQaXhlbFNlcnZpY2UsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0XG4gICkge1xuICAgIGlmICghUGl4ZWxNb2R1bGUuY29uZmlnKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgJyBub3QgY29uZmlndXJlZCBjb3JyZWN0bHkuIFBhc3MgdGhlIGBwaXhlbElkYCBwcm9wZXJ0eSB0byB0aGUgYGZvclJvb3QoKWAgZnVuY3Rpb24nXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoUGl4ZWxNb2R1bGUuY29uZmlnLmVuYWJsZWQgJiYgaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgIHRoaXMucGl4ZWwuaW5pdGlhbGl6ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogSW5pdGlhbGUgdGhlIEZhY2Vib29rIFBpeGVsIE1vZHVsZVxuICAgKiBBZGQgeW91ciBQaXhlbCBJRCBhcyBwYXJhbWV0ZXJcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogUGl4ZWxDb25maWd1cmF0aW9uKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQaXhlbE1vZHVsZT4ge1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIGNvbnN0IHBpeGVsSWQgPSBjb25maWcucGl4ZWxJZDtcbiAgICB0aGlzLnZlcmlmeVBpeGVsSWQocGl4ZWxJZCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFBpeGVsTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbUGl4ZWxTZXJ2aWNlLCB7IHByb3ZpZGU6ICdjb25maWcnLCB1c2VWYWx1ZTogY29uZmlnIH1dLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFZlcmlmaWVzIHRoZSBQaXhlbCBJRCB0aGF0IHdhcyBwYXNzZWQgaW50byB0aGUgY29uZmlndXJhdGlvbi5cbiAgICogLSBDaGVja3MgaWYgUGl4ZWwgd2FzIGluaXRpYWxpemVkXG4gICAqIEBwYXJhbSBwaXhlbElkIFBpeGVsIElEIHRvIHZlcmlmeVxuICAgKi9cbiAgcHJpdmF0ZSBzdGF0aWMgdmVyaWZ5UGl4ZWxJZChwaXhlbElkOiBzdHJpbmdbXSk6IHZvaWQge1xuICAgIC8vIEhhdmUgdG8gdmVyaWZ5IGZpcnN0IHRoYXQgYWxsIFBpeGVsIElEcyBmb2xsb3cgdGhlIHNhbWUgMTUgZGlnaXQgZm9ybWF0XG4gICAgcGl4ZWxJZC5mb3JFYWNoKChpZCkgPT4ge1xuICAgICAgaWYgKGlkID09PSBudWxsIHx8IGlkID09PSB1bmRlZmluZWQgfHwgaWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICdJbnZhbGlkIEZhY2Vib29rIFBpeGVsIElELiBEaWQgeW91IHBhc3MgdGhlIElEIGludG8gdGhlIGZvclJvb3QoKSBmdW5jdGlvbj8nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==