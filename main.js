import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'; 
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';



//camara
// VARIABLES
let theme = 'light';
let bookCover = null;
let lightSwitch = null;
let titleText = null;
let subtitleText = null;
let mixer;
let isMobile = window.matchMedia('(max-width: 992px)').matches;
let canvas = document.querySelector('.experience-canvas');
const loaderWrapper = document.getElementById('loader-wrapper');
let clipNames = [
  'fan_rotation',
  'fan_rotation.001',
  'fan_rotation.002',
  'fan_rotation.003',
  'fan_rotation.004',
];
let projects = [
  {
    image: 'textures/c5.png',
    url: 'https://www.hackerrank.com/certificates/iframe/72dc7d546696',
  },
  {
    image: 'textures/c2.png',
    url: 'https://www.hackerrank.com/certificates/iframe/bef4e5fc8890',
  },
  {
    image: 'textures/c4.png',
    url: 'https://www.hackerrank.com/certificates/iframe/3ceef6470a16',
  },
  {
    image: 'textures/c3.png',
    url: 'https://www.hackerrank.com/certificates/iframe/f5f5574b4f64',
  },
  {
    image: 'textures/c1.png',
    url: 'https://www.jointaro.com/certificate/3i7hYyYk6uBnwK10IBAn/',
  },
  {
    image: 'textures/c6.jpeg',
    url: 'https://www.coursera.org/account/accomplishments/verify/5XVDI15F9CP6?utm_source=mobile&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course',
  },
  {
    image: 'textures/c7.png',
    url: 'https://www.linkedin.com/learning/certificates/82b1caf25c9e9916fbfba5b792bea38580a4e9255377bc5b18bf01cd0e952a4c',
  },
  {
    image: 'textures/c8.png',
    url: 'https://www.life-global.org/certificate/6691d88d-5e4e-4311-bec7-8aee0ab34221',
  },
  {
    image: 'textures/c9.png',
    url: 'https://media.licdn.com/dms/image/v2/D4E22AQGNxKEERI_0xg/feedshare-shrink_1280/feedshare-shrink_1280/0/1694368397463?e=1742428800&v=beta&t=movKeozCEHqR6otU4XwhSlvcFLaxQHCjxsuDduZTCNg',
  },
];

let aboutCameraPos = {
  x: 0.12,
  y: 0.2,
  z: 0.55,
};
let aboutCameraRot = {
  x: -1.54,
  y: 0.13,
  z: 1.41,
};
let projectsCameraPos = {
  x: 1.5,
  y: 0.4,
  z: 0.4,
};
let contacts1CameraRot = {
  x: 0,
  y: -0.1,
  z: 0,
};
let contactsCameraPos = {
  x: 1.5,
  y: 0.4,
  z: 0.4,
};
let contactsCameraRot = {
  x: 0,
  y: 3.15,
  z: 0,
};
// SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  1000
);
let defaultCameraPos = {
  x: 2.009028643133046,
  y: 0.5463638814987481,
  z: 0.4983449671971262,
};
let defaultCamerRot = {
  x: 0,
  y: 1.5,
  z: 0,
};
camera.position.set(defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z);

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
const rgbeLoader = new RGBELoader();

// // Load the default (light mode) environment at startup
// rgbeLoader.load('textures/environment.hdr', function (texture) {
//   texture.mapping = THREE.EquirectangularReflectionMapping;
//   //scene.environment = texture;
//   scene.background = texture; // Optional
// });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// STATS
// const stats = new Stats();
// document.querySelector('.experience').appendChild(stats.dom)
// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.minDistance = 0.9;
controls.maxDistance = 1.6;
controls.minAzimuthAngle = 0.2;
controls.maxAzimuthAngle = Math.PI * 0.78;
controls.minPolarAngle = 0.4;
controls.maxPolarAngle = Math.PI / 2;
controls.update();


