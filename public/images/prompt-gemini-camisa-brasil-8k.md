# 📸 Prompt — Image Enhancement Ultra Realista 8K
## Camisa Oficial Brasil Copa do Mundo 2026 · Nike

> **Destino:** Gemini Nano / Imagen 3 / qualquer modelo de image-to-image  
> **Tipo:** Image Enhancement + Upscale + Photorealism  
> **Input:** Foto produto da camisa amarela Brasil 2026 (fundo branco, ângulo 3/4)

---

## 🎯 Objetivo

Transformar a imagem de produto da **Camisa Oficial Titular da Seleção Brasileira para a Copa do Mundo 2026 (Nike)** em uma fotografia de **nível editorial profissional 8K ultra-realista**, mantendo total fidelidade ao produto original, com qualidade de campanha publicitária Nike/Adidas de alto padrão.

---

## ✅ Prompt Principal (Cole diretamente no Gemini)

```
Ultra-realistic 8K professional product photography of the official Brazil 2026 FIFA World Cup Nike home jersey. 

Enhance the existing image to achieve:

PHOTOREALISM:
- Hyper-detailed fabric texture showing the micro-mesh weave of Nike Dri-FIT / Aero-FIT technology, individual thread structure visible
- Realistic fabric weight and drape — slight natural wrinkles where the jersey folds at the shoulders and sides, as if worn on a mannequin or floating in studio
- Specular highlights on the smooth polyester surface catching studio light from upper-left key light
- Subsurface light scattering through the thin athletic fabric showing subtle translucency on edges

COLORS (preserve exactly):
- Body: warm canary yellow (#F5E642), vibrant and saturated, NOT washed out
- Collar and cuffs: deep teal-green (#00796B), clean V-neck cut
- Side panels: bright emerald green accent stripe (#00A86B)
- Nike Swoosh: deep teal-green, left chest
- CBF crest: fully detailed with blue shield, gold stars (5 stars), white cross-star emblem, "BRASIL" text in dark green
- Nike logo details sharp and crisp

DETAILS TO SHARPEN:
- All 5 gold/dark stars above the CBF crest individually detailed
- CBF shield embroidery with visible stitch texture and raised thread effect
- "BRASIL" wordmark under the shield, clean sans-serif, dark teal
- Small Nike tag/label at bottom right hem
- Collar ribbing texture clearly defined
- Sleeve hem double-stitching visible

LIGHTING SETUP (studio product photography):
- Primary: soft box key light, upper-left at 45° angle
- Fill: large white reflector from right, ratio 2:1
- Rim light: subtle cool backlight to separate jersey from background
- No harsh shadows — soft graduated shadow under the jersey

BACKGROUND:
- Pure clean white (#FFFFFF) studio background
- Soft, barely-visible drop shadow below the jersey for grounding
- No gradient, no texture on background

CAMERA & LENS SIMULATION:
- Medium format sensor quality (Hasselblad H6D-400C equivalent)
- 80mm macro-capable lens, f/8 aperture for full jersey sharpness
- No depth of field blur — entire jersey in perfect sharp focus
- Ultra high resolution: 8K (7680×4320px), 300 DPI print-ready
- Zero noise, zero compression artifacts

PRESENTATION ANGLE:
- Maintain original 3/4 front angle (slight right-facing rotation ~20°)
- Jersey slightly tilted/floating — ghost mannequin effect (invisible mannequin inside giving shape)
- Natural torso shape preserved — chest, shoulders, waist silhouette

QUALITY MARKERS:
- Photorealistic, not illustrated or CGI-rendered
- Editorial quality matching Nike.com official product photography
- No AI artifacts, no distortion on text or logos
- Fabric pores and micro-texture visible at 100% zoom
- Professional retouching: no dust spots, perfectly clean product

Style reference: Nike official product photography, Copa do Mundo official kit reveal imagery, 
high-end sportswear e-commerce photography.
```

---

## 🔧 Parâmetros Técnicos Adicionais

Se o modelo aceitar parâmetros separados, use:

```yaml
task: image_enhancement
mode: image-to-image
style: photorealistic
quality: ultra_high
resolution: 8K
guidance_scale: 12
denoising_strength: 0.35       # Preserva estrutura original, melhora textura
upscale_factor: 4x
sharpening: high
preserve_original: true         # Não alterar cores ou formato
negative_prompt: >
  illustration, cartoon, CGI render, 3D model, painting, drawing,
  blurry, low resolution, compression artifacts, watermark, text overlay,
  changed colors, different jersey, wrong crest, distorted logos,
  overexposed, underexposed, washed out yellow, wrong shade of green,
  noise, grain, pixelated, AI artifacts, face visible, person visible
```

---

## 🚫 Negative Prompt (Para modelos que suportam)

```
illustration, cartoon, CGI, 3D render, anime, painting, sketch,
blurry, out of focus, low quality, jpeg artifacts, pixelated,
watermark, signature, text, altered colors, red jersey, blue jersey,
wrong badge, different brand, distorted swoosh, warped text,
dark background, colored background, person wearing it, model,
overexposed, blown highlights, flat lighting, no texture,
different design, wrong year, 2022 jersey, old design
```

---

## 📐 Especificações de Output

| Parâmetro | Valor |
|---|---|
| **Resolução** | 7680 × 4320 px (8K) ou mínimo 4K (3840×2160) |
| **DPI** | 300 (print-ready) |
| **Formato** | PNG (sem compressão) ou TIFF |
| **Perfil de cor** | sRGB ou Adobe RGB |
| **Fundo** | Branco puro `#FFFFFF` |
| **Ângulo** | 3/4 frontal (preservar original) |

---

## 💡 Dicas de Uso no Gemini

1. **Gemini 2.0 Flash / Imagen 3:** Cole o bloco do "Prompt Principal" diretamente no chat junto com a imagem anexada
2. **Se usar API Imagen 3:** Use `mode: EDIT` com `editConfig: UPSCALE` + o prompt acima como `prompt` field
3. **Iteração:** Se o primeiro resultado não satisfizer, adicione ao final do prompt: *"Increase fabric texture detail 30%, sharpen CBF crest embroidery, ensure canary yellow is vibrant not pale"*
4. **Para uso no ComfyUI/Stable Diffusion:** Use como `positive prompt` com ControlNet `tile` habilitado para preservar estrutura + Real-ESRGAN para upscale final

---

## 🔄 Prompt Alternativo — Versão Curta (Para modelos com limite de tokens)

```
Professional 8K product photography of Brazil 2026 FIFA World Cup Nike home jersey. 
Canary yellow fabric with teal-green collar, cuffs and side panels. 
CBF crest with 5 stars. Ghost mannequin presentation. 
Pure white studio background, soft box lighting. 
Ultra-sharp micro-mesh fabric texture. Photorealistic, editorial quality. 
Maintain original 3/4 angle and exact colors. No blur, no noise.
```

---

> ✅ **Resultado esperado:** Imagem com qualidade de campanha oficial Nike — idêntica às fotos de lançamento do uniforme publicadas no site nike.com.br e no perfil oficial da CBF, com textura de tecido hiper-detalhada e cores vibrantes fiéis ao produto original.
