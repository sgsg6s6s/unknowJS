<template>
  <div class="css-wrapper">
    <div class="center-test">
      <div
        class="outer-div"
        :key="index+'center'"
        v-for="(item,index) in items"
      >
        <div class="inner-div">{{index}}</div>
      </div>
    </div>
    <div class="unit-test">
      <div
        class="outer-div"
        :key="index+'unit'"
        v-for="(item,index) in fontSizeItems"
      >
        <div class="inner-div">{{item}}<div class="line"></div>
        </div>
      </div>
    </div>
    <div class="shape-test">
      <div
        class="outer-div"
        :key="index+'shape'"
        v-for="(item,index) in shapeItems"
      >
        {{item}}
      </div>
    </div>
    <div class="bfc-test">
      <div
        class="outer-div"
        :key="index+'bfc'"
        v-for="(item,index) in bfcItems"
      >
        <div class="header">{{item}}</div>
        <div
          v-if="item==='bfc'"
          class="bfc-wrapper"
        >
          <div class="body">overflow:hidden;</div>
        </div>
        <div
          v-if="item!=='bfc'"
          class="body"
        >body</div>
        <p class="footer">{{ 'footer '.repeat(index > 4 ?20:1) }}</p>
      </div>
      <label
        :key="item+'label'"
        v-for="item in 3"
      >label{{item + '&nbsp;'}}</label>
    </div>
    <div class="flex-test">
      <div
        class="item"
        :key="index"
        v-for="(item,index) in [1,2,3,4,5,1,2,3,4,5]"
        :style="index%2===0?'height:30px':''"
      >{{index}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CSSView extends Vue {
  items: Array<number> = []
  fontSizeItems: Array<string> = []
  shapeItems: Array<string> = []
  bfcItems: Array<string> = []
  mounted() {
    for (let i = 0; i < 8; i++) {
      this.items.push(i)
    }
    this.fontSizeItems = ['rem', 'em', 'vw', 'wh', 'px']
    this.shapeItems = ['triangle']
    this.bfcItems = [
      'bfc',
      'not-bfc',
      'float-bfc',
      'float-bfc2',
      'float-bfc3',
      'arround1',
      'arround2'
    ]
    console.info('100 count', this.deliver(100))
  }

  deliver(i: number): number {
    if (i > 0) {
      return i + this.deliver(i - 1)
    }
    return 0
  }
}
</script>
<style scoped lang="less">
@import url('../less/main');
.css-wrapper {
  @out-width: 100px;
  @out-height: 120px;
  @div-border: 3px solid gray;
  .div-bordered {
    border: @div-border;
  }
  .area-div {
    .black.style(); // 外部引入background,color
    // .black.border(); // 引入border方式1
    border: .black.border[border]; // 引入border方式2
    height: 150px;
    margin-top: 10px;
    display: flex;
    .outer-div {
      display: inline-block;
      width: @out-width;
      height: @out-height;
      margin-right: 20px;
      background: coral;
      .div-bordered();
      .inner-div {
        width: @out-width / 2;
        height: @out-height / 2;
        background: brown;
        .div-bordered();
        border-color: aqua;
      }
    }
  }

  .center-test {
    .area-div();

    .outer-div:nth-child(1) {
      display: inline-flex;
      justify-content: center;
    }

    .outer-div:nth-child(2) {
      text-align: center;
      .inner-div {
        display: inline-block;
      }
    }

    .outer-div:nth-child(3) {
      position: relative;
      .inner-div {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .outer-div:nth-child(4) {
      .inner-div {
        display: block;
        margin: 0 auto;
      }
    }

    .outer-div:nth-child(5) {
      line-height: @out-height;
      .inner-div {
        display: inline;
      }
    }

    .outer-div:nth-child(6) {
      position: relative;
      .inner-div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .outer-div:nth-child(7) {
      display: inline-flex;
      align-items: center;
    }
    .outer-div:nth-child(8) {
      vertical-align: middle;
      display: inline-table;
      table-layout: fixed;
      .inner-div {
        transform: scale(0.5);
        display: table-cell;
        width: 30px;
      }
    }
  }
  .unit-test {
    .area-div();
    .outer-div {
      .line {
        display: inline-block;
        height: 3px;
        width: 30px;
        position: absolute;
        color: black;
        top: 25%;
        // scale: 0.5;
      }
    }

    .outer-div:nth-child(1) {
      .inner-div {
        font-size: 2rem;
      }
    }

    .outer-div:nth-child(2) {
      font-size: 20px;
      .inner-div {
        font-size: 2em;
      }
    }

    .outer-div:nth-child(3) {
      .inner-div {
        font-size: 2vw;
      }
    }

    .outer-div:nth-child(4) {
      .inner-div {
        font-size: 2vh;
      }
    }

    .outer-div:nth-child(5) {
      .inner-div {
        font-size: 28px;
      }
    }
  }

  .shape-test {
    .area-div();
    .outer-div:nth-child(1) {
      display: inline-block;
      height: 0;
      width: 0;
      border-color: transparent red transparent transparent;
      border-width: 10px;
      border-style: solid;
      transform: rotate(90deg);
    }
  }

  .bfc-test {
    .area-div();
    height: 160px;

    .container {
      height: 20px;
      background: green;
      border-bottom: 1px solid blue;
      text-align: center;
    }

    .elements {
      .header {
        margin: 10px;
        .container;
      }

      .body {
        margin: 20px;
        .container;
      }

      .footer {
        .container;
        display: block;
      }
    }

    .outer-div {
      width: 200px;
      height: 140px;
    }

    .outer-div:nth-child(1) {
      .elements();
      .bfc-wrapper {
        box-sizing: border-box;
        border: 1px solid aqua;
        overflow: hidden;
      }
    }

    .outer-div:nth-child(2) {
      .elements();
    }

    .container-float {
      height: 140px;
      width: 50px;
      text-align: center;
      float: left;
    }

    .example-float {
      writing-mode: vertical-lr;
      .header {
        .container-float;
        background: red;
        margin-right: 10px;
      }

      .body {
        height: 140px;
        background: yellow;
        border: 2px solid black;
      }

      .footer {
        .container-float;
        float: right;
        margin-left: 10px;
        display: none;
        background: blue;
      }
    }

    .outer-div:nth-child(3) {
      .example-float();
    }
    .outer-div:nth-child(4) {
      .example-float();
      .body {
        overflow: hidden;
      }
    }
    .outer-div:nth-child(5) {
      .example-float();
      .body {
        overflow: hidden;
      }
      .footer {
        display: block;
      }
    }

    .example-around {
      .header {
        height: 60px;
        width: 80px;
        float: left;
      }
      .body {
        display: none;
      }
      .footer {
        word-wrap: break-word;
      }
    }

    .outer-div:nth-child(6) {
      .example-around;
    }
    .outer-div:nth-child(7) {
      .example-around;
      .footer {
        overflow: hidden;
      }
    }
  }

  .flex-test {
    width: 100px;
    background: gray;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: center;
    align-items: stretch;
    .item {
      width: 50px;
      background: blue;
      color: white;
    }
  }
}
</style>