// LOAD MODEL & ASSET
// const loadingManager = new THREE.LoadingManager();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('draco/');
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.load(
  'models/room.glb',
  function (room) {
    // hide loader on loade
    loaderWrapper.style.display = 'none';

    // load video
    const video = document.createElement('video');
    video.src = 'textures/arcane.mp4';
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.loop = true;

    // Load kavishka model
// Assuming you're already loading the GLB model as you did before
// Load the human avatar model (GLB file)
// First load the GLB model
gltfLoader.load('models/kavishka.glb', function (kavishka) {
  // Position the model inside the room
  kavishka.scene.position.set(0.3, -0.46, 1);
  kavishka.scene.scale.set(0.5, 0.57, 0.5);
  kavishka.scene.rotation.y = Math.PI / 1.3;
  
  // Add the model inside the room
  room.scene.add(kavishka.scene);
  
  // Initialize animation mixer for the model
  const mixer = new THREE.AnimationMixer(kavishka.scene);
  window.mixer = mixer; // Make it accessible globally
  
  // First, load the Dancing.fbx animation and play it once
  const fbxLoader = new FBXLoader();
  fbxLoader.load('animations/Dancing.fbx', function (dancingObject) {
    if (dancingObject.animations && dancingObject.animations.length > 0) {
      console.log("Dancing animation loaded");
      switchTheme('!dark');
      resetCamera();
      
      const dancingClip = dancingObject.animations[0];
      const dancingAction = mixer.clipAction(dancingClip);
      
      // Configure to play only once
      dancingAction.loop = THREE.LoopOnce;
      dancingAction.clampWhenFinished = true; // Hold the last frame when finished
      
      // Set up the callback for when the dancing animation completes
      mixer.addEventListener('finished', function(e) {
        if (e.action === dancingAction) {
          console.log("Dancing animation finished, starting Happy animation");
          
          // Stop the dancing animation
          dancingAction.stop();
          
          // Now load and play the Happy.fbx animation in a loop
          loadHappyAnimation(mixer);
          
        }
      });
      
      // Start playing the dancing animation
      dancingAction.play();
      console.log("Playing Dancing animation once");
    } else {
      console.warn("No animations found in Dancing.fbx");
      // If Dancing.fbx doesn't have animations, just load Happy.fbx
      loadHappyAnimation(mixer);
    }
  }, undefined, function (error) {
    console.error('Error loading Dancing.fbx:', error);
    // If there's an error loading Dancing.fbx, try loading Happy.fbx
    loadHappyAnimation(mixer);
  });
  
  // Function to load and play Happy.fbx in a loop
  function loadHappyAnimation(mixer) {
    const fbxLoader = new FBXLoader();
    fbxLoader.load('animations/Happy.fbx', function (happyObject) {
      if (happyObject.animations && happyObject.animations.length > 0) {
        console.log("Happy animation loaded");
        
        const happyClip = happyObject.animations[0];
        const happyAction = mixer.clipAction(happyClip);
        
        // Configure to loop indefinitely
        happyAction.loop = THREE.LoopRepeat;
        
        // Start playing the happy animation
        happyAction.play();
        console.log("Playing Happy animation in a loop");
      } else {
        console.warn("No animations found in Happy.fbx");
      }
    }, undefined, function (error) {
      console.error('Error loading Happy.fbx:', error);
    });
  }
  
}, undefined, function (error) {
  console.error('Error loading kavishka.glb:', error);
});

// Set up animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  
  // Update the mixer in the animation loop
  const delta = clock.getDelta();
  if (window.mixer) window.mixer.update(delta);
  
  renderer.render(scene, camera);
}




    // create video texture
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.NearestFilter;
    videoTexture.magFilter = THREE.NearestFilter;
    videoTexture.generateMipmaps = false;
    videoTexture.encoding = THREE.sRGBEncoding;

    room.scene.children.forEach((child) => {
      

      child.receiveShadow = true;

      if (child.children) {
        child.children.forEach((innerChild) => {
          // disable shadow by book cover & switch btn
          if (innerChild.name !== 'Book001' && innerChild.name !== 'Switch') {
            innerChild.castShadow = true;
          }
          innerChild.receiveShadow = true;
        });
      }

      if (child.name === 'Stand') {
        child.children[0].material = new THREE.MeshBasicMaterial({
          map: videoTexture,
        });
        video.play();
      }

      // transparent texture for glass
      if (child.name === 'CPU') {
        child.children[0].material = new THREE.MeshPhysicalMaterial();
        child.children[0].material.roughness = 0;
        child.children[0].material.color.set(0x999999);
        child.children[0].material.ior = 1000;
        child.children[0].material.transmission = 2;
        child.children[0].material.opacity = 1;
        child.children[0].material.depthWrite = false;
        child.children[0].material.depthTest = false;
        child.children[1].material = new THREE.MeshPhysicalMaterial();
        child.children[1].material.roughness = 0;
        child.children[1].material.color.set(0x999999);
        child.children[1].material.ior = 10000;
        child.children[1].material.transmission = 1;
        child.children[1].material.opacity = 1;
        child.children[1].material.depthWrite = true;
        child.children[1].material.depthTest = true;
      }

      if (child.name === 'Book') {
        bookCover = child.children[0];

        // adding texture to book
        const bookTexture = new THREE.TextureLoader().load(
          'textures/book-inner.png'
        );
        bookTexture.flipY = false;
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: bookTexture,
        });
      }

      if (child.name === 'SwitchBoard') {
        lightSwitch = child.children[0];
      }
    });

    scene.add(room.scene);
    animate();

    // add animation
    mixer = new THREE.AnimationMixer(room.scene);
    const clips = room.animations;
    clipNames.forEach((clipName) => {
      const clip = THREE.AnimationClip.findByName(clips, clipName);
      if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
      }
    });

    loadIntroText();

    // add event listeners
    logoListener();
    aboutMenuListener();
    contactMenuListener();
    projectsMenuListener();
    init3DWorldClickListeners();
    initResponsive(room.scene);
  },
  function (error) {
    console.error(error);
  }
);

