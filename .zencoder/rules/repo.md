---
description: Repository Information Overview
alwaysApply: true
---

# SuperNetos Information

## Summary

SuperNetos is an educational game designed to promote the appreciation of elderly people, encouraging intergenerational respect, empathy, and recognition of elderly rights. The project is developed by UENP (Universidade Estadual do Norte do Paraná) in partnership with FAMEMA (Faculdade de Medicina de Marília).

## Structure

- **src/**: Source code directory containing all application files
  - **estilos/**: CSS stylesheets for the application
  - **scripts/**: JavaScript files with game logic and utilities
  - **paginas/**: HTML pages for different game sections
  - **recursos/**: Multimedia resources (images, audio)
  - **dados/**: Game data and configuration files
  - **ferramentas/**: Tools for content management
- **documentacao/**: Project documentation files
- **index.html**: Main entry point of the application

## Language & Runtime

**Language**: HTML5, CSS3, JavaScript ES6+
**Build System**: None (static files)
**Package Manager**: None (vanilla JavaScript project)

## Dependencies

This project is built with vanilla JavaScript and has no external dependencies. It relies on:

**Browser APIs**:

- LocalStorage API for game progress persistence
- Audio API for sound management
- Fullscreen API for display options

## Build & Installation

The project is a static web application that doesn't require a build process. To run it:

```bash
# Simply open index.html in a browser
# Or serve with any static file server
python -m http.server
# Or
npx serve
```

## Main Components

### Audio System

- **File**: `src/scripts/audio-manager.js`
- **Features**: Background music management, volume control, state persistence

### Game Progress

- **File**: `src/scripts/globals.js` (ProgressoJogo object)
- **Features**: Player progress tracking, localStorage persistence, character selection

### Global Utilities

- **File**: `src/scripts/globals.js`
- **Features**: Navigation, UI management, device detection, fullscreen control

### Question Management

- **File**: `src/dados/perguntas-config.json`
- **Features**: Game questions configuration
- **Editor**: `src/ferramentas/editor-perguntas.html`

### User Interface

- **Files**: `src/estilos/global.css`, `src/estilos/pagina-inicial.css`
- **Features**: Responsive design, orientation detection, modal system

## Project Configuration

**File**: `projeto-config.json`
**Version**: 2.0.0
**Game Configuration**:

- Maximum Questions: 25
- Supported Languages: pt-BR
- Target Devices: desktop, tablet, mobile
- Recommended Screen Ratio: 16:9

## Technical Features

- Modular JavaScript with object-oriented approach
- CSS custom properties for consistent styling
- Responsive design with breakpoints for different devices
- Orientation detection for mobile devices
- Local storage for game progress persistence
- Audio management with volume control
