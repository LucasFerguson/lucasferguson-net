import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-threejs-background',
  templateUrl: './threejs-background.component.html',
  styleUrls: ['./threejs-background.component.scss']
})

export class ThreejsBackgroundComponent implements AfterViewInit {
  @ViewChild("myCanvas") canvas: ElementRef<HTMLCanvasElement> | undefined;
  htmlCanvasElement!: HTMLCanvasElement;

  constructor() {

  }

  ngAfterViewInit() {

    if (this.canvas != undefined) {
      console.log("this.canvas != undefined");
      this.htmlCanvasElement = this.canvas.nativeElement
      backgroundGame(this.htmlCanvasElement)

    }
  }

  ngOnInit(): void {
  }
}



// import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
function backgroundGame(_canvas: HTMLCanvasElement) {

  console.log(" ??????? Hello World ");
  // Debug
  const gui = new dat.GUI()

  // Canvas
  // @ts-ignore
  const canvas: HTMLCanvasElement = _canvas


  // Scene
  const scene = new THREE.Scene()

  // Objects
  // const geometry = new THREE.TorusGeometry(.7, .2, 16, 100);
  const geometry = new THREE.BoxBufferGeometry(1);
  const material = new THREE.MeshPhongMaterial()
  material.color = new THREE.Color(0xffffff)
  // material.metalness = 0
  // material.roughness = .1

  // Mesh
  const box = new THREE.Mesh(geometry, material)
  box.position.set(0, -1, 0);
  box.castShadow = true
  box.receiveShadow = true
  scene.add(box)


  const planegeometry = new THREE.PlaneBufferGeometry(100, 100);
  const planematerial = new THREE.MeshPhongMaterial();
  let plane = new THREE.Mesh(planegeometry, planematerial)
  plane.rotation.x = -Math.PI / 2
  plane.position.set(0, -3, 0);
  plane.receiveShadow = true;
  plane.castShadow = true;
  // planematerial.metalness = 0
  // planematerial.roughness = .6
  scene.add(plane)

  // Materials

  // const material = new THREE.MeshBasicMaterial()


  // Lights

  // const lightTest = new THREE.AmbientLight(0xffffff, 0.1)
  // scene.add(lightTest)""

  let l1 = createLight(scene, 0xff0000, 2, 0, -1);
  let l2 = createLight(scene, 0x00ff00, -3, 0, 0);
  let l3 = createLight(scene, 0x0000ff, 3, 0, 1);


  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.x = 0
  camera.position.y = 0
  camera.position.z = 5
  scene.add(camera)

  // Controls
  // const controls = new OrbitControls(camera, canvas)
  // controls.enableDamping = true

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMapEnabled = true;

  /**
   * Animate
   */

  const clock = new THREE.Clock()

  const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    box.rotation.y = .6 * elapsedTime
    box.rotation.x = .3 * elapsedTime
    // plane.rotation.x += Math.PI / 64;
    // Update Orbital Controls
    // controls.update()
    // console.log(l1.geo.position.y);
    // console.log("elapsedTime " + elapsedTime);

    l1.geo.position.setY(Math.sin(elapsedTime) * 2.5);
    l1.light.position.setY(Math.sin(elapsedTime) * 2.5);

    l2.geo.position.setY(Math.sin(elapsedTime + 2) * 2.5);
    l2.light.position.setY(Math.sin(elapsedTime + 2) * 2.5);

    l3.geo.position.setY(Math.sin(elapsedTime + 4) * 2.5);
    l3.light.position.setY(Math.sin(elapsedTime + 4) * 2.5);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()

}

function createLight(_scene: THREE.Scene, _color: number, _x: number, _y: number, _z: number) {
  const pointLight1 = new THREE.PointLight(_color, 0.9, 60)
  let sphereLight1 = new THREE.Mesh(new THREE.SphereGeometry(.06), new THREE.MeshBasicMaterial());
  sphereLight1.material.color = new THREE.Color(_color)
  pointLight1.castShadow = true
  pointLight1.position.set(_x, _y, _z);
  sphereLight1.position.set(_x, _y, _z);
  _scene.add(pointLight1)
  _scene.add(sphereLight1)

  return { geo: sphereLight1, light: pointLight1 }
}