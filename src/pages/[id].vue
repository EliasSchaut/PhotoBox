<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white rounded-lg shadow-lg max-w-4xl w-full overflow-hidden">
      <div class="p-6 bg-indigo-600">
        <h1 class="text-2xl font-bold text-white">PhotoBox</h1>
      </div>

      <div class="p-6">
        <img 
          :src="photoUrl" 
          alt="Your photo" 
          class="w-full h-auto rounded-lg shadow-md mb-6"
        />

        <div class="flex justify-center">
          <a 
            :href="photoUrl" 
            :download="photoFilename"
            class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg flex items-center"
          >
            <span class="mr-2">Download Photo</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const photoId = route.params.id as string;
const photoUrl = `/photos/${photoId}.jpg`;
const photoFilename = photoId;
</script>
