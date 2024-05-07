import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import fireFliesVertex from './shaders/fireflise/vertex.glsl'
import fireFliesFragment from './shaders/fireflise/fragment.glsl'

console.log(fireFliesVertex)
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

/**
 * Texture
 */
// Assuming textureLoader, scene, and gltfLoader are initialized correctly
const verandaTexture = textureLoader.load('veranda-bake2.jpg');
const bianiaTexture = textureLoader.load('baked-bania-last.jpg');
const metalTexture = textureLoader.load('baked-metal.jpg');
const backgroundTexture = textureLoader.load('background/back.jpg');


// Set texture properties
metalTexture.flipY = false
metalTexture.colorSpace = THREE.SRGBColorSpace

bianiaTexture.flipY = false
bianiaTexture.colorSpace = THREE.SRGBColorSpace

verandaTexture.flipY = false
verandaTexture.colorSpace = THREE.SRGBColorSpace

// Correct material property name and ensure it's used consistently
var models = {
    veranda: {
        material: new THREE.MeshBasicMaterial({ map: verandaTexture }),
        path: 'veranda-out.glb',
        desktop:{
            rotation:{
                x: -0.03,
                y: 10.3,
                z: 0,
            },
            position:{
                x: 0.0,
                y: 0,
                z: 0,
            },
        },
        mobile:{
            rotation:{
                x: -0.2,
                y: 10.3,
                z: 0,
            },
            position:{
                x: -0.3,
                y: -1.35,
                z: -2.9,
            },
        }
    },
    metal: {
        material: new THREE.MeshBasicMaterial({ map: metalTexture }),
        path: 'metal.glb',
        desktop:{
            rotation:{
                x: -0.03,
                y: 10.3,
                z: 0,
            },
            position:{
                x: 0,
                y: 0,
                z: 0,
            }
        },
        mobile:{
            rotation:{
                x: -0.2,
                y: 10.2,
                z: 0,
            },
            position:{
                x: 0,
                y: -1.1,
                z: -2.5,
            },
        },
        
    },
    biania: {
        material: new THREE.MeshBasicMaterial({ map: bianiaTexture }),
        path: 'ban.glb',
        desktop:{
            rotation:{
                x: -0.02,
                y: 10.3,
                z: 0,
            },
            position:{
                x: 0.7,
                y: 0,
                z: 0.1,
            }
        },
        mobile:{
            rotation:{
                x: -0.1,
                y: 10.2,
                z: 0,
            },
            position:{
                x: 0,
                y: -1,
                z: -2.5,
            },
        },
    },
};

let currentModel = null;

var baniaButton = document.getElementById('bania');
var verandaButton = document.getElementById('terase')
var metalButton = document.getElementById('metal_const')

baniaButton.addEventListener('click', () => {
    loadModel(models.biania);
});
verandaButton.addEventListener('click', () => {
    loadModel(models.veranda);
});
metalButton.addEventListener('click', () => {
    loadModel(models.metal);
});

function loadModel(model) {
    if (currentModel) {
        scene.remove(currentModel);
    }
    var screenState = sizes.screen
    console.log(screenState)
    gltfLoader.load(model.path, (gltf) => {
        const rotation = model[screenState].rotation;
        gltf.scene.rotation.x = rotation.x;
        gltf.scene.rotation.y = rotation.y;
        gltf.scene.rotation.z = rotation.z;

        const position = model[screenState].position;
        gltf.scene.position.x = position.x;
        gltf.scene.position.y = position.y;
        gltf.scene.position.z = position.z;

        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                child.material = model.material;
            }
        });
        console.log(gltf.scene)
        scene.add(gltf.scene);
        currentModel = gltf.scene;
        currentModel.data = model

        
    });
    
}

/**
 * Background
 */
const backgroundGeometry = new THREE.PlaneGeometry( 25, 13 );
const backgroundMaterial = new THREE.MeshBasicMaterial( 
    {
        map: backgroundTexture,
        transparent: true,
        opacity: 0.5
    } 
);
console.log(backgroundMaterial)
const backgroundPlane = new THREE.Mesh( backgroundGeometry, backgroundMaterial );
backgroundPlane.position.z = -2.0;
scene.add(backgroundPlane);


/**
 * Fireflise
 */
//Geometry
const firefliseGeometry = new THREE.BufferGeometry()
const firefliseCount = 70
const positionArray = new Float32Array(firefliseCount * 3)
const scaleArray = new Float32Array(firefliseCount)

for(let i = 0; i < firefliseCount; i++){
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 5
    positionArray[i * 3 + 1] = Math.random() 
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 5

    scaleArray[i] = Math.random()
}

firefliseGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliseGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material
const firefliseMaterial = new THREE.ShaderMaterial({
    vertexShader: fireFliesVertex,
    fragmentShader: fireFliesFragment,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    uniforms:{
        uPixelRatio:{value: Math.min(window.devicePixelRatio, 2)},
        uSize: {value: 60},
        uTime: {value: 0}
    }
})

// gui.add(firefliseMaterial.uniforms.uSize, 'value').min(1).max(150).step(1).name('firefliesSize')

// Points
const fireflise = new THREE.Points(firefliseGeometry, firefliseMaterial)
scene.add(fireflise)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    screen: window.innerWidth >= 740 ? 'desktop' : 'mobile'
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    checkAndUpdateScreenSize()
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Update firflies
    firefliseMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
})


// function to check are cheanges from desctop to mobile or no
function checkAndUpdateScreenSize() {
    const currentScreen = window.innerWidth >= 740 ? 'desktop' : 'mobile';

    if (sizes.screen !== currentScreen) {
        sizes.screen = currentScreen;

        setCameraPostion (sizes.screen)
        sceneCenter = setSceneCenter(sizes.screen)

        if (!currentModel) return 

        const rotation = currentModel.data[currentScreen].rotation;
        const position = currentModel.data[currentScreen].position;
        currentModel.rotation.x = rotation.x;
        currentModel.rotation.y = rotation.y;
        currentModel.rotation.z = rotation.z;

        currentModel.position.x = position.x;
        currentModel.position.y = position.y;
        currentModel.position.z = position.z;

        



        // currentModel

        console.log(rotation);
        console.log(position)
    }
}

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
setCameraPostion (sizes.screen)

function setCameraPostion (size) {
    const curentScren = size

        if(curentScren === 'desktop'){
            camera.position.x = -1.9
            camera.position.y = 0.75
            camera.position.z = 4.5
            backgroundMaterial.opacity = 1
            backgroundPlane.position.z = -2.0;
        }
        if(curentScren === 'mobile'){
            camera.position.x = -1
            camera.position.y = -2
            camera.position.z = 5
            backgroundMaterial.opacity = 0.75
            backgroundPlane.position.z = -4.5;
            backgroundPlane.position.y = 0.5;

        }
        console.log('cached')
}

scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

var clearColor = '#000000'
renderer.setClearColor(clearColor)

/**
 *  Cursore
 */
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.width + 0.5
})
// scene.rotation.x = 10 

let sceneCenter = setSceneCenter(sizes.screen)

function setSceneCenter(size) {
    const currentScreen = size
    if (currentScreen === 'desktop'){
        return new THREE.Vector3(-0.9, 0.45, 0);
    }
    else{
        return new THREE.Vector3(-0.6, 1.2, -1);
    }
}
console.log(sceneCenter)


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>

{
    const elapsedTime = clock.getElapsedTime()
    // update time
    firefliseMaterial.uniforms.uTime.value = elapsedTime

    // Update camera look
    camera.position.x = cursor.x 
    camera.position.y = cursor.y 

    camera.lookAt(sceneCenter);

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


