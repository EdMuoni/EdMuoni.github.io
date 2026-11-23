<template>
  <!-- Two waves at the bottom of a header, drifting sideways. Each path holds two identical
       waves, so sliding it by half its width loops without a jump. -->
  <div class="wave-edge" aria-hidden="true">
    <svg class="wave back" viewBox="0 0 2880 48" preserveAspectRatio="none">
      <path d="M0 24 Q360 48 720 24 T1440 24 T2160 24 T2880 24 V48 H0 Z" />
    </svg>
    <svg class="wave front" viewBox="0 0 2880 48" preserveAspectRatio="none">
      <path d="M0 28 Q360 4 720 28 T1440 28 T2160 28 T2880 28 V48 H0 Z" />
    </svg>
  </div>
</template>

<style scoped>
.wave-edge {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: clamp(22px, 3.5vw, 44px);
  overflow: hidden;
  pointer-events: none;
  z-index: 1;
}

.wave {
  position: absolute;
  inset: 0 auto 0 0;
  width: 200%;
  height: 100%;
  fill: var(--page-bg);
  animation: wave-slide 22s linear infinite;
}

.back {
  opacity: 0.45;
  animation-duration: 34s;
  animation-direction: reverse;
}

@keyframes wave-slide {
  to {
    transform: translateX(-50%);
  }
}
</style>
