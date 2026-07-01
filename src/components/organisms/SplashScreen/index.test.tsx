import { describe, expect, it, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useRef: (val: unknown) => ({ current: val }),
    useEffect: (fn: () => void) => fn(),
  };
});

import { SplashScreen } from "./index";

describe("SplashScreen", () => {
  it("should render without crashing", () => {
    const onFinish = vi.fn();
    const result = SplashScreen({ onFinish });
    expect(result).toBeDefined();
  });

  it("should call onFinish after animation completes", () => {
    const onFinish = vi.fn();
    SplashScreen({ onFinish });
    expect(onFinish).toHaveBeenCalled();
  });

  it("should render pokeball structure", () => {
    const onFinish = vi.fn();
    const result = SplashScreen({ onFinish });
    expect(result.props.children).toBeDefined();
  });

  it("should render title text", () => {
    const onFinish = vi.fn();
    const result = SplashScreen({ onFinish });
    const title = result.props.children[1];
    expect(title.props.children).toBe("Pokédex");
  });
});
