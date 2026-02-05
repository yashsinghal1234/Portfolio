import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "../data/globe.json";

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

export function Globe({ globeConfig, data, activeLocation }) {
    const globeRef = useRef(null);
    const groupRef = useRef();
    const [isInitialized, setIsInitialized] = useState(false);
    const allPointsRef = useRef([]);

    const defaultProps = {
        pointSize: 1,
        atmosphereColor: "#705020",
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        polygonColor: "rgba(255,214,120,0.2)",
        globeColor: "#050509",
        emissive: "#1a1205",
        emissiveIntensity: 0.4,
        shininess: 0.9,
        arcTime: 2000,
        arcLength: 0.9,
        rings: 1,
        maxRings: 3,
        ...globeConfig,
    };

    // Initialize globe only once
    useEffect(() => {
        if (!globeRef.current && groupRef.current) {
            globeRef.current = new ThreeGlobe();
            groupRef.current.add(globeRef.current);
            // shift slightly down so only upper part is visible in panel
            groupRef.current.position.y = -25;
            setIsInitialized(true);
        }
    }, []);

    // Build material
    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        const globeMaterial = globeRef.current.globeMaterial();
        globeMaterial.color = new Color(defaultProps.globeColor);
        globeMaterial.emissive = new Color(defaultProps.emissive);
        globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity ?? 0.25;
        globeMaterial.shininess = defaultProps.shininess ?? 0.9;
    }, [
        isInitialized,
        defaultProps.globeColor,
        defaultProps.emissive,
        defaultProps.emissiveIntensity,
        defaultProps.shininess,
    ]);

    // Build data
    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data) return;

        const arcs = data;
        const points = [];

        // Points from arc endpoints
        for (let i = 0; i < arcs.length; i++) {
            const arc = arcs[i];
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.startLat,
                lng: arc.startLng,
            });
            points.push({
                size: defaultProps.pointSize,
                order: arc.order,
                color: arc.color,
                lat: arc.endLat,
                lng: arc.endLng,
            });
        }

        // Extra main city checkpoints with golden color
        const mainCheckpoints = [
            { lat: 51.5074, lng: -0.1278 }, // London
            { lat: 40.7128, lng: -74.006 }, // New York
            { lat: 34.0522, lng: -118.2437 }, // Los Angeles
            { lat: 37.7749, lng: -122.4194 }, // San Francisco
            { lat: 48.8566, lng: 2.3522 }, // Paris
            { lat: 52.52, lng: 13.405 }, // Berlin
            { lat: 35.6895, lng: 139.6917 }, // Tokyo
            { lat: 1.3521, lng: 103.8198 }, // Singapore
            { lat: -33.8688, lng: 151.2093 }, // Sydney
            { lat: -23.5505, lng: -46.6333 }, // Sao Paulo
            { lat: 55.7558, lng: 37.6173 }, // Moscow
            { lat: 31.2304, lng: 121.4737 }, // Shanghai
            { lat: 25.2048, lng: 55.2708 }, // Dubai
            { lat: -1.2921, lng: 36.8219 }, // Nairobi
            { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
        ];

        mainCheckpoints.forEach((cp) => {
            points.push({
                size: defaultProps.pointSize,
                order: 0,
                color: "#ffd37a",
                lat: cp.lat,
                lng: cp.lng,
            });
        });

        const filteredPoints = points.filter(
            (v, i, a) => a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k] === v[k])) === i
        );

        allPointsRef.current = filteredPoints;

        globeRef.current
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(3)
            .hexPolygonMargin(0.7)
            .showAtmosphere(defaultProps.showAtmosphere)
            .atmosphereColor(defaultProps.atmosphereColor)
            .atmosphereAltitude(defaultProps.atmosphereAltitude)
            .hexPolygonColor(() => defaultProps.polygonColor);

        globeRef.current
            .arcsData(data)
            .arcStartLat((d) => d.startLat * 1)
            .arcStartLng((d) => d.startLng * 1)
            .arcEndLat((d) => d.endLat * 1)
            .arcEndLng((d) => d.endLng * 1)
            .arcColor((e) => e.color)
            .arcAltitude((e) => e.arcAlt * 1)
            .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 2)])
            .arcDashLength(defaultProps.arcLength)
            .arcDashInitialGap((e) => e.order * 1)
            .arcDashGap(15)
            .arcDashAnimateTime(() => defaultProps.arcTime);

        globeRef.current
            .pointsData(filteredPoints)
            .pointColor(() => "#ffd37a")
            .pointsMerge(true)
            .pointAltitude(0.0)
            .pointRadius(2);

        globeRef.current
            .ringsData([])
            .ringColor(() => defaultProps.polygonColor)
            .ringMaxRadius(defaultProps.maxRings)
            .ringPropagationSpeed(RING_PROPAGATION_SPEED)
            .ringRepeatPeriod(
                (defaultProps.arcTime * defaultProps.arcLength) / defaultProps.rings
            );
    }, [
        isInitialized,
        data,
        defaultProps.pointSize,
        defaultProps.showAtmosphere,
        defaultProps.atmosphereColor,
        defaultProps.atmosphereAltitude,
        defaultProps.polygonColor,
        defaultProps.arcLength,
        defaultProps.arcTime,
        defaultProps.rings,
        defaultProps.maxRings,
    ]);

    // Rings animation (random golden pulses on checkpoints)
    useEffect(() => {
        if (!globeRef.current || !isInitialized) return;

        const interval = setInterval(() => {
            if (!globeRef.current) return;

            const source = allPointsRef.current;
            if (!source.length) return;

            const count = Math.min(18, source.length);
            const indices = genRandomNumbers(0, source.length, count);

            const ringsData = source
                .filter((_, i) => indices.includes(i))
                .map((p) => ({
                    lat: p.lat,
                    lng: p.lng,
                    color: "#ffd37a",
                }));

            globeRef.current.ringsData(ringsData);
        }, 800);

        return () => {
            clearInterval(interval);
        };
    }, [isInitialized]);

    // Smoothly rotate globe towards active location when selection changes
    const targetRotationRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if (!activeLocation) return;

        const { lat, lon } = activeLocation;
        const latRad = (lat * Math.PI) / 180;
        const lonRad = (lon * Math.PI) / 180;

        // we want the chosen point roughly at the center facing camera
        targetRotationRef.current = {
            x: -latRad,
            y: -lonRad,
        };
    }, [activeLocation]);

    useFrame(() => {
        if (!groupRef.current) return;
        const target = targetRotationRef.current;
        const current = groupRef.current.rotation;

        const lerpFactor = 0.08;
        current.x += (target.x - current.x) * lerpFactor;
        current.y += (target.y - current.y) * lerpFactor;
    });

    return <group ref={groupRef} />;
}

