import React from "react";
import { AbsoluteFill } from "remotion";
import type { Scene as SceneType } from "../lib/types";
import { AnimatedVisual } from "./AnimatedVisual";
import { AnimatedShape } from "./AnimatedShape";
import { MotionText } from "./MotionText";
import { Background } from "./Background";

export const Scene: React.FC<{
  scene: SceneType;
    project: string;
    }> = ({ scene, project }) => {
      return (
          <AbsoluteFill
                style={{
                        overflow: "hidden",
                              }}
                                  >
                                          {/* Background */}
                                                {scene.background && (
                                                        <Background
                                                                  project={project}
                                                                            item={scene.background}
                                                                                    />
                                                                                          )}
                                        {/* Characters */}
                                              {scene.characters?.map((character, index) => (
                                                      <AnimatedVisual
                                                                key={`character-${index}`}
                                                                          imageUrl={character.imageUrl}
                                                                                    position={character.position}
                                                                                              project={project}
                                                                                                        enterAnimation={character.enterAnimation}
                                                                                                                  exitAnimation={character.exitAnimation}
                                                                                                                            animations={character.animations}
                                                                                                                                    />
                                                                                                                                          ))}

                                                                                                                                                {/* Objects */}
                                                                                                                                                      {scene.objects?.map((object, index) => (
                                                                                                                                                              <AnimatedVisual
                                                                                                                                                                        key={`object-${index}`}
                                                                                                                                                                                  imageUrl={object.imageUrl}
                                                                                                                                                                                            position={object.position}
                                                                                                                                                                                                      project={project}
                                                                                                                                                                                                                enterAnimation={object.enterAnimation}
                                                                                                                                                                                                                          exitAnimation={object.exitAnimation}
                                                                                                                                                                                                                                    animations={object.animations}
                                                                                                                                                                                                                                            />
                                                                                                                                                                                                                                                  ))}

                                                                                                                                                                                                                                                        {/* Shapes */}
                                                                                                                                                                                                                                                              {scene.shapes?.map((shape, index) => (
                                                                                                                                                                                                                                                                      <AnimatedShape
                                                                                                                                                                                                                                                                                key={`shape-${index}`}
                                                                                                                                                                                                                                                                                          shape={shape}
                                                                                                                                                                                                                                                                                                  />
                                                                                                                                                                                                                                                                                                        ))}

                                                                                                                                                                                                                                                                                                              {/* Motion text */}
                                                                                                                                                                                                                                                                                                                    {scene.motionText?.map((text, index) => (
                                                                                                                                                                                                                                                                                                                            <MotionText
                                                                                                                                                                                                                                                                                                                                      key={`motion-text-${index}`}
                                                                                                                                                                                                                                                                                                                                                item={text}
                                                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                                                  </AbsoluteFill>
                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                                                                                                                                    export default Scene;