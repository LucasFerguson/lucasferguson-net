
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit } from '@angular/core';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

	@ViewChild("myDiv") divView: ElementRef | undefined;
	@ViewChild("myCanvas") canvas: ElementRef | undefined;

	ngAfterViewInit() {

		if (this.canvas) {
			var ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");


			var e: CanvasRenderingContext2D = this.canvas.nativeElement;
			ctx.canvas.width = window.innerWidth;
			ctx.canvas.height = window.innerHeight;
			ctx.beginPath();
			ctx.arc(95, 50, 40, 0, 2 * Math.PI);
			ctx.stroke();
			console.log();

		}
	}
}