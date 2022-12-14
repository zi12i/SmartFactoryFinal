/**
 * Three.js의 카메라를 설정하는 파트입니다
 */
import { CinematicCamera } from 'three/examples/jsm/cameras/CinematicCamera'

class Camera {
  constructor() {
    this.camera = new CinematicCamera(1000, 2, 1, 2000)

    this.setCamera()
  }

  setCamera() {
    this.camera.position.set(0, 100, 200)
  }

  get cameraElement() {
    return this.camera
  }
}

export { Camera }
