import { describe, expect, it, vi } from "vitest";

type UsePokemonListReturn = {
  data: { pages: { results: { name: string; url: string }[] }[] } | undefined;
  isLoading: boolean;
  isError: boolean;
  error: { message: string } | null;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  refetch: () => void;
};

const mockUsePokemonList = vi.fn<() => UsePokemonListReturn>();

vi.mock("@/features/Pokedex/hooks/usePokemonList", () => ({
  usePokemonList: () => mockUsePokemonList(),
}));

vi.mock("@/api/toolbox/utils", () => ({
  getPokemonIdFromUrl: (url: string) => {
    const segments = url.split("/").filter(Boolean);
    return Number(segments[segments.length - 1]);
  },
}));

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useCallback: (fn: unknown) => fn,
  };
});

import { PokemonList } from "./index";

describe("PokemonList", () => {
  it("should render loading state", () => {
    mockUsePokemonList.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    });

    const result = PokemonList({ onPokemonPress: vi.fn() });
    expect(result).toBeDefined();
  });

  it("should render error state", () => {
    mockUsePokemonList.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Network error" },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    });

    const result = PokemonList({ onPokemonPress: vi.fn() });
    expect(result).toBeDefined();
  });

  it("should render list when data is available", () => {
    mockUsePokemonList.mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
              { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    });

    const result = PokemonList({ onPokemonPress: vi.fn() });
    expect(result.props.data).toHaveLength(2);
  });

  it("should flatten multiple pages into a single list", () => {
    mockUsePokemonList.mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            ],
          },
          {
            results: [
              { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
            ],
          },
        ],
      },
      isLoading: false,
      isError: false,
      error: null,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      refetch: vi.fn(),
    });

    const result = PokemonList({ onPokemonPress: vi.fn() });
    expect(result.props.data).toHaveLength(2);
  });
});
