# Pokédex App

Aplicación móvil de Pokédex con registro de entrenador, construida con React Native y Expo SDK 56.

## Descripción

Una Pokédex interactiva que permite:

- Explorar una lista paginada de Pokémon con scroll infinito
- Ver el detalle de cada Pokémon (stats, tipos, peso, altura)
- Registrar un perfil de entrenador mediante un formulario wizard multi-paso
- Persistir datos del entrenador localmente

## Stack Tecnológico

| Categoría        | Tecnología                       |
| ---------------- | -------------------------------- |
| Framework        | Expo SDK 56                      |
| Lenguaje         | TypeScript 6 (strict)            |
| Navegación       | expo-router (file-based routing) |
| Data Fetching    | TanStack React Query             |
| Estado Global    | Zustand + AsyncStorage           |
| Formularios      | react-hook-form + yup            |
| Linter/Formatter | Biome                            |
| Package Manager  | pnpm                             |

## Requisitos Previos

- Node.js >= 24
- pnpm >= 11
- iOS Simulator (macOS) o Android Emulator
- [Expo Go](https://expo.dev/go) (opcional, para dispositivo físico)

## Instalación

```bash
pnpm install
```

## Scripts

| Comando              | Descripción                              |
| -------------------- | ---------------------------------------- |
| `pnpm start`         | Inicia el servidor de desarrollo de Expo |
| `pnpm ios`           | Inicia en iOS Simulator                  |
| `pnpm android`       | Inicia en Android Emulator               |
| `pnpm web`           | Inicia en navegador web                  |
| `pnpm check`         | Ejecuta Biome check con auto-fix         |
| `pnpm lint`          | Ejecuta Biome format con auto-fix        |
| `pnpm test`          | Ejecuta tests en modo watch              |
| `pnpm test:coverage` | Ejecuta tests con reporte de cobertura   |

## Estructura del Proyecto

```
src/
├── api/                        # Capa de datos
│   ├── interfaces/             # Tipos de respuesta de la API
│   ├── services/               # Service hooks (usePokemonService)
│   ├── toolbox/                # Constantes y helpers de API
│   │   ├── constants/          # Endpoints, límites
│   │   └── utils/              # Helpers (getImageUrl, getId)
│   └── query-client.ts         # Configuración de React Query
├── app/                        # Rutas (file-based routing)
│   ├── (tabs)/
│   │   ├── (pokedex)/          # Tab 1: Lista + Detalle
│   │   └── (trainer)/          # Tab 2: Perfil + Wizard
│   ├── _layout.tsx             # Root layout (providers)
│   └── index.tsx               # Redirect inicial
├── components/                 # Atomic Design (reutilizables)
│   ├── atoms/                  # Button, Input, Loading
│   ├── molecules/              # PokemonCard, StatBar, TypeBadge
│   ├── organisms/              # SplashScreen
│   └── templates/              # ScreenTemplate
├── features/                   # Feature-based (no reutilizables)
│   ├── Pokedex/
│   │   ├── components/         # PokemonList, PokemonDetailCard
│   │   └── hooks/              # usePokemonList, usePokemonDetail
│   └── Trainer/
│       ├── components/         # TrainerCard
│       ├── constants/          # Opciones de formulario
│       └── utils/              # Schemas de validación
├── store/                      # Zustand stores
│   └── trainerStore.ts
├── styles/                     # Design tokens
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
└── toolbox/                    # Tipos y enums globales
    ├── enums/
    └── interfaces/
```

## API

Consume la [PokéAPI](https://pokeapi.co/api/v2/):

- `GET /pokemon?limit=20&offset={n}` — Lista paginada
- `GET /pokemon/{id}` — Detalle de un Pokémon

## Testing

Unit tests con **Vitest** + mock de React Native primitives.

```bash
pnpm test:run        # ejecución única
pnpm test:coverage   # con reporte de cobertura
```
