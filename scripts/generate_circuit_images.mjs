/**
 * Batch Circuit Image Export Script
 * 
 * Automatically generates high-quality PNG images for every circuit template
 * in the simulator by:
 * 1. Loading the app in a headless browser (sandbox mode)
 * 2. For each circuit: clearing canvas, injecting circuit JSON, rendering,
 *    then capturing the SVG as a 2x-res PNG
 * 3. Saving all PNGs to `circuit_images/` with descriptive filenames
 * 
 * Prerequisites:
 *   - Dev server running: `npx http-server -p 3001`
 *   - Puppeteer available: `npm install puppeteer`
 * 
 * Usage:
 *   node scripts/generate_circuit_images.mjs
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const BASE_URL = 'http://localhost:3001';
const OUTPUT_DIR = path.resolve(ROOT, 'circuit_images');

// ────────────────────────────────────────────────────
// Import all templates using dynamic import
// ────────────────────────────────────────────────────
async function loadAllCircuits() {
    const templatesDir = path.resolve(ROOT, 'src', 'templates');
    const circuits = [];

    // ── Simple templates (top-level components/wires) ──
    const simpleTemplates = [
        { file: 'power_factor_correction.js', exportName: 'power_factor_correction_template', id: 'basic-ee-exp-1' },
        { file: 'verification_of_superposition_theorem.js', exportName: 'verification_of_superposition_theorem_template', id: 'basic-ee-exp-2' },
        { file: 'verification_of_thevenin_theorem.js', exportName: 'verification_of_thevenin_theorem_template', id: 'basic-ee-exp-3' },
        { file: 'transient_response_rlc.js', exportName: 'transient_response_rlc_template', id: 'basic-ee-exp-4' },
        { file: 'oc_sc_test_single_phase_transformer.js', exportName: 'oc_sc_test_single_phase_transformer_template', id: 'basic-ee-exp-5' },
        { file: 'three_phase_connections.js', exportName: 'three_phase_connections_template', id: 'basic-ee-exp-6' },
        { file: 'transformer_test.js', exportName: 'transformer_test_template', id: 'basic-ee-exp-7' },
    ];

    for (const t of simpleTemplates) {
        try {
            const mod = await import(`file://${path.join(templatesDir, t.file)}`);
            const tpl = mod[t.exportName];
            if (tpl && tpl.components) {
                circuits.push({
                    id: t.id,
                    name: t.id,
                    data: { components: tpl.components, wires: tpl.wires || [] }
                });
            }
        } catch (e) {
            console.warn(`⚠️  Could not load ${t.file}: ${e.message}`);
        }
    }

    // ── Preset-based templates (each preset is a separate circuit) ──
    const presetTemplates = [
        {
            file: 'diode_rectifiers.js', exportName: 'diode_rectifiers_template', id: 'devices_and_circuits-exp3',
        },
        {
            file: 'opamp_arithmetics.js', exportName: 'opamp_arithmetics_template', id: 'devices_and_circuits-exp4',
        },
        {
            file: 'opamp_characteristics.js', exportName: 'opamp_characteristics_template', id: 'devices_and_circuits-exp5',
        },
        {
            file: 'active_filters.js', exportName: 'active_filters_template', id: 'devices_and_circuits-exp6',
        },
        {
            file: 'instrumentation_amplifier.js', exportName: 'instrumentation_amplifier_template', id: 'sensor_lab-instrumentation',
        },
    ];

    for (const t of presetTemplates) {
        try {
            const mod = await import(`file://${path.join(templatesDir, t.file)}`);
            const tpl = mod[t.exportName];
            if (tpl && tpl.presets) {
                for (const preset of tpl.presets) {
                    const circuitData = preset.circuit || preset;
                    if (circuitData.components) {
                        circuits.push({
                            id: `${t.id}--${preset.presetId}`,
                            name: `${t.id}--${preset.presetId}`,
                            data: { components: circuitData.components, wires: circuitData.wires || [] }
                        });
                    }
                }
            }
        } catch (e) {
            console.warn(`⚠️  Could not load ${t.file}: ${e.message}`);
        }
    }

    // ── Sensor Lab simple templates ──
    const sensorTemplates = [
        { file: 'lvdt.js', exportName: 'lvdt_template', id: 'sensor_lab-lvdt' },
        { file: 'strain_gauge.js', exportName: 'strain_gauge_template', id: 'sensor_lab-strain_gauge' },
        { file: 'load_cell.js', exportName: 'load_cell_template', id: 'sensor_lab-load_cell' },
        { file: 'rtd.js', exportName: 'rtd_template', id: 'sensor_lab-rtd' },
        { file: 'thermistor.js', exportName: 'thermistor_template', id: 'sensor_lab-thermistor' },
    ];

    for (const t of sensorTemplates) {
        try {
            const mod = await import(`file://${path.join(templatesDir, t.file)}`);
            const tpl = mod[t.exportName];
            if (tpl && tpl.components) {
                circuits.push({
                    id: t.id,
                    name: t.id,
                    data: { components: tpl.components, wires: tpl.wires || [] }
                });
            }
        } catch (e) {
            console.warn(`⚠️  Could not load ${t.file}: ${e.message}`);
        }
    }

    return circuits;
}

// ────────────────────────────────────────────────────
// Capture a single circuit as PNG
// ────────────────────────────────────────────────────
async function captureCircuit(page, circuitData) {
    // Clear storage via CDP to avoid SecurityError
    const client = await page.createCDPSession();
    await client.send('Storage.clearDataForOrigin', {
        origin: BASE_URL,
        storageTypes: 'local_storage,session_storage',
    });
    await client.detach();

    // Navigate fresh
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for app to be ready
    await page.waitForFunction(() => {
        return window.circuitSimulator && window.circuitSimulator.canvas && window.circuitSimulator.circuit;
    }, { timeout: 10000 });

    // Inject circuit data and render
    await page.evaluate((data) => {
        const cs = window.circuitSimulator;
        cs.circuit.clear();
        cs.circuit.deserialize(data);
        cs.canvas.renderAll();
    }, circuitData);

    // Give the renderer time to paint everything
    await new Promise(r => setTimeout(r, 1500));

    // Generate PNG via the same export logic used in the app
    const pngBase64 = await page.evaluate(() => {
        return new Promise((resolve, reject) => {
            try {
                const canvas = window.circuitSimulator.canvas;
                const circuit = window.circuitSimulator.circuit;

                const componentsLayer = canvas.componentsLayer;
                const wiresLayer = canvas.wiresLayer;
                const componentsBBox = componentsLayer.getBBox();
                const wiresBBox = wiresLayer.getBBox();

                const hasComponents = circuit.getComponentCount() > 0;
                const hasWires = circuit.wires.size > 0;

                if (!hasComponents && !hasWires) {
                    reject('Empty circuit');
                    return;
                }

                let x, y, w, h;
                if (hasComponents && hasWires) {
                    x = Math.min(componentsBBox.x, wiresBBox.x);
                    y = Math.min(componentsBBox.y, wiresBBox.y);
                    w = Math.max(componentsBBox.x + componentsBBox.width, wiresBBox.x + wiresBBox.width) - x;
                    h = Math.max(componentsBBox.y + componentsBBox.height, wiresBBox.y + wiresBBox.height) - y;
                } else if (hasComponents) {
                    ({ x, y, width: w, height: h } = componentsBBox);
                } else {
                    ({ x, y, width: w, height: h } = wiresBBox);
                }

                const padding = 80;
                const exportX = x - padding;
                const exportY = y - padding;
                const exportW = w + padding * 2;
                const exportH = h + padding * 2;
                const exportScale = 2;

                // Clone SVG
                const svgEl = canvas.svg;
                const clone = svgEl.cloneNode(true);
                clone.setAttribute('viewBox', `${exportX} ${exportY} ${exportW} ${exportH}`);
                clone.setAttribute('width', exportW * exportScale);
                clone.setAttribute('height', exportH * exportScale);

                // Remove unwanted elements
                const unwanted = clone.querySelectorAll('.grid-background, #interaction-layer, defs pattern');
                unwanted.forEach(el => el.remove());

                const layers = clone.querySelectorAll('.components-layer, .wires-layer');
                layers.forEach(layer => {
                    layer.style.transform = 'none';
                    layer.removeAttribute('transform');
                });

                // Inject CSS
                const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                style.textContent = `
                    :root {
                        --bg-export: #020617;
                        --stroke-comp: #38bdf8;
                        --fill-comp: rgba(56, 189, 248, 0.15);
                        --stroke-wire: #38bdf8;
                        --glow-wire: rgba(56, 189, 248, 0.3);
                        --text-main: #f8fafc;
                        --text-sub: #94a3b8;
                    }
                    svg { background-color: var(--bg-export); font-family: 'Inter', system-ui, sans-serif; }
                    .component-group { stroke: var(--stroke-comp); fill: none; }
                    .component-group .component-body { fill: var(--fill-comp); stroke: var(--stroke-comp); stroke-width: 2.5; }
                    .wire { fill: none; stroke: var(--stroke-wire); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 1.5px var(--glow-wire)); }
                    .component-group .terminal { display: block; fill: var(--stroke-comp); stroke: none; r: 1.5px !important; }
                    .component-group line, .component-group path:not(.component-body):not(.wire), .component-group circle:not(.terminal) { stroke: var(--stroke-comp); stroke-width: 2; fill: none; }
                    .component-group text, .component-group .component-label { fill: var(--text-main); stroke: none; font-size: 11px; font-weight: 700; text-anchor: middle; }
                    .component-group .component-value { fill: var(--text-sub); stroke: none; font-size: 9px; font-weight: 500; text-anchor: middle; }
                    .component-stroke { stroke: var(--stroke-comp); stroke-width: 2.5; }
                    * { vector-effect: non-scaling-stroke; }
                `;
                clone.appendChild(style);

                const svgData = new XMLSerializer().serializeToString(clone);

                // Render to offscreen canvas
                const offscreen = document.createElement('canvas');
                const ctx = offscreen.getContext('2d');
                offscreen.width = exportW * exportScale;
                offscreen.height = exportH * exportScale;

                const img = new Image();
                img.onload = () => {
                    ctx.fillStyle = '#020617';
                    ctx.fillRect(0, 0, offscreen.width, offscreen.height);
                    ctx.drawImage(img, 0, 0, offscreen.width, offscreen.height);
                    const dataUrl = offscreen.toDataURL('image/png', 1.0);
                    resolve(dataUrl.split(',')[1]);
                };
                img.onerror = () => reject('Image rendering failed');
                img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
            } catch (err) {
                reject(err.message);
            }
        });
    });

    return pngBase64;
}

// ────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────
async function main() {
    console.log('🔌 Batch Circuit Image Export');
    console.log('============================\n');

    // Load all circuits from template files
    console.log('📂 Loading circuit templates...');
    const circuits = await loadAllCircuits();
    console.log(`   Found ${circuits.length} unique circuits\n`);

    if (circuits.length === 0) {
        console.error('❌ No circuits found! Check template files.');
        process.exit(1);
    }

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

    // Launch browser
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 900 });

    let success = 0;
    let failed = 0;

    for (let i = 0; i < circuits.length; i++) {
        const circuit = circuits[i];
        const filename = `${circuit.id}.png`;
        const outputPath = path.join(OUTPUT_DIR, filename);

        console.log(`📸 [${i + 1}/${circuits.length}] ${circuit.name}`);

        try {
            const pngBase64 = await captureCircuit(page, circuit.data);
            const buffer = Buffer.from(pngBase64, 'base64');
            fs.writeFileSync(outputPath, buffer);

            const sizeKB = (buffer.length / 1024).toFixed(1);
            console.log(`   ✅ → ${filename} (${sizeKB} KB)\n`);
            success++;
        } catch (error) {
            console.error(`   ❌ Failed: ${error}\n`);
            failed++;
        }
    }

    await browser.close();

    console.log('============================');
    console.log(`✅ Success: ${success} | ❌ Failed: ${failed} | Total: ${circuits.length}`);
    console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
