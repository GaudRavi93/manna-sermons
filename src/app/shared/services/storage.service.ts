import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = localStorage;

  constructor() { }

  public get(key: string): string {
    return this.storage.getItem(key);
  }

  public getAndClear(key: string): string {
    const val = this.storage.getItem(key);
    this.storage.setItem(key, '');
    return val;
  }

  public getParsed(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  public set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public setJSON(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clearAll() {
    this.storage.clear();
  }
}
