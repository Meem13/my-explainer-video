import React from "react";
import {
  AbsoluteFill,
    useCurrentFrame,
      useVideoConfig,
      } from "remotion";
      import type {
        Animation,
         
            ShapeElement,
            } from "../lib/types";
            import { getAnimationStyle } from "../lib/animations";
            import { FPS } from "../lib/constants";

            type AnimatedShapeProps = {
              shape: ShapeElement;
              };

              export const AnimatedShape: React.FC<AnimatedShapeProps> = ({
                shape,
                }) => {
                  const frame = useCurrentFrame();
                    const { width, height } = useVideoConfig();

                      const localMs = (frame / FPS) * 1000;

                        const animations = [
                            shape.enterAnimation,
                                ...(shape.animations ?? []),
                                    shape.exitAnimation,
                                      ].filter(Boolean) as Animation[];

                                        let opacity = shape.position.opacity ?? 1;
                                          let transform = "translate(0px, 0px) scale(1) rotate(0deg)";
                                            let filter = "blur(0px)";

                                              for (const animation of animations) {
                                                  const style = getAnimationStyle(animation, localMs);

                                                      opacity *= style.opacity;
                                                          transform = `${transform} ${style.transform}`;
                                                              filter = style.filter;
                                                                }

                                                                  const position = shape.position;

                                                                    const x = (position.x / 100) * width;
                                                                      const y = (position.y / 100) * height;

                                                                        const shapeWidth =
                                                                            ((position.width ?? 20) / 100) * width;

                                                                              const shapeHeight =
                                                                                  ((position.height ?? 10) / 100) * height;

                                                                                    const borderRadius =
                                                                                        shape.shape === "circle"
                                                                                              ? "50%"
                                                                                                    : shape.shape === "pill"
                                                                                                            ? "999px"
                                                                                                                    : "24px";

                                                                                                                      const fill = shape.fill ?? "rgba(255,255,255,0.9)";
                                                                                                                        const stroke = shape.stroke ?? "transparent";
                                                                                                                          const strokeWidth = shape.strokeWidth ?? 0;

                                                                                                                            return (
                                                                                                                                <AbsoluteFill
                                                                                                                                      style={{
                                                                                                                                              pointerEvents: "none",
                                                                                                                                                      overflow: "visible",
                                                                                                                                                            }}
                                                                                                                                                                >
                                                                                                                                                                      <div
                                                                                                                                                                              style={{
                                                                                                                                                                                        position: "absolute",
                                                                                                                                                                                                  left: x,
                                                                                                                                                                                                            top: y,
                                                                                                                                                                                                                      width: shapeWidth,
                                                                                                                                                                                                                                height: shapeHeight,
                                                                                                                                                                                                                                          backgroundColor:
                                                                                                                                                                                                                                                      shape.shape === "line" || shape.shape === "arrow"
                                                                                                                                                                                                                                                                    ? "transparent"
                                                                                                                                                                                                                                                                                  : fill,
                                                                                                                                                                                                                                                                                            border:
                                                                                                                                                                                                                                                                                                        strokeWidth > 0
                                                                                                                                                                                                                                                                                                                      ? `${strokeWidth}px solid ${stroke}`
                                                                                                                                                                                                                                                                                                                                    : undefined,
                                                                                                                                                                                                                                                                                                                                              borderRadius,
                                                                                                                                                                                                                                                                                                                                                        opacity,
                                                                                                                                                                                                                                                                                                                                                                  filter,
                                                                                                                                                                                                                                                                                                                                                                            transform,
                                                                                                                                                                                                                                                                                                                                                                                      transformOrigin: "center center",
                                                                                                                                                                                                                                                                                                                                                                                              }}
                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                            {shape.shape === "arrow" && (
                                                                                                                                                                                                                                                                                                                                                                                                                      <div
                                                                                                                                                                                                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                                                                                                                                                                                                                position: "absolute",
                                                                                                                                                                                                                                                                                                                                                                                                                                                              right: -shapeHeight * 0.45,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            top: shapeHeight * 0.2,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          width: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        height: 0,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      borderTop: `${shapeHeight * 0.3}px solid transparent`,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    borderBottom: `${shapeHeight * 0.3}px solid transparent`,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  borderLeft: `${shapeHeight * 0.45}px solid ${
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  stroke !== "transparent" ? stroke : fill
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }`,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </AbsoluteFill>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          };

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          export default AnimatedShape;