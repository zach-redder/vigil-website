import React, { useEffect, useRef } from "react";
import "./App.css";

// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
// Import Logo from "./logo.svg";
import { ReactComponent as Logo } from "./assets/VIGILfitness.svg";
import { ReactComponent as InstagramIcon } from "./assets/instagram.svg";
import { ReactComponent as XIcon } from "./assets/x.svg";
import { ReactComponent as YouTubeIcon } from "./assets/youtube.svg";

function App() {
  // Create a ref to reference the container div
  const containerRef = useRef(null);

  useEffect(() => {
    // Get the container element from the ref
    const container = containerRef.current;
    if (!container) return; // Exit if the container isn’t available

    // Create a Three.js Scene
    const scene = new THREE.Scene();
    // Create a new camera with positions and angles
    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );

    // Instantiate a new renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Add the renderer to the DOM
    container.appendChild(renderer.domElement);

    // Add lights to the scene, so we can actually see the 3D model
    const lightMain = new THREE.SpotLight(0x404040, 40); // (color, intensity)
    lightMain.position.set(200, 200, 80); // Position
    scene.add(lightMain);

    const lightLeft = new THREE.SpotLight(0x404040, 2); // (color, intensity)
    lightLeft.position.set(300, -300, 250); // Position
    scene.add(lightLeft);

    // Ambient light for subtle global illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    // This adds controls to the camera, so we can rotate it with the mouse
    const controls = new OrbitControls(camera, renderer.domElement);
    // Disable zooming and panning, only allow rotation
    controls.enableZoom = false;
    controls.enablePan = false;

    // Speed of automatic rotation (radians per frame)
    const rotationSpeed = 0.005;

    // Variable to hold the loaded model for rotation
    let model;

    // Set which object to render
    const objToRender = "dumbbell";
    // Instantiate a loader for the .gltf file
    const loader = new GLTFLoader();
    // Load the file
    loader.load(
      `/models/${objToRender}/scene.gltf`,
      (gltf) => {
        const object = gltf.scene;
        scene.add(object);
        model = object; // Assign to model for rotation

        // Center the model and get its size
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.set(0, 3, -3.3).sub(center);
        const size = box.getSize(new THREE.Vector3());
        const width = size.x;

        // Adjust camera position based on model size
        const diagonal = size.length();
        camera.position.set(3, 10, -5);
        camera.lookAt(center);
      },
      (xhr) => {
        // While it is loading, log the progress
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        // If there is an error, log it
        console.error(error);
      }
    );

    // Render the scene continuously
    function animate() {
      requestAnimationFrame(animate);
      // Automatically rotate the model horizontally
      if (model) {
        model.rotateZ(rotationSpeed);
      }
      renderer.render(scene, camera); // Render the scene with the camera
    }
    animate(); // Start the animation loop

    // Add a listener to the window, so we can resize the window and the camera
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose(); // Free up memory
    };
  }, []); // Empty dependency array: runs once on mount

  return (
    <div ref={containerRef} id="container3D">
      <div id="layout-container">
        <div id="header">
          <Logo id="logo" />
          {/* <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>         Uncomment for Light/Dark Mode Toggle
          </label> */}
        </div>
        {/* All inside this next div is rooted to bottom of site */}
        <div id="bottom-content">
          <div id="info-container">
            <h3 id="still-in-dev">We're still in development</h3>
            <h1 id="coming-soon">Coming Soon</h1>
            <p id="newsletter-text">
              Join our newsletter to be the first to know when VIGIL fitness
              launches and receive updates on the latest progress.
            </p>
            <label id="non-mobile">Email *</label>
          </div>
          <div id="email-pill">
            <input
              id="email-input"
              type="email"
              placeholder="example@email.com"
            />
            <button>Sign Up</button>
          </div>
        </div>
        {/* Social Media Icons */}
        <div id="social-icons">
          <a
            href="https://instagram.com/vigilfitness/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
          >
            <InstagramIcon className="social-icon" />
          </a>
          <a
            href="https://x.com/vigilfitness"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on X"
          >
            <XIcon className="social-icon" />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe to our YouTube channel"
          >
            <YouTubeIcon className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
