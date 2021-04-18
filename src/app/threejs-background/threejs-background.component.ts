import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-threejs-background',
  templateUrl: './threejs-background.component.html',
  styleUrls: ['./threejs-background.component.scss']
})

export class ThreejsBackgroundComponent implements AfterViewInit {
  @ViewChild("myCanvas") canvas: ElementRef<HTMLCanvasElement> | undefined;
  htmlCanvasElement: HTMLCanvasElement;

  sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  clock!: THREE.Clock;
  sphere!: THREE.Mesh<THREE.TorusGeometry, THREE.MeshBasicMaterial>;

  constructor() {
    this.htmlCanvasElement = new HTMLCanvasElement();
  }

  ngAfterViewInit() {

    if (this.canvas != undefined) {
      console.log("this.canvas != undefined");
      this.htmlCanvasElement = this.canvas.nativeElement
      this.setup();

    }
  }

  setup() {


    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 2
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.htmlCanvasElement
    })
    this.clock = new THREE.Clock();

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


    // Objects
    const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);

    // Materials

    const material = new THREE.MeshBasicMaterial()
    material.color = new THREE.Color(0xff0000)

    // Mesh
    this.sphere = new THREE.Mesh(geometry, material)
    this.scene.add(this.sphere)

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    this.scene.add(pointLight)
    // this.renderer.render(this.scene, this.camera);

    this.loop();
  }

  loop() {

    const elapsedTime = this.clock.getElapsedTime();
    this.sphere.rotation.y = .5 * elapsedTime;

    // Render
    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.loop);
  }

  ngOnInit(): void {


  }

}