// ADD LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const roomLight = new THREE.PointLight(0xffffff, 2.5, 10);
const roomLight1 = new THREE.PointLight(0xffffff, 2.5, 10);
roomLight.position.set(0.8, 0.8, 0.4);
roomLight.castShadow = true;
roomLight.power = 0;
roomLight.shadow.radius = 5;
roomLight.shadow.mapSize.width = 2048;
roomLight.shadow.mapSize.height = 2048;
roomLight.shadow.camera.far = 2.5;
// roomLight.shadow.camera.fov = 100;
roomLight.shadow.bias = -0.002;
scene.add(roomLight);
// add light for pc fans
roomLight1.position.set(1.9, 0.8, 0);
roomLight1.castShadow = true;
roomLight1.shadow.radius = 5;
roomLight1.power = 0;
roomLight1.shadow.mapSize.width = 2048;
roomLight1.shadow.mapSize.height = 2048;
roomLight1.shadow.camera.far = 2.5;
// roomLight.shadow.camera.fov = 100;
roomLight1.shadow.bias = -0.002;
scene.add(roomLight1);
const fanLight1 = new THREE.PointLight(0xff0000, 10, 0.2);
const fanLight2 = new THREE.PointLight(0x00ff00, 30, 0.08);
const fanLight3 = new THREE.PointLight(0x00ff00, 30, 0.09);
const fanLight4 = new THREE.PointLight(0x00ff00, 30, 0.08);
const fanLight5 = new THREE.PointLight(0x00ff00, 30, 0.05);
fanLight1.position.set(0, 0.29, -0.29);
fanLight2.position.set(-0.15, 0.29, -0.29);
fanLight3.position.set(0.21, 0.29, -0.29);
fanLight4.position.set(0.21, 0.19, -0.29);
fanLight5.position.set(0.21, 0.08, -0.29);
scene.add(fanLight1);
scene.add(fanLight2);
scene.add(fanLight3);
scene.add(fanLight4);
scene.add(fanLight5);
// add point light for text on wall
const pointLight1 = new THREE.PointLight(0xff0000, 0, 1.1);
const pointLight2 = new THREE.PointLight(0xff0000, 0, 1.1);
const pointLight3 = new THREE.PointLight(0xff0000, 0, 1.1);
const pointLight4 = new THREE.PointLight(0xff0000, 0, 1.1);
pointLight1.position.set(-0.2, 0.6, 0.24);
pointLight2.position.set(-0.2, 0.6, 0.42);
pointLight3.position.set(-0.2, 0.6, 0.01);
pointLight4.position.set(-0.2, 0.6, -0.14);
scene.add(pointLight1);
scene.add(pointLight2);
scene.add(pointLight3);
scene.add(pointLight4);




const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  renderer.render(scene, camera);
  // stats.update();
}
function loadIntroText() {
  const loader = new FontLoader();
  loader.load('/fonts/unione.json', function (font) {
    const textMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x171f27, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ];
    const titleGeo = new TextGeometry('Kavishka Jayasinghe', {
      font: font,
      size: 0.13,
      height: 0.01,
    });

    titleText = new THREE.Mesh(titleGeo, textMaterials);
    titleText.rotation.y = Math.PI * 0.5;
    titleText.position.set(-0.265, 0.55, 0.75);
    titleText.scale.set(0, 0, 0); // Start small for animation effect
    scene.add(titleText);

    // Animate the text (Scale in & Rotate)
    gsap.to(titleText.scale, { x: 1, y: 1, z: 1, duration: 3.5, ease: "elastic.out(1, 0.3)" });
    gsap.fromTo(titleText.rotation, { y: Math.PI * 1.5 }, { y: Math.PI * 0.5, duration: 1.5, ease: "power2.out" });
  });



  loader.load('fonts/helvatica.json', function (font) {
    const textMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x171f27, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0xffffff }),
    ];
    const subTitleGeo = new TextGeometry(
      'Computer Engineering Undergraduate at the Faculty of Engineering, University of Ruhuna.',
      {
        font: font,
        size: 0.023,
        height: 0,
      }
    );
    subtitleText = new THREE.Mesh(subTitleGeo, textMaterials);
    subtitleText.rotation.y = Math.PI * 0.5;
    subtitleText.position.set(-0.255, 0.5, 0.6);
    scene.add(subtitleText);
  });
}

