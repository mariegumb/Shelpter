<template>
    <transition appear enter-active-class="transform duration-200" enter-from-class="scale-75 opacity-0" enter-to-class="scale-100 opacity-100">
        <div @click="$emit('stop')" v-if="display" class="z-50 inset-0 absolute w-screen h-screen bg-gray-900 bg-opacity-100">
        <div class="w-full h-full mt-16 text-center flex flex-col justify-between">
        <div>
            <span class="block text-3xl">Yacine</span>
            <span class="-mt-2 block text-gray-600">Mobile</span>
        </div>
        <div>
            <div class=" h-32 flex justify-center items-center">
            <div class="h-12 text-white">
                <svg style="fill: white" class="h-6 ml-2 text-white" aria-hidden="true" focusable="false" data-prefix="fa-solid" data-icon="alarm-clock" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M161.057 25.785L15.148 147.375C5.672 132.496 0 114.949 0 96C0 42.98 42.98 0 96 0C121.191 0 143.932 9.914 161.057 25.785ZM416 0C390.809 0 368.068 9.914 350.943 25.785L496.852 147.375C506.328 132.496 512 114.949 512 96C512 42.98 469.02 0 416 0ZM480 288.001C480 338.305 463.215 384.574 435.219 421.965L470.628 457.374C476.876 463.622 480 471.811 480 480.001C480 488.19 476.876 496.38 470.627 502.629L470.627 502.629C464.378 508.876 456.19 512 448.001 512C439.811 512 431.622 508.876 425.374 502.628L389.965 467.219C352.574 495.215 306.305 512 256 512C205.697 512 159.426 495.219 122.035 467.219L86.627 502.628C80.378 508.876 72.189 512 64 512C55.811 512 47.623 508.877 41.375 502.63L41.375 502.63C35.125 496.381 32 488.19 32 480C32 471.81 35.124 463.62 41.373 457.372L76.779 421.965C48.783 384.574 32 338.305 32 288C32 164.289 132.289 64 256 64C384.46 64 480 168.004 480 288.001ZM344.003 352.017C344.003 344.72 340.688 337.519 334.407 332.813L280 292V184C280 170.75 269.25 160 256 160S232 170.75 232 184V304C232 311.562 235.562 318.656 241.594 323.188L305.594 371.188C309.922 374.438 314.969 376 319.985 376C333.183 376 344.003 365.333 344.003 352.017Z "></path>
                </svg>
                <span class="font-light text-xs">Rappel</span>
            </div>
            <div class="ml-32 text-center">
                <svg class="ml-3 h-8 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                </svg>
                <p class="-mt-0 font-light text-xs">Message</p>
            </div>
            </div>
            <div class="h-64">
                <div class="flex text-left pl-2 pt-2 w-2/3 h-20 rounded-full bg-gray-800 mx-auto">
                <div class="text-center inline-block rounded-full h-16 w-16 bg-gray-200 text-green-500">
                    <svg class="mx-auto mt-4 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                </div>
                <div class="ml-8 inline-block h-16 text-white text-xl">
                    <div class="h-full flex items-center">
                    <div>Répondre</div>
                    </div>
                </div>
                </div>
            </div>
        </div>
        </div>
  </div>
  </transition>
</template>

<script>
export default {
    props:{
        display:{
            type: Boolean,
            default: false,
        }
    }
}
</script>