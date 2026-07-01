import { describe, expect, it } from "vitest";

import { stepOneSchema, stepTwoSchema } from "../schemas";

describe("stepOneSchema", () => {
  it("should validate correct data", async () => {
    const data = { fullName: "Ash Ketchum", age: 10, email: "ash@pokemon.com" };
    const result = await stepOneSchema.validate(data);
    expect(result).toEqual(data);
  });

  it("should reject empty fullName", async () => {
    const data = { fullName: "", age: 10, email: "ash@pokemon.com" };
    await expect(stepOneSchema.validate(data)).rejects.toThrow(
      "El nombre es obligatorio",
    );
  });

  it("should reject fullName shorter than 3 characters", async () => {
    const data = { fullName: "As", age: 10, email: "ash@pokemon.com" };
    await expect(stepOneSchema.validate(data)).rejects.toThrow(
      "El nombre debe tener al menos 3 caracteres",
    );
  });

  it("should reject age below 10", async () => {
    const data = { fullName: "Ash Ketchum", age: 5, email: "ash@pokemon.com" };
    await expect(stepOneSchema.validate(data)).rejects.toThrow(
      "Debes tener al menos 10 años",
    );
  });

  it("should reject invalid email format", async () => {
    const data = { fullName: "Ash Ketchum", age: 10, email: "not-email" };
    await expect(stepOneSchema.validate(data)).rejects.toThrow(
      "Ingresa un email válido",
    );
  });

  it("should reject empty email", async () => {
    const data = { fullName: "Ash Ketchum", age: 10, email: "" };
    await expect(stepOneSchema.validate(data)).rejects.toThrow(
      "El email es obligatorio",
    );
  });
});

describe("stepTwoSchema", () => {
  it("should validate correct data", async () => {
    const data = { region: "Kanto", favoritePokemonType: "fire" };
    const result = await stepTwoSchema.validate(data);
    expect(result).toEqual(data);
  });

  it("should reject empty region", async () => {
    const data = { region: "", favoritePokemonType: "fire" };
    await expect(stepTwoSchema.validate(data)).rejects.toThrow(
      "Selecciona un distrito de origen",
    );
  });

  it("should reject empty favoritePokemonType", async () => {
    const data = { region: "Kanto", favoritePokemonType: "" };
    await expect(stepTwoSchema.validate(data)).rejects.toThrow(
      "Selecciona un tipo de Pokémon favorito",
    );
  });
});
