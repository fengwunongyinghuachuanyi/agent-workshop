# UI references and notices

## BoardUI

Agent Workshop adapts the visual treatment of BoardUI's free design system: floating sidebar elevation, inset neutral surfaces, blue same-hue button fills, contact shadows and selected controls. The React behavior continues to use this project's Base UI and assistant-ui components; BoardUI Pro templates and components are not included.

Sources: https://www.boardui.com/zh-hans and https://github.com/BoardUI/boardui (styles/theme.css and free component examples), reviewed 2026-11-06.

MIT License

Copyright (c) 2026 Mertcan Dundar Esmergul (BoardUI)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## unslop

UI audit and craft workflow: unslop by Damir Sokolovsky (@heydamir), https://github.com/heydamir/unslop, CC BY 4.0. Skill installed separately; no skill scripts are part of the application.


## BeUI reference and original Workshop icons

The action-triggered arrow, download and settings feedback was visually informed by https://beui.dev/ and its free Animated CTA Buttons preview (reviewed 2026-11-06). No BeUI source, assets, brand marks or Pro components were copied. The SVG drawings in `web/src/components/workshop-icons.tsx` are original Agent Workshop assets and use the project's MIT license. They share a 24px coordinate grid, 1.7px rounded outlines and a subtle current-color interior fill. The surrounding buttons/links provide accessible labels; decorative SVGs are hidden from assistive technology by default.


## Editorial workspace reference

The current workspace follows the user's later direction at https://career-interview-theta.vercel.app/: generous typography, quiet grid, white paper, fine rules and restrained monochrome navigation. The user explicitly removed the green accent. Layout and application CSS are original; no reference branding, course content, images or scripts were copied. Chat behavior remains implemented by the existing assistant-ui primitives. Earlier BoardUI adaptation styles remain the base, with `web/src/workspace.css` applying the current direction.
