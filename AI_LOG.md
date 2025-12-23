# Cómo usé IA en este proyecto

## Metodología

1. **PRD primero**: Escribí toda la arquitectura antes de generar código
2. **Trabajo por fases**: Estructura → Dominio → Use Cases → Infraestructura → Presentación → Testing
3. **Validación constante**: Compilé y revisé cada archivo generado

## División del trabajo

- **Arquitectura y decisiones**: 100% yo (Clean Architecture, JSON storage, validaciones)
- **Código estructural**: 70% Claude (configs, interfaces, boilerplate)
- **Lógica de negocio**: 70% yo (flujos, validaciones, casos edge)

## Errores corregidos

- JWT type errors en TypeScript strict mode
- Parámetros no usados (`_req`, `_res`)
- ValidationError class faltante

## Resultado

Claude aceleró la implementación ~3 horas. Invertí ese tiempo en mejor arquitectura y testing manual exhaustivo.

---
Juan Carlos Benavides - Diciembre 2025