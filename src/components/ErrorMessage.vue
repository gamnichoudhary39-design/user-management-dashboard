<template >
  <div class="error">
  {{ message }}  
  </div>
</template>

<script setup>
/*global defineProps*/
defineProps({
    message:String
});

</script>

<style >
.error{

    color:red;
text-align: center;
padding:10px

}

</style>


