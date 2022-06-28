<template>
  <div>
    <div
      class="with-bg-size"
      style="
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: -2;
        width: 100%;
        margin: auto;
      "
    >
      <div id="color-overlay"></div>
    </div>

    <div class="card">
      <p lass="title" style="font-size: 50px">Welcome to our admin panel</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
};
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  margin: 0px;
}

.title {
  color: "#fff";
  font-size: 80px;
  font-weight: 700;
}

.card {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
}

.icon-cog {
  color: white;
}

.fa-cog {
  color: white;
}

/* Here Is The CSS For The Background*/

/* An Overlay To Dim The Image And Make Text Readable*/
#color-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom right, #34495e, #2c3e50);
  opacity: 0.6;
  z-index: -1;
}

/* Setup For An Image That Fits On Most Screens And Resizes*/
.with-bg-size {
  background-image: url("https://images.unsplash.com/photo-1454897834822-1ece264a5d89?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=3a5615c0bc77123ece2a2663e2640341");
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;

  -webkit-animation: back 5s infinite; /* Safari 4+ */
  -moz-animation: back 5s infinite; /* Fx 5+ */
  -o-animation: back 5s infinite; /* Opera 12+ */
  animation: back 5s infinite; /* IE 10+, Fx 29+ */
}
/* The Keyframes*/
@keyframes back {
  25% {
    background-image: url("https://images.unsplash.com/photo-1463003416389-296a1ad37ca0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=1bed2a6743851633b655ae774c15ac07");
  }
  50% {
    background-image: url("https://images.unsplash.com/photo-1461080639469-66d73688fb21?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=dfec7f536c4133dc029608d2488e13e9");
  }

  75% {
    background-image: url("https://images.unsplash.com/photo-1461770354136-8f58567b617a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=f0c8c34fe56f9669d1c6d129f597f895");
  }

  /* Animation Does Not End At 100% Because It Makes The Images Transition In/Out Better For Some Reason*/
}
</style>
