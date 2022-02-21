<script>
  import { numberToPercent } from "../../scripts/stringHelpers";

  export let leftColor;
  export let leftValue;
  export let rightValue;
  export let statName;
  leftValue = parseFloat(leftValue);
  rightValue = parseFloat(rightValue);
  let rightColor = leftColor === "blue" ? "orange" : "blue";
  let leftPercent = numberToPercent(
    (leftValue / (leftValue + rightValue)) * 100
  );
</script>

<div>
  <div class="bar-text">
    <span class="bar-text">{leftValue}</span>
    <span class="bar-name">{statName}</span>
    <span class="bar-text">{rightValue}</span>
  </div>
  <span class="bar">
    <span class="{leftColor} bar-side" style="width:{leftPercent}" />
    <span class="bar-middle" />
    <span class="{rightColor} bar-side" />
  </span>
</div>

<style>
  .bar-text {
    display: flex;
  }
  .bar-name {
    font-size: 1.1em;
    flex-grow: 1;
    text-align: center;
  }
  .bar-text {
    flex-basis: 30%;
    padding: 0 0.1em;
  }
  .bar-text:last-child {
    flex-basis: 30%;
    justify-content: right;
  }

  .bar {
    display: flex;
    align-items: center;
    position: relative;
    top: -0.3em;
  }
  .bar-middle {
    width: 0.2em;
    height: 0.7em;
    background-color: white;
  }
  .bar-side {
    height: 0.3em;
  }
  .bar-side:last-child {
    flex-grow: 1;
  }
  .orange {
    background-color: rgb(248, 197, 101);
  }
  .blue {
    background-color: rgb(133, 161, 255);
  }
</style>
