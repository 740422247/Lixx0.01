<template>
  <div class="starSky">
    <canvas @mousemove="move($event)" id="starSky"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    // 流星数量
    n: {
      type: Array
    },
    starNum: {
      type: Number
    }
  },
  data: () => ({
    sky: undefined,
    width: 0,
    height: 0,
    stars: [],
    meteors: []
  }),
  mounted() {
    this.init();
  },
  methods: {
    // 鼠标移动
    move(e) {
      const moveX = e.movementX;
      const moveY = e.movementY;
      this.stars.forEach((item, index) => {
        this.stars[index] = {
          ...item,
          x0:
            item.x0 - moveX*item.r / 10 < 0
              ? item.x0 - moveX*item.r + this.width
              : item.x0 - moveX*item.r / 10 > this.width
              ? item.x0 - this.width - moveX*item.r / 10
              : item.x0 - moveX*item.r / 10,
          y0:
            item.y0 - moveY*item.r / 10 < 0
              ? item.y0 - moveY*item.r + this.height
              : item.y0 - moveY*item.r / 10 > this.height
              ? item.y0 - this.height - moveY*item.r / 10
              : item.y0 - moveY*item.r / 10
        };
      });
    },
    // 初始化
    init() {
      const starSky = document.querySelector("#starSky");
      this.sky = starSky.getContext("2d");
      starSky.width = window.innerWidth;
      starSky.height = window.innerHeight;
      this.width = starSky.width;
      this.height = starSky.height;

      this.fillSky();
    },
    fillChart() {
      this.fillSky();
    },
    fillSky() {
      // 绘制背景
      this.sky.fillStyle = "rgba(0,0,0,0.8)";
      this.sky.fillRect(0, 0, this.width, this.height);
      const n = this.getMax(this.n[0], this.n[1]);
      // 绘制背景小星星
      for (var i = 0; i < this.starNum; i++) {
        if (i < n) {
          const meteorX = this.getMax(this.width * 0.75, this.width * 0.25);
          const meteorY = -this.getMax(200, 10);
          const meteorR = this.getMax(3, 1);
          const meteorO = this.getMax(1, 0.8);
          this.meteors.push({ meteorX, meteorY, meteorR, meteorO });
        }
        const x0 = this.getMax(this.width - 5, 5);
        const y0 = this.getMax(this.height - 5, 5);
        const r = this.getMax(2, 0.3);
        const ropacity = this.getMax(0.9, 0.3);
        this.stars.push({ x0, y0, r, ropacity, flat: true });
        this.sky.beginPath();
        this.sky.arc(x0, y0, r, 0, 2 * Math.PI);
        this.sky.fillStyle = "rgba(256,256,256," + ropacity + ")";
        this.sky.fill();
      }
      this.glint();
    },

    // 闪烁效果
    glint() {
      const self = this;
      // 设置背景渐变
      this.sky.clearRect(0, 0, this.width, this.height);
      var grd = this.sky.createRadialGradient(
        this.width / 2,
        this.height / 2,
        5,
        this.width / 2,
        this.height / 2,
        this.width
      );
      grd.addColorStop(0, "#116589");
      grd.addColorStop(1, "#02065D");
      this.sky.fillStyle = grd;
      // 绘制背景
      this.sky.fillRect(0, 0, this.width, this.height);
      // 绘制小星星
      this.stars.forEach((item, index) => {
        this.sky.beginPath();
        this.sky.arc(item.x0, item.y0, item.r, 0, 2 * Math.PI);

        if (item.r > 1.95) {
          this.sky.fillStyle = "rgba(256,256,256," + item.ropacity + ")";
        } else if (item.ropacity <= 0) {
          item.flat = false;
          this.stars[index].ropacity = item.ropacity + 0.01;
        } else if (item.ropacity >= 0.9) {
          item.flat = true;
          this.stars[index].ropacity = item.ropacity - 0.01;
        } else if (item.flat) {
          this.sky.fillStyle =
            "rgba(256,256,256," + (item.ropacity - item.r / 100) + ")";
          this.stars[index].ropacity = item.ropacity - item.r / 100;
        } else {
          this.sky.fillStyle =
            "rgba(256,256,256," + (item.ropacity + item.r / 100) + ")";
          this.stars[index].ropacity = item.ropacity + item.r / 100;
        }
        this.sky.fill();
      });
      // 绘制流星
      this.meteor();
      window.requestAnimationFrame(this.glint.bind(self));
    },
    meteor() {
      this.meteors.forEach((item, index) => {
        this.sky.beginPath();
        if (
          item.meteorX + 30 * item.meteorR < 0 ||
          item.meteorY - 30 * item.meteorR > this.height ||
          item.meteorO < 0
        ) {
          const meteorX = this.getMax(this.width * 1.25, this.width * 0.25);
          const meteorY = -this.getMax(200, 10);
          const meteorR = this.getMax(3, 2);
          const meteorO = this.getMax(1, 0.8);
          this.meteors[index] = { meteorX, meteorY, meteorR, meteorO };
        } else {
          this.sky.arc(
            item.meteorX - 15,
            item.meteorY + 15,
            item.meteorR,
            0,
            1.5 * Math.PI
          );
          this.meteors[index] = {
            ...this.meteors[index],
            meteorX: item.meteorX - 15,
            meteorY: item.meteorY + 15,
            meteorO: item.meteorO - 0.015
          };
          this.sky.lineTo(
            item.meteorX + 30 * item.meteorR,
            item.meteorY - 30 * item.meteorR
          );
          this.sky.fillStyle =
            "rgba(255,255,255," + (item.meteorO - 0.01) + ")";
        }

        this.sky.fill();
      });
    },
    getMax(max, min) {
      var m = min ? min : 0;
      return Math.random() * (max - m) + m;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.starSky {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