function switchTheme(themeType) {

  if (themeType === 'dark') {
    lightSwitch.rotation.z = Math.PI / 7;
    document.body.classList.remove('light-theme');
    document.body.classList.add('dark-theme');


    // 🔹 Load Night HDR
    rgbeLoader.load('textures/night.hdr', function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      //scene.environment = texture;
      scene.background = texture; // Optional
    });
    // main lights
    gsap.to(roomLight.color, {
      r: 0.27254901960784313,
      g: 0.23137254901960785,
      b: 0.6862745098039216,
    });
    gsap.to(ambientLight.color, {
      r: 0.17254901960784313,
      g: 0.23137254901960785,
      b: 0.6862745098039216,
    });
    gsap.to(roomLight, {
      intensity: 1.5,
    });
    gsap.to(ambientLight, {
      intensity: 0.3,
    });

    // fan lights
    gsap.to(fanLight5, {
      distance: 0.07,
    });

    // text color
    gsap.to(titleText.material[0].color, {
      r: 8,
      g: 8,
      b: 8,
      duration: 0,
    });
    gsap.to(titleText.material[1].color, {
      r: 5,
      g: 5,
      b: 5,
      duration: 0,
    });
    gsap.to(subtitleText.material[0].color, {
      r: 8,
      g: 8,
      b: 8,
      duration: 0,
    });
    gsap.to(subtitleText.material[1].color, {
      r: 5,
      g: 5,
      b: 5,
      duration: 0,
    });

    // text light
    gsap.to(pointLight1, {
      intensity: 0.6,
    });
    gsap.to(pointLight2, {
      intensity: 0.6,
    });
    gsap.to(pointLight3, {
      intensity: 0.6,
    });
    gsap.to(pointLight4, {
      intensity: 0.6,
    });
  } else {
    lightSwitch.rotation.z = 0;
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');

        // 🔹 Load Day HDR
        rgbeLoader.load('textures/environment.hdr', function (texture) {
          texture.mapping = THREE.EquirectangularReflectionMapping;
         // scene.environment = texture;
          scene.background = texture; // Optional
        });
    // main light
    gsap.to(roomLight.color, {
      r: 1,
      g: 1,
      b: 1,
    });
    gsap.to(ambientLight.color, {
      r: 1,
      g: 1,
      b: 1,
    });
    gsap.to(roomLight, {
      intensity: 2.5,
    });
    gsap.to(ambientLight, {
      intensity: 0.6,
    });

    // fan light
    gsap.to(fanLight5, {
      distance: 0.05,
    });

    // text color
    gsap.to(titleText.material[0].color, {
      r: 0.09019607843137255,
      g: 0.12156862745098039,
      b: 0.15294117647058825,
      duration: 0,
    });
    gsap.to(titleText.material[1].color, {
      r: 1,
      g: 1,
      b: 1,
      duration: 0,
    });
    gsap.to(subtitleText.material[0].color, {
      r: 0.09019607843137255,
      g: 0.12156862745098039,
      b: 0.15294117647058825,
      duration: 0,
    });
    gsap.to(subtitleText.material[1].color, {
      r: 1,
      g: 1,
      b: 1,
      duration: 0,
    });

    // text light
    gsap.to(pointLight1, {
      intensity: 0,
    });
    gsap.to(pointLight2, {
      intensity: 0,
    });
    gsap.to(pointLight3, {
      intensity: 0,
    });
    gsap.to(pointLight4, {
      intensity: 0,
    });
  }
}

function enableOrbitControls() {
  controls.enabled = true;
}

function disableOrbitControls() {
  controls.enabled = false;
}

function enableCloseBtn() {
  document.getElementById('close-btn').style.display = 'block';
}

