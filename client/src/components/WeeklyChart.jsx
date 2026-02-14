import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WeeklyChart({ logs }) {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current || !logs || logs.length === 0) return;

        mountRef.current.innerHTML = "";

        const width = 1000;
        const height = 500;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#f9fafb");

        const aspect = width / height;
        const frustumSize = 30;

        const camera = new THREE.OrthographicCamera(
            -frustumSize * aspect / 2,
            frustumSize * aspect / 2,
            frustumSize / 2,
            -frustumSize / 2,
            0.1,
            1000
        );
        camera.position.z = 20;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        // Logs grouped by day of week
        const logsByDay = Array.from({ length: 7 }, () => []);
        logs.forEach((log) => {
            const date = new Date(log.timestamp);

            if (!isNaN(date)) logsByDay[date.getDay()].push(log);
        });

        const totalsPerDay = logsByDay.map((dayLogs) =>
            dayLogs.reduce((sum, log) => sum + (log.duration ?? 0), 0)
        );
        const maxTotal = Math.max(...totalsPerDay, 60);

        // Helper: create sharp sprite text
        const createSpriteText = (text, fontSize = 24, color = "#111827") => {
            const scaleFactor = 6;
            const canvas = document.createElement("canvas");
            canvas.width = 256 * scaleFactor;
            canvas.height = 64 * scaleFactor;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = color;
            ctx.font = `bold ${fontSize * scaleFactor}px sans-serif`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const texture = new THREE.CanvasTexture(canvas);
            texture.minFilter = THREE.LinearFilter;
            const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(6, 1.5, 1);
            return sprite;
        };

        // Draw bars and labels
        logsByDay.forEach((dayLogs, dayIndex) => {
            let currentYOffset = -8;
            const xPos = (dayIndex - 3) * 6;

            dayLogs.forEach((log, logIndex) => {
                const name = log.activityName || "Unknown";
                const duration = log.duration || 0;
                if (!name || duration <= 0) return;

                const barHeight = (duration / maxTotal) * 18;

                const geometry = new THREE.BoxGeometry(3.5, barHeight, 1);
                const material = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(`hsl(${(dayIndex * 50 + logIndex * 40) % 360}, 65%, 55%)`),
                });
                const bar = new THREE.Mesh(geometry, material);
                bar.position.set(xPos, currentYOffset + barHeight / 2, 0);
                scene.add(bar);

                const sprite = createSpriteText(`${name} (${duration}m)`, 22, "#180501");
                sprite.position.set(xPos, currentYOffset + barHeight / 2 + 0.5, 0.5);
                scene.add(sprite);

                currentYOffset += barHeight + 0.3;
            });

            // Day label
            const dayLabel = createSpriteText(days[dayIndex], 28, "#180501");
            dayLabel.position.set(xPos, -11, 0);
            scene.add(dayLabel);
        });

        renderer.render(scene, camera);

        return () => {
            renderer.dispose();
            if (mountRef.current) mountRef.current.innerHTML = "";
        };
    }, [logs]);

    return (
        <div
            style={{
                width: "1000px",
                height: "500px",
                margin: "20px auto",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                overflow: "hidden",
            }}
            ref={mountRef}
        />
    );
}
