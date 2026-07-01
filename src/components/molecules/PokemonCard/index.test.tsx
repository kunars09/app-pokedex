import { describe, expect, it, vi } from "vitest";

vi.mock("@/api/toolbox/utils", () => ({
  getPokemonImageUrl: (id: number) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
}));

import { PokemonCard } from "./index";

describe("PokemonCard", () => {
  it("should render pokemon name", () => {
    const result = PokemonCard({ id: 25, name: "pikachu", onPress: vi.fn() });
    const info = result.props.children[1];
    const nameText = info.props.children[1];
    expect(nameText.props.children).toBe("pikachu");
  });

  it("should render formatted pokemon id", () => {
    const result = PokemonCard({ id: 1, name: "bulbasaur", onPress: vi.fn() });
    const info = result.props.children[1];
    const idText = info.props.children[0];
    expect(idText.props.children).toEqual(["#", "001"]);
  });

  it("should pass onPress handler to Pressable", () => {
    const onPress = vi.fn();
    const result = PokemonCard({ id: 25, name: "pikachu", onPress });
    expect(result.props.onPress).toBe(onPress);
  });

  it("should render image with correct source", () => {
    const result = PokemonCard({ id: 25, name: "pikachu", onPress: vi.fn() });
    const image = result.props.children[0];
    expect(image.props.source.uri).toContain("/25.png");
  });
});
