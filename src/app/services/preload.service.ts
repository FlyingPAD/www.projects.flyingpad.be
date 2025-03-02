// preload.service.ts
import { Injectable } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { scan, map } from 'rxjs/operators';

export interface Asset {
  url: string;
  type: 'image' | 'video';
}

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  // Cache pour garder une référence forte à chaque image
  private imageCache: { [url: string]: HTMLImageElement } = {};

  private preloadAsset(asset: Asset): Observable<number> {
    return new Observable<number>(observer => {
      if (asset.type === 'image') {
        const img = new Image();
        img.src = asset.url;
        img.onload = () => {
          // Conserver la référence dans le cache
          this.imageCache[asset.url] = img;
          observer.next(1);
          observer.complete();
        };
        img.onerror = err => observer.error(err);
      } else if (asset.type === 'video') {
        const video = document.createElement('video');
        video.src = asset.url;
        video.onloadeddata = () => {
          observer.next(1);
          observer.complete();
        };
        video.onerror = err => observer.error(err);
      }
    });
  }

  preloadAssets(assets: Asset[]): Observable<number> {
    const total = assets.length;
    const observables = assets.map(asset => this.preloadAsset(asset));
    return merge(...observables).pipe(
      scan((acc, curr) => acc + curr, 0),
      map(loadedCount => Math.round((loadedCount / total) * 100))
    );
  }
}