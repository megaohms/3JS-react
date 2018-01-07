import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry,
  MeshLambertMaterial, Mesh, PointLight } from 'three';

class App extends Component {
    constructor(props) {
      super(props)

      this.start = this.start.bind(this)
      this.stop = this.stop.bind(this)
      this.animate = this.animate.bind(this)
      this.renderScene = this.renderScene.bind(this)
    }

    componentDidMount() {
      // const width = this.mount.clientWidth;
      const width = window.innerWidth;
      // const height = this.mount.clientHeight;
      const height = window.innerHeight;

      const scene = new Scene();
      const camera = new PerspectiveCamera(
        75, // FOV - vertical field of view; dictates the size of the vertical space which the camera's view can reach
        width/height, // aspect - ration which creates the horizontal FOV based off the vertical
        0.1, // near - near plan of camer (view begins)
        1000 // far - far plane of camera (view ends)
      );
      const renderer = new WebGLRenderer();
      const geometry = new BoxGeometry(20, 20, 20);
      const material = new MeshLambertMaterial({ color: 0xfd50d7 });
      const cube = new Mesh(geometry, material);
      const light = new PointLight(0xFFFF00);

      camera.position.z = 100;
      scene.add(cube);
      light.position.set(10,0, 25);
      scene.add(light);
      renderer.setClearColor('#000000'); // not sure what this does.. from https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react
      renderer.setSize(width, height);

      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      this.material = material;
      this.cube = cube;
      this.light = light;

      this.mount.appendChild(renderer.domElement);
      this.start()
    }

    componentWillUnmount() {
      this.stop()
      this.mount.removeChild(this.renderer.domElement)
    }

    start() {
      if (!this.frameId) {
        this.frameId = requestAnimationFrame(this.animate)
      }
    }

    stop() {
      cancelAnimationFrame(this.frameId)
    }

    animate() {
      this.cube.rotation.x += 0.01
      this.cube.rotation.y += 0.01

      this.renderScene()
      this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
      this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
          <div
            ref={(mount) => { this.mount = mount }}
          />
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
