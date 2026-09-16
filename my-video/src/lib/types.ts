import { CharacterAlignmentResponseModel } from "@elevenlabs/elevenlabs-js/api";
import { z } from "zod";

/* -------------------------------------------------------
   BASIC TRANSITIONS
   ------------------------------------------------------- */

   const TransitionTypeSchema = z.union([
     z.literal("fade"),
       z.literal("blur"),
         z.literal("none"),
           z.literal("slide"),
             z.literal("scale"),
               z.literal("pop"),
               ]);

               /* -------------------------------------------------------
                  ANIMATION SYSTEM
                  ------------------------------------------------------- */

                  const AnimationTypeSchema = z.union([
                    z.literal("fade"),
                      z.literal("slide"),
                        z.literal("scale"),
                          z.literal("pop"),
                            z.literal("float"),
                              z.literal("bounce"),
                                z.literal("rotate"),
                                  z.literal("blur"),
                                  ]);

                                  const AnimationSchema = z.object({
                                    type: AnimationTypeSchema,

                                      startMs: z.number(),
                                        endMs: z.number(),

                                          from: z.number().optional(),
                                            to: z.number().optional(),

                                              x: z.number().optional(),
                                                y: z.number().optional(),

                                                  intensity: z.number().optional(),
                                                  });

                                                  /* -------------------------------------------------------
                                                     POSITION
                                                     ------------------------------------------------------- */

                                                     const PositionSchema = z.object({
                                                       x: z.number(),
                                                         y: z.number(),
                                                           width: z.number().optional(),
                                                             height: z.number().optional(),
                                                               rotation: z.number().optional(),
                                                                 opacity: z.number().optional(),
                                                                 });

                                                                 /* -------------------------------------------------------
                                                                    BACKGROUND
                                                                    ------------------------------------------------------- */

                                                                    const BackgroundTransitionTypeSchema = z.union([
                                                                      z.literal("fade"),
                                                                        z.literal("blur"),
                                                                          z.literal("none"),
                                                                          ]);

                                                                          const TimelineElementSchema = z.object({
                                                                            startMs: z.number(),
                                                                              endMs: z.number(),
                                                                              });

                                                                              const ElementAnimationSchema = TimelineElementSchema.extend({
                                                                                type: z.literal("scale"),
                                                                                  from: z.number(),
                                                                                    to: z.number(),
                                                                                    });

                                                                                    const BackgroundElementSchema = TimelineElementSchema.extend({
                                                                                      imageUrl: z.string(),

                                                                                        enterTransition: BackgroundTransitionTypeSchema.optional(),
                                                                                          exitTransition: BackgroundTransitionTypeSchema.optional(),

                                                                                            animations: z.array(ElementAnimationSchema).optional(),
                                                                                            });

                                                                                            /* -------------------------------------------------------
                                                                                               CHARACTERS
                                                                                               ------------------------------------------------------- */

                                                                                               const CharacterElementSchema = TimelineElementSchema.extend({
                                                                                                 imageUrl: z.string(),

                                                                                                   position: PositionSchema,

                                                                                                     enterAnimation: AnimationSchema.optional(),
                                                                                                       exitAnimation: AnimationSchema.optional(),

                                                                                                         animations: z.array(AnimationSchema).optional(),
                                                                                                         });

                                                                                                         /* -------------------------------------------------------
                                                                                                            VISUAL OBJECTS
                                                                                                            ------------------------------------------------------- */

                                                                                                            const VisualObjectElementSchema = TimelineElementSchema.extend({
                                                                                                              imageUrl: z.string(),

                                                                                                                position: PositionSchema,

                                                                                                                  enterAnimation: AnimationSchema.optional(),
                                                                                                                    exitAnimation: AnimationSchema.optional(),

                                                                                                                      animations: z.array(AnimationSchema).optional(),
                                                                                                                      });

                                                                                                                      /* -------------------------------------------------------
                                                                                                                         SHAPES
                                                                                                                         ------------------------------------------------------- */

                                                                                                                         const ShapeTypeSchema = z.union([
                                                                                                                           z.literal("rectangle"),
                                                                                                                             z.literal("circle"),
                                                                                                                               z.literal("line"),
                                                                                                                                 z.literal("arrow"),
                                                                                                                                   z.literal("pill"),
                                                                                                                                   ]);

                                                                                                                                   const ShapeElementSchema = TimelineElementSchema.extend({
                                                                                                                                     shape: ShapeTypeSchema,

                                                                                                                                       position: PositionSchema,

                                                                                                                                         fill: z.string().optional(),
                                                                                                                                           stroke: z.string().optional(),
                                                                                                                                             strokeWidth: z.number().optional(),

                                                                                                                                               enterAnimation: AnimationSchema.optional(),
                                                                                                                                                 exitAnimation: AnimationSchema.optional(),

                                                                                                                                                   animations: z.array(AnimationSchema).optional(),
                                                                                                                                                   });

                                                                                                                                                   /* -------------------------------------------------------
                                                                                                                                                      MOTION TEXT
                                                                                                                                                      ------------------------------------------------------- */

                                                                                                                                                      const MotionTextElementSchema = TimelineElementSchema.extend({
                                                                                                                                                        text: z.string(),

                                                                                                                                                          position: PositionSchema,

                                                                                                                                                            fontSize: z.number().optional(),
                                                                                                                                                              fontWeight: z.number().optional(),

                                                                                                                                                                color: z.string().optional(),
                                                                                                                                                                  backgroundColor: z.string().optional(),

                                                                                                                                                                    enterAnimation: AnimationSchema.optional(),
                                                                                                                                                                      exitAnimation: AnimationSchema.optional(),

                                                                                                                                                                        animations: z.array(AnimationSchema).optional(),
                                                                                                                                                                        });

                                                                                                                                                                        /* -------------------------------------------------------
                                                                                                                                                                           DIAGRAMS / CALLOUTS
                                                                                                                                                                           ------------------------------------------------------- */

                                                                                                                                                                           const DiagramElementSchema = TimelineElementSchema.extend({
                                                                                                                                                                             title: z.string().optional(),

                                                                                                                                                                               items: z.array(
                                                                                                                                                                                   z.object({
                                                                                                                                                                                         label: z.string(),
                                                                                                                                                                                               value: z.string().optional(),
                                                                                                                                                                                                     imageUrl: z.string().optional(),
                                                                                                                                                                                                         }),
                                                                                                                                                                                                           ),

                                                                                                                                                                                                             position: PositionSchema,

                                                                                                                                                                                                               enterAnimation: AnimationSchema.optional(),
                                                                                                                                                                                                                 exitAnimation: AnimationSchema.optional(),
                                                                                                                                                                                                                 });

                                                                                                                                                                                                                 /* -------------------------------------------------------
                                                                                                                                                                                                                    TEXT / SUBTITLES
                                                                                                                                                                                                                    ------------------------------------------------------- */

                                                                                                                                                                                                                    const TextElementSchema = TimelineElementSchema.extend({
                                                                                                                                                                                                                      text: z.string(),

                                                                                                                                                                                                                        position: z.union([
                                                                                                                                                                                                                            z.literal("top"),
                                                                                                                                                                                                                                z.literal("bottom"),
                                                                                                                                                                                                                                    z.literal("center"),
                                                                                                                                                                                                                                      ]),

                                                                                                                                                                                                                                        animations: z.array(ElementAnimationSchema).optional(),
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        /* -------------------------------------------------------
                                                                                                                                                                                                                                           AUDIO
                                                                                                                                                                                                                                           ------------------------------------------------------- */

                                                                                                                                                                                                                                           const AudioElementSchema = TimelineElementSchema.extend({
                                                                                                                                                                                                                                             audioUrl: z.string(),
                                                                                                                                                                                                                                             });

                                                                                                                                                                                                                                             /* -------------------------------------------------------
                                                                                                                                                                                                                                                NEW SCENE
                                                                                                                                                                                                                                                ------------------------------------------------------- */

                                                                                                                                                                                                                                                const SceneSchema = TimelineElementSchema.extend({
                                                                                                                                                                                                                                                  id: z.string(),

                                                                                                                                                                                                                                                    background: BackgroundElementSchema.optional(),

                                                                                                                                                                                                                                                      characters: z.array(CharacterElementSchema).optional(),

                                                                                                                                                                                                                                                        objects: z.array(VisualObjectElementSchema).optional(),

                                                                                                                                                                                                                                                          shapes: z.array(ShapeElementSchema).optional(),

                                                                                                                                                                                                                                                            motionText: z.array(MotionTextElementSchema).optional(),

                                                                                                                                                                                                                                                              diagrams: z.array(DiagramElementSchema).optional(),

                                                                                                                                                                                                                                                                transitionIn: TransitionTypeSchema.optional(),
                                                                                                                                                                                                                                                                  transitionOut: TransitionTypeSchema.optional(),
                                                                                                                                                                                                                                                                  });

                                                                                                                                                                                                                                                                  /* -------------------------------------------------------
                                                                                                                                                                                                                                                                     TIMELINE
                                                                                                                                                                                                                                                                     ------------------------------------------------------- */

                                                                                                                                                                                                                                                                     const TimelineSchema = z.object({
                                                                                                                                                                                                                                                                       shortTitle: z.string(),

                                                                                                                                                                                                                                                                         /*
                                                                                                                                                                                                                                                                            Existing system.
                                                                                                                                                                                                                                                                               Kept so old timelines remain compatible.
                                                                                                                                                                                                                                                                                 */
                                                                                                                                                                                                                                                                                   elements: z.array(BackgroundElementSchema),

                                                                                                                                                                                                                                                                                     text: z.array(TextElementSchema),

                                                                                                                                                                                                                                                                                       audio: z.array(AudioElementSchema),

                                                                                                                                                                                                                                                                                         /*
                                                                                                                                                                                                                                                                                            New scene system.
                                                                                                                                                                                                                                                                                              */
                                                                                                                                                                                                                                                                                                scenes: z.array(SceneSchema).optional(),
                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                /* -------------------------------------------------------
                                                                                                                                                                                                                                                                                                   EXPORTED TYPES
                                                                                                                                                                                                                                                                                                   ------------------------------------------------------- */

                                                                                                                                                                                                                                                                                                   export type BackgroundTransitionType = z.infer<
                                                                                                                                                                                                                                                                                                     typeof BackgroundTransitionTypeSchema
                                                                                                                                                                                                                                                                                                     >;

                                                                                                                                                                                                                                                                                                     export type TimelineElement = z.infer<typeof TimelineElementSchema>;

                                                                                                                                                                                                                                                                                                     export type ElementAnimation = z.infer<typeof ElementAnimationSchema>;

                                                                                                                                                                                                                                                                                                     export type Animation = z.infer<typeof AnimationSchema>;

                                                                                                                                                                                                                                                                                                     export type Position = z.infer<typeof PositionSchema>;

                                                                                                                                                                                                                                                                                                     export type BackgroundElement = z.infer<typeof BackgroundElementSchema>;

                                                                                                                                                                                                                                                                                                     export type CharacterElement = z.infer<typeof CharacterElementSchema>;

                                                                                                                                                                                                                                                                                                     export type VisualObjectElement = z.infer<
                                                                                                                                                                                                                                                                                                       typeof VisualObjectElementSchema
                                                                                                                                                                                                                                                                                                       >;

                                                                                                                                                                                                                                                                                                       export type ShapeElement = z.infer<typeof ShapeElementSchema>;

                                                                                                                                                                                                                                                                                                       export type MotionTextElement = z.infer<
                                                                                                                                                                                                                                                                                                         typeof MotionTextElementSchema
                                                                                                                                                                                                                                                                                                         >;

                                                                                                                                                                                                                                                                                                         export type DiagramElement = z.infer<typeof DiagramElementSchema>;

                                                                                                                                                                                                                                                                                                         export type TextElement = z.infer<typeof TextElementSchema>;

                                                                                                                                                                                                                                                                                                         export type AudioElement = z.infer<typeof AudioElementSchema>;

                                                                                                                                                                                                                                                                                                         export type Scene = z.infer<typeof SceneSchema>;

                                                                                                                                                                                                                                                                                                         export type Timeline = z.infer<typeof TimelineSchema>;

                                                                                                                                                                                                                                                                                                         /* -------------------------------------------------------
                                                                                                                                                                                                                                                                                                            EXPORTED SCHEMAS
                                                                                                                                                                                                                                                                                                            ------------------------------------------------------- */

                                                                                                                                                                                                                                                                                                            export {
                                                                                                                                                                                                                                                                                                              AudioElementSchema,
                                                                                                                                                                                                                                                                                                                BackgroundElementSchema,
                                                                                                                                                                                                                                                                                                                  BackgroundTransitionTypeSchema,
                                                                                                                                                                                                                                                                                                                    CharacterElementSchema,
                                                                                                                                                                                                                                                                                                                      DiagramElementSchema,
                                                                                                                                                                                                                                                                                                                        ElementAnimationSchema,
                                                                                                                                                                                                                                                                                                                          MotionTextElementSchema,
                                                                                                                                                                                                                                                                                                                            PositionSchema,
                                                                                                                                                                                                                                                                                                                              SceneSchema,
                                                                                                                                                                                                                                                                                                                                ShapeElementSchema,
                                                                                                                                                                                                                                                                                                                                  TextElementSchema,
                                                                                                                                                                                                                                                                                                                                    TimelineElementSchema,
                                                                                                                                                                                                                                                                                                                                      TimelineSchema,
                                                                                                                                                                                                                                                                                                                                        TransitionTypeSchema,
                                                                                                                                                                                                                                                                                                                                          VisualObjectElementSchema,
                                                                                                                                                                                                                                                                                                                                            AnimationSchema,
                                                                                                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                                                                                                            /* -------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                               STORY GENERATION
                                                                                                                                                                                                                                                                                                                                               ------------------------------------------------------- */

                                                                                                                                                                                                                                                                                                                                               export const StoryScript = z.object({
                                                                                                                                                                                                                                                                                                                                                 text: z.string(),
                                                                                                                                                                                                                                                                                                                                                 });

                                                                                                                                                                                                                                                                                                                                                 export const StoryWithImages = z.object({
                                                                                                                                                                                                                                                                                                                                                   result: z.array(
                                                                                                                                                                                                                                                                                                                                                       z.object({
                                                                                                                                                                                                                                                                                                                                                             text: z.string(),
                                                                                                                                                                                                                                                                                                                                                                   imageDescription: z.string(),
                                                                                                                                                                                                                                                                                                                                                                       }),
                                                                                                                                                                                                                                                                                                                                                                         ),
                                                                                                                                                                                                                                                                                                                                                                         });

                                                                                                                                                                                                                                                                                                                                                                         /* -------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                            VOICE
                                                                                                                                                                                                                                                                                                                                                                            ------------------------------------------------------- */

                                                                                                                                                                                                                                                                                                                                                                            export const VoiceDescriptorSchema = z.object({
                                                                                                                                                                                                                                                                                                                                                                              id: z.string(),
                                                                                                                                                                                                                                                                                                                                                                                name: z.string(),
                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                export type VoiceDescriptor = z.infer<typeof VoiceDescriptorSchema>;

                                                                                                                                                                                                                                                                                                                                                                                /* -------------------------------------------------------
                                                                                                                                                                                                                                                                                                                                                                                   STORY METADATA
                                                                                                                                                                                                                                                                                                                                                                                   ------------------------------------------------------- */

                                                                                                                                                                                                                                                                                                                                                                                   export interface StoryMetadataWithDetails {
                                                                                                                                                                                                                                                                                                                                                                                     shortTitle: string;
                                                                                                                                                                                                                                                                                                                                                                                       content: ContentItemWithDetails[];
                                                                                                                                                                                                                                                                                                                                                                                       }

                                                                                                                                                                                                                                                                                                                                                                                       export interface ContentItemWithDetails {
                                                                                                                                                                                                                                                                                                                                                                                         text: string;
                                                                                                                                                                                                                                                                                                                                                                                           imageDescription: string;
                                                                                                                                                                                                                                                                                                                                                                                             uid: string;
                                                                                                                                                                                                                                                                                                                                                                                               audioTimestamps: CharacterAlignmentResponseModel;
                                                                                                                                                                                                                                                                                                                                                                                               }