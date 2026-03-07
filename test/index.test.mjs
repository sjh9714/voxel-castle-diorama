import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const htmlPath = new URL('../index.html', import.meta.url);

async function readHtml() {
  return readFile(htmlPath, 'utf8');
}

function readNumberLiteral(html, pattern) {
  const match = html.match(pattern);
  assert.ok(match, `Pattern not found: ${pattern}`);
  return Number(match[1]);
}

function readHexLiteral(html, pattern) {
  const match = html.match(pattern);
  assert.ok(match, `Pattern not found: ${pattern}`);
  return Number.parseInt(match[1], 16);
}

function readVector3Literal(html, pattern) {
  const match = html.match(pattern);
  assert.ok(match, `Pattern not found: ${pattern}`);
  return match.slice(1, 4).map(Number);
}

test('ships a self-contained HTML shell with scene controls and loading states', async () => {
  const html = await readHtml();

  assert.match(html, /<!DOCTYPE html>/i);
  assert.match(html, /<div id="loading">/);
  assert.match(html, /<div id="hud">/);
  assert.match(html, /<div id="legend">/);
  assert.match(html, /WASD/i);
  assert.match(html, /Shift/i);
  assert.match(html, /\bR\b/);
  assert.match(html, /<script type="importmap">/);
  assert.match(html, /three@0\.161\.0/);
  assert.match(html, /OrbitControls/);
});

test('starts from the castle front, facing the south gatehouse side', async () => {
  const html = await readHtml();

  const [cameraX, cameraY, cameraZ] = readVector3Literal(
    html,
    /const defaultCameraPosition = new THREE\.Vector3\(([-0-9.]+), ([-0-9.]+), ([-0-9.]+)\)/
  );
  const [, targetY, targetZ] = readVector3Literal(
    html,
    /const defaultTarget = new THREE\.Vector3\(([-0-9.]+), ([-0-9.]+), ([-0-9.]+)\)/
  );

  assert.ok(cameraY > targetY, `expected elevated camera, got y=${cameraY} targetY=${targetY}`);
  assert.ok(cameraZ < targetZ, `expected camera on south/front side, got cameraZ=${cameraZ} targetZ=${targetZ}`);
  assert.ok(cameraX > 0, `expected isometric front-quarter view, got cameraX=${cameraX}`);
});

test('defines procedural voxel builders for the cliffside castle composition', async () => {
  const html = await readHtml();

  assert.match(html, /class VoxelBuilder/);
  assert.match(html, /function buildCliffs/);
  assert.match(html, /function buildCastle/);
  assert.match(html, /function buildBridge/);
  assert.match(html, /function buildFlags/);
  assert.match(html, /function buildTorches/);
  assert.match(html, /function buildScene/);
});

test('does not include human guards or patrol copy anywhere in the diorama', async () => {
  const html = await readHtml();

  assert.doesNotMatch(html, /function createGuard/);
  assert.doesNotMatch(html, /function buildGuardPatrols/);
  assert.doesNotMatch(html, /guardNavy/);
  assert.doesNotMatch(html, /guardRed/);
  assert.doesNotMatch(html, /guardSteel/);
  assert.doesNotMatch(html, /quiet patrols/i);
  assert.doesNotMatch(html, /buildGuardPatrols\(scene, animatables\)/);
});