export function WebGLRendererConfig() {
    const { gl, size } = useThree();

    useEffect(() => {
        gl.setPixelRatio(window.devicePixelRatio);
        gl.setSize(size.width, size.height);
        gl.setClearColor(0x000000, 0);
    }, [gl, size]);

    return null;
}

export function World(props) {
    const { globeConfig, data, activeLocation } = props;
    const scene = new Scene();
    scene.fog = new Fog(0xffffff, 400, 2000);

    return (
        <Canvas
            scene={scene}
            camera={{ fov: 50, aspect, near: 180, far: 1800, position: [0, 0, cameraZ] }}
            style={{ width: "100%", height: "100%" }}
        >
            <WebGLRendererConfig />
            <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
            <directionalLight
                color={globeConfig.directionalLeftLight}
                position={new Vector3(-400, 100, 400)}
            />
            <directionalLight
                color={globeConfig.directionalTopLight}
                position={new Vector3(-200, 500, 200)}
            />
            <pointLight
                color={globeConfig.pointLight}
                position={new Vector3(-200, 500, 200)}
                intensity={0.8}
            />
            <Globe globeConfig={globeConfig} data={data} activeLocation={activeLocation} />
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                minDistance={cameraZ}
                maxDistance={cameraZ}
                autoRotate
                autoRotateSpeed={0.9}
                minPolarAngle={Math.PI / 3.5}
                maxPolarAngle={Math.PI - Math.PI / 3}
            />
        </Canvas>
    );
}

export function genRandomNumbers(min, max, count) {
    const arr = [];
    while (arr.length < count) {
        const r = Math.floor(Math.random() * (max - min)) + min;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
}

