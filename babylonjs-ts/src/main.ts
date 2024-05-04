import {Engine} from "@babylonjs/core/Engines/engine";
import {Scene} from "@babylonjs/core/scene";
import { ArcRotateCamera, /* nativeOverride */ } from "@babylonjs/core";
import { HemisphericLight } from "@babylonjs/core";
import { Vector3 } from "@babylonjs/core";
import { Color3 } from "@babylonjs/core";
import { CreateGround } from "@babylonjs/core";
import { CreateSphere } from "@babylonjs/core";
import { StandardMaterial } from "@babylonjs/core";

window.addEventListener('DOMContentLoaded', async() => {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
    const engine = new Engine(canvas,true);
    const createScene = async () => {
        const scene = new Scene(engine)

        // Camera Configuration
        const camera = new ArcRotateCamera("Camera",-Math.PI / 2.5, Math.PI / 2.5, 8, new Vector3(0, 2, 0), scene);
        camera.attachControl(canvas,true);
        camera.wheelDeltaPercentage = 2;

        // Light Configuration
        const light = new HemisphericLight("light",new Vector3(0,1,0),scene);
        light.intensity = 1.0;

        // Sphere Configuration
        const sphere = CreateSphere("sphere",{diameter: 2},scene);

        // Material Configuration
        // Sphere Material
        const sphereMaterial = new StandardMaterial("sphereMaterial",scene);
        sphereMaterial.diffuseColor = new Color3(0.5,0.5,0.5);
        sphereMaterial.specularColor = new Color3(0.6,0.6,0.6);
        sphere.material = sphereMaterial;
        sphere.position.y = 1;

        // Ground Configuration
        const ground = CreateGround("ground",{width: 6,height: 6},scene);
        ground.receiveShadows = true;

        if(navigator.xr){
            /* const xr = */ await scene.createDefaultXRExperienceAsync({
                uiOptions:{
                    sessionMode: "immersive-ar",
                },
            })
        }

        return scene
    }
    
    const scene = await createScene();

    engine.runRenderLoop(() => {
        scene.render();
    });

    window.addEventListener('resize',() => {
        engine.resize();
    });
});