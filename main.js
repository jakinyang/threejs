import * as THREE from 'three';
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Scene

const scene = new THREE.Scene();

// Create Sphere

const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: 'lightseagreen',
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Light

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(5, 10, 10);
scene.add(light);

// Camera

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);



// Renderer

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);

controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

// Resize
window.addEventListener('resize', () => {
  // Update Sizes
  console.log(window.innerWidth);
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop)
}

loop()

// Timeline Magic
const tl = gspa.timeline({defaults: {duration: 1}})

tl.