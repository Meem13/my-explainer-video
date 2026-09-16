import React from "react";
import {
  AbsoluteFill,
    Img,
      staticFile,
        useCurrentFrame,
          useVideoConfig,
          } from "remotion";
          import type {
            Animation,
              Position,
           
                } from "../lib/types";
                import { getAnimationStyle } from "../lib/animations";
                import { getImagePath } from "../lib/utils";
                import { FPS } from "../lib/constants";

                type AnimatedVisualProps = {
                  imageUrl: string;
                    position: Position;
                      project: string;
                        enterAnimation?: Animation;
                          exitAnimation?: Animation;
                            animations?: Animation[];
                            };

                            export const AnimatedVisual: React.FC<AnimatedVisualProps> = ({
                              imageUrl,
                                position,
                                  project,
                                    enterAnimation,
                                      exitAnimation,
                                        animations = [],
                                        }) => {
                                          const frame = useCurrentFrame();
                                            const { width, height } = useVideoConfig();

                                              const localMs = (frame / FPS) * 1000;

                                                const activeAnimations = [
                                                    enterAnimation,
                                                        ...animations,
                                                            exitAnimation,
                                                              ].filter(Boolean) as Animation[];

                                                                let visualStyle = {
                                                                    opacity: 1,
                                                                        transform: "translate(0px, 0px) scale(1) rotate(0deg)",
                                                                            filter: "blur(0px)",
                                                                              };

                                                                                for (const animation of activeAnimations) {
                                                                                    const animationStyle = getAnimationStyle(animation, localMs);

                                                                                        visualStyle = {
                                                                                              opacity: visualStyle.opacity * animationStyle.opacity,
                                                                                                    transform: `${visualStyle.transform} ${animationStyle.transform}`,
                                                                                                          filter: animationStyle.filter,
                                                                                                              };
                                                                                                                }

                                                                                                                  const x = (position.x / 100) * width;
                                                                                                                    const y = (position.y / 100) * height;

                                                                                                                      const visualWidth = position.width
                                                                                                                          ? (position.width / 100) * width
                                                                                                                              : width;

                                                                                                                                const visualHeight = position.height
                                                                                                                                    ? (position.height / 100) * height
                                                                                                                                        : undefined;

                                                                                                                                          const rotation = position.rotation ?? 0;

                                                                                                                                            return (
                                                                                                                                                <AbsoluteFill
                                                                                                                                                      style={{
                                                                                                                                                              pointerEvents: "none",
                                                                                                                                                                      overflow: "visible",
                                                                                                                                                                            }}
                                                                                                                                                                                >
                                                                                                                                                                                      <Img
                                                                                                                                                                                              src={staticFile(getImagePath(project, imageUrl))}
                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                position: "absolute",
                                                                                                                                                                                                                          left: x,
                                                                                                                                                                                                                                    top: y,
                                                                                                                                                                                                                                              width: visualWidth,
                                                                                                                                                                                                                                                        height: visualHeight,
                                                                                                                                                                                                                                                                  objectFit: "contain",
                                                                                                                                                                                                                                                                            opacity: visualStyle.opacity,
                                                                                                                                                                                                                                                                                      filter: visualStyle.filter,
                                                                                                                                                                                                                                                                                                transform: `${visualStyle.transform} rotate(${rotation}deg)`,
                                                                                                                                                                                                                                                                                                          transformOrigin: "center center",
                                                                                                                                                                                                                                                                                                                  }}
                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                            </AbsoluteFill>
                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                              };

                                                                                                                                                                                                                                                                                                                              export default AnimatedVisual;