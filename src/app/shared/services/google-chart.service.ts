import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleChartService implements OnInit {
  colors = [];

  constructor() {
    this._initColors();
  }

  ngOnInit() {}

  getColorPalette() {
    return this._shuffle(this.colors).slice();
  }

  getColoredSlicesConfig(colors) {
    const resultSlicesColorPalette = [];
    for (const i in colors) {
      if (colors.hasOwnProperty(i)) {
        resultSlicesColorPalette.push({ color: colors[i] });
      }
    }
    return resultSlicesColorPalette;
  }

  private _initColors() {
    this.colors = [
      '#156FEA',
      '#EA6715',
      '#EAD915',
      '#FF0B0B',
      '#85FF0B',
      '#1EA547',
      '#690BFF',
      '#00eae7',
      '#E24776',
      '#b400e5'
    ];
  }

  private _shuffle(arr) {
    let i;
    let j;
    let temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
}
