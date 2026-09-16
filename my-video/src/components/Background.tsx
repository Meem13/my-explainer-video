import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { FPS, IMAGE_HEIGHT, IMAGE_WIDTH } from "../lib/constants";
import { BackgroundElement } from "../lib/types";
import { calculateBlur, getImagePath } from "../lib/utils";

const EXTRA_SCALE = 0.2;

export const Background: React.FC<{
  item: BackgroundElement;
  project: string;
}> = ({ item, project }) => {
  const frame = useCurrentFrame();
  const localMs = (frame / FPS) * 1000;
  const { width, height } = useVideoConfig();

  const imageRatio = IMAGE_HEIGHT / IMAGE_WIDTH;
  const imgWidth = height;
  const imgHeight = imgWidth * imageRatio;

  // Preserve the existing timeline scale animation.
  let animScale = 1 + EXTRA_SCALE;

  const currentScaleAnim = item.animations?.find(
    (anim) =>
      anim.type === "scale" &&
      anim.startMs <= localMs &&
      anim.endMs >= localMs,
  );

  if (currentScaleAnim) {
    const progress =
      (localMs - currentScaleAnim.startMs) /
      (currentScaleAnim.endMs - currentScaleAnim.startMs);

    animScale =
      EXTRA_SCALE +
      progress * (currentScaleAnim.to - currentScaleAnim.from) +
      currentScaleAnim.from;
  }

  // Progress through the current scene.
  const sceneDuration = Math.max(item.endMs - item.startMs, 1);
  const sceneProgress = Math.min(
    1,
    Math.max(0, (localMs - item.startMs) / sceneDuration),
  );

  // Smooth fade/blur transitions using the transition types already
  // supported by BackgroundElement.
  const enterProgress = interpolate(
    Math.min(1, sceneProgress / 0.16),
    [0, 1],
    [0, 1],
    { easing: Easing.out(Easing.cubic) },
  );

  const exitProgress = interpolate(
    Math.max(0, (sceneProgress - 0.84) / 0.16),
    [0, 1],
    [0, 1],
    { easing: Easing.in(Easing.cubic) },
  );

  const enterTransition = item.enterTransition ?? "fade";
  const exitTransition = item.exitTransition ?? "fade";

  let opacity = 1;

  if (enterTransition === "fade") {
    opacity *= enterProgress;
  }

  if (exitTransition === "fade") {
    opacity *= 1 - exitProgress * 0.25;
  }

  const transitionBlur =
    enterTransition === "blur"
      ? (1 - enterProgress) * 18
      : exitTransition === "blur"
        ? exitProgress * 12
        : 0;

  const existingBlur = calculateBlur({ item, localMs });
  const currentBlur = 25 * existingBlur + transitionBlur;

  const imgScale = animScale;

  // Oversized image keeps the frame covered during movement.
  const baseTop = -(imgHeight * imgScale - height) / 2;
  const baseLeft = -(imgWidth * imgScale - width) / 2;

  // Very subtle editorial drift.
  const driftX = interpolate(
    sceneProgress,
    [0, 1],
    [-12, 12],
    { easing: Easing.inOut(Easing.ease) },
  );

  const driftY = interpolate(
    sceneProgress,
    [0, 1],
    [8, -8],
    { easing: Easing.inOut(Easing.ease) },
  );

  const framePadding = Math.max(22, Math.round(width * 0.035));
  const cornerRadius = Math.max(18, Math.round(width * 0.025));

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        backgroundColor: "#111",
      }}
    >
      {/* Main visual */}
      <Img
        src={staticFile(getImagePath(project, item.imageUrl))}
        style={{
          width: imgWidth * imgScale,
          height: imgHeight * imgScale,
          position: "absolute",
          top: baseTop + driftY,
          left: baseLeft + driftX,
          filter: `blur(${currentBlur}px)`,
          WebkitFilter: `blur(${currentBlur}px)`,
          opacity: 0.82 * opacity,
          objectFit: "cover",
          transform: "translateZ(0)",
        }}
      />

      {/* Soft editorial contrast layer */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.08) 55%, rgba(0,0,0,0.32) 100%)",
          opacity: 0.42 * opacity,
        }}
      />

      {/* Clean editorial frame */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          padding: framePadding,
          opacity: 0.9 * opacity,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid rgba(255,255,255,0.28)",
            borderRadius: cornerRadius,
            boxSizing: "border-box",
          }}
        />
      </AbsoluteFill>

      {/* Small accent bar */}
      <div
        style={{
          position: "absolute",
          top: Math.max(34, Math.round(height * 0.08)),
          left: Math.max(34, Math.round(width * 0.055)),
          width: Math.max(44, Math.round(width * 0.08)),
          height: 6,
          borderRadius: 999,
          backgroundColor: "white",
          opacity: 0.9 * opacity,
          transform: `translateX(${driftX * -0.4}px)`,
        }}
      />

      {/* Small accent circle */}
      <div
        style={{
          position: "absolute",
          right: Math.max(34, Math.round(width * 0.055)),
          bottom: Math.max(34, Math.round(height * 0.08)),
          width: Math.max(28, Math.round(width * 0.045)),
          height: Math.max(28, Math.round(width * 0.045)),
          borderRadius: "50%",
          border: "3px solid rgba(255,255,255,0.82)",
          opacity: 0.75 * opacity,
          transform: `translate(${driftX * 0.5}px, ${driftY * -0.5}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
