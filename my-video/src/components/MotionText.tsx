import React from "react";
import {
  AbsoluteFill,
    useCurrentFrame,
      useVideoConfig,
      } from "remotion";
      import type { Animation, MotionTextElement } from "../lib/types";
      import { getAnimationStyle } from "../lib/animations";
      import { FPS } from "../lib/constants";

      export const MotionText: React.FC<{
        item: MotionTextElement;
        }> = ({ item }) => {
          const frame = useCurrentFrame();
            const { width, height } = useVideoConfig();

              const localMs = (frame / FPS) * 1000;

                const animations = [
                    item.enterAnimation,
                        ...(item.animations ?? []),
                            item.exitAnimation,
                              ].filter(Boolean) as Animation[];

                                let opacity = item.position.opacity ?? 1;
                                  let transform = "translate(0px, 0px) scale(1) rotate(0deg)";
                                    let filter = "blur(0px)";

                                      for (const animation of animations) {
                                          const style = getAnimationStyle(animation, localMs);

                                              opacity *= style.opacity;
                                                  transform = `${transform} ${style.transform}`;
                                                      filter = style.filter;
                                                        }

                                                          const x = (item.position.x / 100) * width;
                                                            const y = (item.position.y / 100) * height;

                                                              const textWidth = item.position.width
                                                                  ? (item.position.width / 100) * width
                                                                      : width * 0.8;

                                                                        const fontSize = item.fontSize ?? 72;
                                                                          const fontWeight = item.fontWeight ?? 700;
                                                                            const color = item.color ?? "white";

                                                                              return (
                                                                                  <AbsoluteFill
                                                                                        style={{
                                                                                                pointerEvents: "none",
                                                                                                      }}
                                                                                                          >
                                                                                                                <div
                                                                                                                        style={{
                                                                                                                                  position: "absolute",
                                                                                                                                            left: x,
                                                                                                                                                      top: y,
                                                                                                                                                                width: textWidth,
                                                                                                                                                                          transform,
                                                                                                                                                                                    opacity,
                                                                                                                                                                                              filter,
                                                                                                                                                                                                        fontSize,
                                                                                                                                                                                                                  fontWeight,
                                                                                                                                                                                                                            color,
                                                                                                                                                                                                                                      textAlign: "center",
                                                                                                                                                                                                                                                lineHeight: 1.05,
                                                                                                                                                                                                                                                          fontFamily: "Arial, sans-serif",
                                                                                                                                                                                                                                                                    letterSpacing: "-1px",
                                                                                                                                                                                                                                                                              textShadow: "0 4px 16px rgba(0,0,0,0.25)",
                                                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                    {item.backgroundColor ? (
                                                                                                                                                                                                                                                                                                              <span
                                                                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                                                                                        display: "inline-block",
                                                                                                                                                                                                                                                                                                                                                      backgroundColor: item.backgroundColor,
                                                                                                                                                                                                                                                                                                                                                                    padding: "12px 22px",
                                                                                                                                                                                                                                                                                                                                                                                  borderRadius: 18,
                                                                                                                                                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                                                                                                                                                                        >
                                                                                                                                                                                                                                                                                                                                                                                                                    {item.text}
                                                                                                                                                                                                                                                                                                                                                                                                                              </span>
                                                                                                                                                                                                                                                                                                                                                                                                                                      ) : (
                                                                                                                                                                                                                                                                                                                                                                                                                                                item.text
                                                                                                                                                                                                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                  </AbsoluteFill>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                    export default MotionText;