test('includes renderer, camera, post-processing, and runtime failure guards', async () => {
  const html = await readHtml();

  assert.match(html, /window\.addEventListener\('error'/);
  assert.match(html, /window\.addEventListener\('unhandledrejection'/);
  assert.match(html, /new THREE\.WebGLRenderer/);
  assert.match(html, /new THREE\.PerspectiveCamera/);
  assert.match(html, /new OrbitControls/);
  assert.doesNotMatch(html, /EffectComposer/);
  assert.doesNotMatch(html, /RenderPass/);
  assert.doesNotMatch(html, /SSAOPass/);
  assert.match(html, /renderer\.render\(scene, camera\)/);
  assert.match(html, /window\.addEventListener\('resize'/);
  assert.match(html, /requestAnimationFrame\(animate\)/);
});

test('keeps the dusk lighting profile bright enough to read the castle silhouette', async () => {
  const html = await readHtml();

  const exposure = readNumberLiteral(html, /renderer\.toneMappingExposure = ([0-9.]+)/);
  const fogDensity = readNumberLiteral(html, /scene\.fog = new THREE\.FogExp2\(0x[0-9a-f]+, ([0-9.]+)\)/i);
  const pathColor = readHexLiteral(html, /path: 0x([0-9a-f]+)/i);
  const stoneDarkColor = readHexLiteral(html, /stoneDark: 0x([0-9a-f]+)/i);
  const roofShadowColor = readHexLiteral(html, /roofShadow: 0x([0-9a-f]+)/i);
  const windowGlowColor = readHexLiteral(html, /windowGlow: 0x([0-9a-f]+)/i);
  const windowEmissive = readNumberLiteral(html, /emissiveIntensity: ([0-9.]+),\s*pulseAmplitude:\s*0\.[0-9]+,\s*pulseSpeed:\s*2\.1/);
  const ambientIntensity = readNumberLiteral(html, /new THREE\.AmbientLight\(0x[0-9a-f]+, ([0-9.]+)\)/i);
  const fillIntensity = readNumberLiteral(html, /new THREE\.DirectionalLight\(0x[0-9a-f]+, ([0-9.]+)\);\s*fill\.position/i);
  const warmLiftIntensity = readNumberLiteral(html, /const warmLift = new THREE\.DirectionalLight\(0x[0-9a-f]+, ([0-9.]+)\)/i);
  const rimIntensity = readNumberLiteral(html, /const rimLight = new THREE\.DirectionalLight\(0x[0-9a-f]+, ([0-9.]+)\)/i);
  const torchIntensity = readNumberLiteral(html, /new THREE\.PointLight\(0x[0-9a-f]+, ([0-9.]+), [0-9.]+, [0-9.]+\)/i);
  const torchDistance = readNumberLiteral(html, /new THREE\.PointLight\(0x[0-9a-f]+, [0-9.]+, ([0-9.]+), [0-9.]+\)/i);

  assert.ok(exposure >= 1.3, `expected brighter exposure, got ${exposure}`);
  assert.ok(fogDensity <= 0.0055, `expected less aggressive fog, got ${fogDensity}`);
  assert.ok(pathColor >= 0xb2a093, `expected brighter path color, got 0x${pathColor.toString(16)}`);
  assert.ok(stoneDarkColor >= 0xa0958f, `expected brighter stone shadow color, got 0x${stoneDarkColor.toString(16)}`);
  assert.ok(roofShadowColor >= 0x54485a, `expected brighter roof shadow color, got 0x${roofShadowColor.toString(16)}`);
  assert.ok(windowGlowColor >= 0xe8cb89, `expected brighter window glow color, got 0x${windowGlowColor.toString(16)}`);
  assert.ok(windowEmissive >= 1.15, `expected stronger window emissive, got ${windowEmissive}`);
  assert.ok(ambientIntensity >= 0.72, `expected stronger ambient light, got ${ambientIntensity}`);
  assert.ok(fillIntensity >= 1.0, `expected stronger fill light, got ${fillIntensity}`);
  assert.ok(warmLiftIntensity >= 0.95, `expected warm lift light, got ${warmLiftIntensity}`);
  assert.ok(rimIntensity >= 0.78, `expected rim light, got ${rimIntensity}`);
  assert.ok(torchIntensity >= 1.35, `expected stronger torch light, got ${torchIntensity}`);
  assert.ok(torchDistance >= 19, `expected wider torch light radius, got ${torchDistance}`);
});