function disableCloseBtn() {
  document.getElementById('close-btn').style.display = 'none';
}

function resetBookCover() {
  if (!bookCover) return;

  gsap.to(bookCover.rotation, {
    x: 0,
    duration: 1.5,
  });
}

function resetProjects() {
  if (projects.length === 0) return;

  projects.forEach((project, i) => {
    gsap.to(project.mesh.material, {
      opacity: 0,
      duration: 1,
    });
    gsap.to(project.mesh.position, {
      y: project.y,
      duration: 1,
    });
    gsap.to(project.mesh.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 0,
      delay: 1,
    });
  });
}

function resetCamera() {
  resetBookCover();
  resetProjects();
  disableCloseBtn();
  gsap.to(camera.position, {
    ...defaultCameraPos,
    duration: 1.5,
  });
  gsap.to(camera.rotation, {
    ...defaultCamerRot,
    duration: 1.5,
  });
  gsap.delayedCall(1.5, enableOrbitControls);

  // reset dimmed light for about display
  if (theme !== 'dark') {
    gsap.to(roomLight, {
      intensity: 2.5,
      duration: 1.5,
    });
  }
}

function logoListener() {
  document.getElementById('logo').addEventListener('click', function (e) {
    e.preventDefault();
    resetCamera();
  });
}

function cameraToAbout() {
  if (!bookCover) return;

  gsap.to(camera.position, {
    ...aboutCameraPos,
    duration: 1.5,
  });
  gsap.to(camera.rotation, {
    ...aboutCameraRot,
    duration: 1.5,
  });
  gsap.to(bookCover.rotation, {
    x: Math.PI/1.1,
    duration: 5,
    delay: 1,
  });

  // prevent about text clutter due to bright light
  if (theme !== 'dark') {
    gsap.to(roomLight, {
      intensity: 2,
      duration: 1.5,
    });
  }
}

function cameraTocontact() {
  if (!bookCover) return;

  gsap.to(camera.position, {
    ...contactsCameraPos,
    duration: 1.5,
  });
  gsap.to(camera.rotation, {
    ...contactsCameraRot,
    duration: 1.5,
  });
  gsap.to(bookCover.rotation, {
    x: Math.PI/1.1,
    duration: 5,
    delay: 1,
  });

  // prevent about text clutter due to bright light
  if (theme !== 'dark') {
    gsap.to(roomLight, {
      intensity: 2,
      duration: 1.5,
    });
  }
}

function aboutMenuListener() {
  document.getElementById('about-menu').addEventListener('click', function (e) {
    e.preventDefault();
    disableOrbitControls();
    resetProjects();
    cameraToAbout();
    gsap.delayedCall(1.5, enableCloseBtn);
  });
}

function projectsMenuListener() {
  // Preload textures before creating meshes
  const textureLoader = new THREE.TextureLoader();
  const textures = [];
  
  // Preload all textures first
  const texturePromises = projects.map((project, index) => {
    return new Promise((resolve) => {
      textureLoader.load(
        project.image,
        (texture) => {
          // Enable texture filtering for better quality
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          textures[index] = texture;
          resolve();
        },
        undefined,
        (error) => {
          console.error(`Error loading texture for project ${index}:`, error);
          resolve(); // Resolve anyway to continue loading other textures
        }
      );
    });
  });

  // Once all textures are loaded, create meshes
  Promise.all(texturePromises).then(() => {
    // Create project planes with improved layout
    projects.forEach((project, i) => {
      // Create a 2x3 grid layout (up to 6 projects)
      const colIndex = i % 3; // Two columns (0 or 1)
      const rowIndex = Math.floor(i / 3); // Up to 3 rows
      
      const geometry = new THREE.PlaneGeometry(0.71, 0.4);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: textures[i],
        transparent: true, // Enable transparency for smooth fade-in
        opacity: 0 // Start invisible for animation
      });
      
      const projectPlane = new THREE.Mesh(geometry, material);
      projectPlane.name = 'project';
      projectPlane.userData = {
        url: project.url,
        index: i
      };
      
      // Adjust layout spacing for better visibility
      projectPlane.position.set(
        0.8 + colIndex * 0.85, // More space between columns
        1 - rowIndex * 0.45,    // Better vertical spacing
        -1.15
      );
      
      projectPlane.scale.set(0, 0, 0); // Start with zero scale for animation
      
      // Store mesh & y position for animation
      projects[i].mesh = projectPlane;
      projects[i].y = 1 - rowIndex * 0.45;
      
      scene.add(projectPlane);
    });
  });

  // Add event listener for the projects menu
  document
    .getElementById('projects-menu')
    .addEventListener('click', function (e) {
      e.preventDefault();
      disableOrbitControls();
      resetBookCover();
      
      gsap.to(camera.position, {
        ...projectsCameraPos,
        duration: 1.5,
      });
      
      gsap.to(camera.rotation, {
        ...contacts1CameraRot,
        duration: 1.5,
      });
      
      gsap.delayedCall(1.5, enableCloseBtn);

      // Animate & show project items with improved sequencing
      projects.forEach((project, i) => {
        // Scale up from zero
        gsap.to(project.mesh.scale, {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.8,
          delay: 1.5 + i * 0.1,
          ease: "back.out(1.5)"
        });
        
        // Fade in
        gsap.to(project.mesh.material, {
          opacity: 1,
          duration: 1,
          delay: 1.5 + i * 0.1,
        });
        
        // Slight floating animation
        gsap.to(project.mesh.position, {
          y: project.y + 0.05,
          duration: 1,
          delay: 1.5 + i * 0.1,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });
    });
    
  // Add click handler for project items
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  window.addEventListener('click', (event) => {
    // Convert mouse position to normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the raycaster
    raycaster.setFromCamera(mouse, camera);
    
    // Check for intersections with project planes
    const intersects = raycaster.intersectObjects(scene.children);
    
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name === 'project') {
        const projectData = intersects[i].object.userData;
        // Open the project URL or trigger detail view
        if (projectData.url) {
          window.open(projectData.url, '_blank');
        }
        break;
      }
    }
  });
}

