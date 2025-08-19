import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.155.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.155.0/examples/jsm/controls/OrbitControls.js';

// 1. Scène et caméra
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(30, 20, 30);

// 2. Renderer
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. Controls (tourner autour + zoom)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// 4. Lumières
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// 5. Objets 3D (boîtier + RAM)
const boitierGeo = new THREE.BoxGeometry(20, 15, 10);
const boitierMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness:0.8, roughness:0.2 });
const boitier = new THREE.Mesh(boitierGeo, boitierMat);
scene.add(boitier);

const ramGeo = new THREE.BoxGeometry(8, 1.5, 1);
const ramMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, metalness:0.7 });
const ram = new THREE.Mesh(ramGeo, ramMat);
ram.position.set(0, 5, 0);
scene.add(ram);

// 6. Interaction souris
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', () => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([ram]);
  if(intersects.length > 0){
    // Exemple : changer la couleur ou simuler "déposer/enlever RAM"
    ram.material.color.set(Math.random() * 0xffffff);
  }
});

// 7. Animation
function animate(){
  requestAnimationFrame(animate);
  controls.update(); // indispensable pour OrbitControls
  renderer.render(scene, camera);
}
animate();

// 8. Gestion resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
