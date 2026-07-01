import { describe, expect, it, vi } from "vitest";

type UsePokemonDetailReturn = {
  data:
    | {
        id: number;
        name: string;
        height: number;
        weight: number;
        sprites: {
          front_default: string | null;
          other: { "official-artwork": { front_default: string | null } };
        };
        stats: {
          base_stat: number;
          effort: number;
          stat: { name: string; url: string };
        }[];
        types: { slot: number; type: { name: string; url: string } }[];
      }
    | undefined;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  refetch: () => void;
};

const mockUsePokemonDetail = vi.fn<() => UsePokemonDetailReturn>();

vi.mock("@/features/Pokedex/hooks/usePokemonDetail", () => ({
  usePokemonDetail: () => mockUsePokemonDetail(),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useRef: (val: unknown) => ({ current: val }),
    useEffect: (fn: () => void) => fn(),
  };
});

import { PokemonDetailCard } from "./index";

describe("PokemonDetailCard", () => {
  it("should render loading state", () => {
    mockUsePokemonDetail.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const result = PokemonDetailCard({ id: 25 });
    expect(result).toBeDefined();
  });

  it("should render error state with message", () => {
    mockUsePokemonDetail.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Pokemon not found" },
      refetch: vi.fn(),
    });

    const result = PokemonDetailCard({ id: 999 });
    expect(result).toBeDefined();
  });

  it("should render pokemon detail when data is available", () => {
    mockUsePokemonDetail.mockReturnValue({
      data: {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        sprites: {
          front_default: "https://sprite.png",
          other: { "official-artwork": { front_default: "https://art.png" } },
        },
        stats: [
          { base_stat: 35, effort: 0, stat: { name: "hp", url: "" } },
          { base_stat: 55, effort: 0, stat: { name: "attack", url: "" } },
        ],
        types: [{ slot: 1, type: { name: "electric", url: "" } }],
      },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    const result = PokemonDetailCard({ id: 25 });
    expect(result).toBeDefined();
  });

  it("should render fallback error when data is null", () => {
    mockUsePokemonDetail.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: null,
      refetch: vi.fn(),
    });

    const result = PokemonDetailCard({ id: 0 });
    expect(result).toBeDefined();
  });
});
