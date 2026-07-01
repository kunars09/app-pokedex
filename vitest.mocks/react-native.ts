import { vi } from "vitest";

type MockProps = Record<string, unknown>;

export const View = (props: MockProps) => ({
  type: "View",
  props,
});
export const Text = (props: MockProps) => ({
  type: "Text",
  props,
});
export const TextInput = (props: MockProps) => ({ type: "TextInput", props });
export const Pressable = (props: MockProps) => {
  const { style, ...rest } = props;
  const resolvedStyle =
    typeof style === "function" ? style({ pressed: false }) : style;
  return {
    type: "Pressable",
    props: { ...rest, style: resolvedStyle },
  };
};
export const Image = (props: MockProps) => ({ type: "Image", props });
export const ScrollView = (props: MockProps) => ({
  type: "ScrollView",
  props,
});
export const FlatList = (props: MockProps) => ({ type: "FlatList", props });
export const ActivityIndicator = (props: MockProps) => ({
  type: "ActivityIndicator",
  props,
});
export const Animated = {
  View,
  Text,
  Value: class AnimatedValue {
    private val: number;
    constructor(val: number) {
      this.val = val;
    }
    interpolate() {
      return this.val;
    }
  },
  timing: vi
    .fn()
    .mockReturnValue({ start: vi.fn((cb?: () => void) => cb?.()) }),
  spring: vi
    .fn()
    .mockReturnValue({ start: vi.fn((cb?: () => void) => cb?.()) }),
  stagger: vi.fn().mockImplementation(() => ({
    start: vi.fn((cb?: () => void) => cb?.()),
  })),
  sequence: vi.fn().mockImplementation(() => ({
    start: vi.fn((cb?: () => void) => cb?.()),
  })),
  parallel: vi.fn().mockImplementation(() => ({
    start: vi.fn((cb?: () => void) => cb?.()),
  })),
  delay: vi.fn().mockReturnValue({ start: vi.fn((cb?: () => void) => cb?.()) }),
};
export const Easing = {
  out: vi.fn().mockReturnValue(vi.fn()),
  cubic: vi.fn(),
};
export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T): T => styles,
  absoluteFillObject: {},
  flatten: (style: unknown) => style,
};
export const Platform = {
  OS: "ios",
  select: (obj: Record<string, unknown>) =>
    (obj.ios as unknown) ?? (obj.default as unknown),
};