function contactMenuListener() {

  document.getElementById('contacts-menu').addEventListener('click', function (e) {
    e.preventDefault();
    disableOrbitControls();
    resetProjects();
    cameraTocontact();
    gsap.delayedCall(1.5, enableCloseBtn);
  });
}

function init3DWorldClickListeners() {
  const mousePosition = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let intersects;

  window.addEventListener('click', function (e) {
    // store value set to prevent multi time update in foreach loop
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // prevent about focus on button click which are positioned above book in mobile view
    const closeBtn = document.getElementById('close-btn');
    const projectsBtn = document.getElementById('projects-menu');
    if (
      e.target === closeBtn ||
      closeBtn.contains(e.target) ||
      e.target === projectsBtn ||
      projectsBtn.contains(e.target)
    ) {
      return false;
    }

    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mousePosition, camera);
    intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach((intersect) => {
      if (intersect.object.name === 'project') {
        intersect.object.userData.url &&
          window.open(intersect.object.userData.url);
      }

      if (
        intersect.object.name === 'Book' ||
        intersect.object.name === 'Book001'
      ) {
        disableOrbitControls();
        cameraToAbout();
        gsap.delayedCall(1.5, enableCloseBtn);
      }

      if (
        intersect.object.name === 'SwitchBoard' ||
        intersect.object.name === 'Switch'
      ) {
        theme = newTheme;
        switchTheme(theme);
      }
    });
  });
}

// RESPONSIVE
function initResponsive(roomScene) {
  if (isMobile) {
    roomScene.scale.set(0.95, 0.95, 0.95);
    aboutCameraPos = {
      x: 0.09,
      y: 0.23,
      z: 0.51,
    };
    aboutCameraRot = {
      x: -1.57,
      y: 0,
      z: 1.57,
    };

    // rect light
    // rectLight.width = 0.406;
    // rectLight.height = 0.3;
    // rectLight.position.z = -0.34;

    // project
    projectsCameraPos = {
      x: 1.1,
      y: 0.82,
      z: 0.5,
    };
    projectsCameraRot = {
      x: 0,
      y: 0,
      z: 1.55,
    };
    projects.forEach((project, i) => {
      project.mesh.position.z = -1.13;
    });

    controls.maxDistance = 1.5;
    controls.maxAzimuthAngle = Math.PI * 0.75;
  }
}

// close button
document.getElementById('close-btn').addEventListener('click', (e) => {
  e.preventDefault();
  resetCamera();
});

// contact menu
document.getElementById('contact-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document
    .querySelector('.contact-menu__dropdown')
    .classList.toggle('contact-menu__dropdown--open');
});

document.addEventListener('mouseup', (e) => {
  const container = document.querySelector('.contact-menu');
  if (!container.contains(e.target)) {
    container
      .querySelector('.contact-menu__dropdown')
      .classList.remove('contact-menu__dropdown--open');
  }
});

// update camera, renderer on resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
