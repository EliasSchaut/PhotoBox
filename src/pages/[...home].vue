<template>
  <div class="relative h-screen w-screen overflow-hidden">
    <!-- Video feed from camera -->
    <video ref="videoElement" class="h-full w-full object-cover" autoplay playsinline></video>

    <!-- Countdown overlay -->
    <div v-if="showCountdown" class="absolute inset-0 flex items-center justify-center bg-black opacity-50">
      <div class="text-9xl font-bold text-white">{{ countdown }}</div>
    </div>

    <!-- Success message -->
    <div v-if="showSuccessMessage"
         class="absolute inset-0 flex flex-col items-center justify-center bg-black opacity-95">
      <div class="text-4xl font-bold text-white mb-4 opacity-100">Photo Saved!</div>
      <div class="bg-white p-4 rounded mb-8 opacity-100">
        <QRCode :value="lastPhotoUrl" :size="200" level="M" />
      </div>
      <button
        @click="showSuccessMessage = false"
        class="bg-indigo-600 hover:bg-indigo-700 opacity-100 text-white font-bold py-2 px-4 rounded"
      >
        Continue (click or press 'p')
      </button>
    </div>

    <!-- Instructions -->
    <div class="absolute bottom-4 left-4 bg-black opacity-60 p-2 text-white rounded">
      Press 'p' to take a photo (5s countdown)
    </div>
  </div>
</template>

<script lang="ts">
import QRCode from 'qrcode.vue';

export default defineComponent({
  components: { QRCode },
  setup() {
    return {
      videoElement: ref<HTMLVideoElement | null>(null),
      showCountdown: ref(false),
      countdown: ref(5),
      showSuccessMessage: ref(false),
      lastPhotoUrl: ref(''),
      stream: ref<MediaStream | null>(null),
      countdownInterval: ref<number | null>(null),
    };
  },
  async mounted() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      if (this.videoElement) {
        this.videoElement.srcObject = this.stream;
      }

      // Add keyboard event listener
      window.addEventListener('keydown', this.handleKeyDown);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  },
  unmounted() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }

    window.removeEventListener('keydown', this.handleKeyDown);

    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  },
  methods: {
    handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'p') {
        if (this.showSuccessMessage) {
          // If success message is shown, dismiss it
          this.showSuccessMessage = false;
        } else if (!this.showCountdown) {
          // Otherwise start countdown if not already counting down
          this.startCountdown();
        }
      }
    },
    startCountdown() {
      this.showCountdown = true;
      this.countdown = 5;

      this.countdownInterval = window.setInterval(() => {
        this.countdown--;

        if (this.countdown <= 0) {
          clearInterval(this.countdownInterval as number);
          this.countdownInterval = null;
          this.takePhoto();
          this.showCountdown = false;
        }
      }, 1000);
    },
    async takePhoto() {
      if (!this.videoElement) return;

      // Create canvas to capture the frame
      const canvas = document.createElement('canvas');
      canvas.width = this.videoElement.videoWidth;
      canvas.height = this.videoElement.videoHeight;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw the current video frame to the canvas
      ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);

      // Convert to blob
      const blob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.95);
      });

      if (!blob) return;

      // Generate random filename
      const randomName = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const filename = `${randomName}.jpg`;

      // Create FormData to send to server
      const formData = new FormData();
      formData.append('photo', blob, filename);

      try {
        // Send to server endpoint
        const response = await fetch('/api/save-photo', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Photo saved successfully');

          // Set the photo URL and show success message
          this.lastPhotoUrl = `${window.location.origin}/${randomName}`;
          this.showSuccessMessage = true;
        } else {
          console.error('Failed to save photo');
        }
      } catch (error) {
        console.error('Error saving photo:', error);
      }
    },
  },
});
</script>
