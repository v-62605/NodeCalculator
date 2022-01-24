// Clear box and styling
let boxClear = () => {
  document.getElementById("console-output").removeAttribute("style");
  document.getElementById("console-output").innerHTML = "";
};

//Create console output box
let boxCreate = () => {
  document.getElementById("console-output").style.border = "2px solid";
  document.getElementById("console-output").style.borderColor = "rgb(0, 255, 0)";
};

let chartClear = () => {
  document.getElementById("console-output").removeAttribute("style");
  document.getElementById("canvas").innerHTML = "";
  document.getElementById("canvas").style.border = "";
};

let chartUp = () => {
  document.getElementById("canvas").style.margin = "1%";
  document.getElementById("console-output").style.margin = "0%";
  document.getElementById("console-output").style.padding = "0%";
};

let chartBoxCreate = () => {
  document.getElementById("canvas").style.border = `1px solid rgb(0, 255, 0)`;
};

//Completely reset the calculator
//To add ability to clear chart
let clearCalc = () => {
  boxClear();
  chartClear();

  document.getElementById("daily-units").value = "";
  document.getElementById("node-price").value = "";
  document.getElementById("initial-node-count").value = "";
  document.getElementById("final-unit-sum").value = "";
  document.getElementById("time-cap").value = "";
  document.getElementById("node-cap").value = "";
  document.getElementById("daily-units-final").value = "";
  document.getElementById("reinvest-ratio").value = "";

  document.getElementById("buttons-b").innerHTML = "";

  console.clear();
};

//Simple growth calulation
function simple(dailyUnits, currentUnitSum, finalUnitSum, finalNodeCount, time, outputData = true) {
  let dailyUnitsUpdt;
  let consoleOutput = "";
  dailyUnits = Number(dailyUnits);
  while (currentUnitSum < finalUnitSum) {
    dailyUnitsUpdt = finalNodeCount * dailyUnits;
    currentUnitSum += dailyUnitsUpdt;

    time += 1;
  }

  finalUnitSum = currentUnitSum;
  // console.log(
  //   ` Time: ${time} days\n Final Unit Count: ${finalUnitSum}\n Final Node Count: ${finalNodeCount}\n Daily Units Final: ${dailyUnitsUpdt}`
  // );
  consoleOutput += ` Time: ${time} days\n Final Unit Count: ${finalUnitSum}\n Final Node Count: ${finalNodeCount}\n Daily Units Final: ${dailyUnitsUpdt}\n`;

  if (outputData == true) {
    return consoleOutput;
  }
}

function complex(
  dailyUnits,
  nodePrice,
  timeCap,
  nodeCap,
  reinvestRatio,
  time,
  currentUnitSum,
  finalNodeCount,
  outputData = true,
  arrayOutput = false
) {
  dailyUnits = Number(dailyUnits);
  nodePrice = Number(nodePrice);
  timeCap = Number(timeCap);
  nodeCap = Number(nodeCap);
  reinvestRatio = Number(reinvestRatio);
  let consoleOutput = "";
  let dailyUnitsUpdt;
  let moneyPool = 0;

  let timeStamps = [];
  let nodeArr = [];
  let moneyArr = [];

  while (time <= timeCap) {
    console.log(` Day: ${time}\n Current Unit Count (start): ${currentUnitSum.toFixed(2)}`);
    consoleOutput += ` Day: ${time}\n Current Unit Count (start): ${currentUnitSum.toFixed(2)}\n`;

    if (finalNodeCount < nodeCap) {
      //Buy nodes
      if (currentUnitSum >= nodePrice && finalNodeCount < nodeCap) {
        let numnodes = Math.floor((currentUnitSum / nodePrice) * reinvestRatio);
        if (numnodes + finalNodeCount > nodeCap) {
          let a = nodeCap - finalNodeCount;
          currentUnitSum -= nodePrice * a;
          finalNodeCount += a;
          if (numnodes > 0) {
            console.log(` Nodes Bought: ${a}\n Node Count: ${finalNodeCount}`);
            consoleOutput += ` Nodes Bought: ${a}\n Node Count: ${finalNodeCount}\n`;
          }
        } else {
          currentUnitSum -= nodePrice * numnodes;
          finalNodeCount += numnodes;
          if (numnodes > 0) {
            console.log(` Nodes Bought: ${numnodes}\n Node Count: ${finalNodeCount}`);
            consoleOutput += ` Nodes Bought: ${numnodes}\n Node Count: ${finalNodeCount}\n`;
          }
        }
      }

      dailyUnitsUpdt = finalNodeCount * dailyUnits * reinvestRatio;
      currentUnitSum += dailyUnitsUpdt;
      moneyPool += finalNodeCount * dailyUnits * (1 - reinvestRatio);
    } else {
      dailyUnitsUpdt = finalNodeCount * dailyUnits;
      currentUnitSum += dailyUnitsUpdt;
      moneyPool += dailyUnitsUpdt;
    }

    console.log(` Current Unit Count (end): ${currentUnitSum.toFixed(2)}`);
    consoleOutput += ` Current Unit Count (end): ${currentUnitSum.toFixed(2)}\n`;

    moneyArr.push(moneyPool);
    timeStamps.push(time);
    nodeArr.push(finalNodeCount);

    if (reinvestRatio < 1) {
      console.log(` Money Pool: ${moneyPool.toFixed(2)}`);
      consoleOutput += ` Money Pool: ${moneyPool.toFixed(2)}\n`;
    }

    time += 1;
    console.log(`\n`);
    consoleOutput += `\n`;
  }

  finalUnitSum = currentUnitSum;

  console.log(` Time: ${time - 1} days
		 Final Unit Count: ${finalUnitSum.toFixed(2)}
		 Final Node Count: ${finalNodeCount}
		 Daily Units Final: ${dailyUnitsUpdt.toFixed(2)}\n`);

  consoleOutput += ` Time: ${time - 1} days
		 Final Unit Count: ${finalUnitSum.toFixed(2)}
		 Final Node Count: ${finalNodeCount}
		 Daily Units Final: ${dailyUnitsUpdt.toFixed(2)}\n`;
  consoleOutput += `\n \n DONE.`;

  if (outputData == true && arrayOutput == false) {
    return consoleOutput;
  } else if ((arrayOutput == true, outputData == false)) {
    return [timeStamps, nodeArr, moneyArr];
  }
}

function reverse(
  dailyUnits,
  nodePrice,
  timeCap,
  nodeCap,
  reinvestRatio,
  time,
  currentUnitSum,
  finalNodeCount,
  dailyUnitsFinal,
  outputData = true
) {
  dailyUnitsFinal = Number(dailyUnitsFinal);
  dailyUnits = Number(dailyUnits);
  nodePrice = Number(nodePrice);
  timeCap = Number(timeCap);
  nodeCap = Number(nodeCap);
  reinvestRatio = Number(reinvestRatio);
  let consoleOutput = "";
  let dailyUnitsUpdt;
  let moneyPool;

  initialNodeCount = 1;
  nodeCap = Math.floor(dailyUnitsFinal / dailyUnits);
  let trueTime = 0;
  let e = -1;

  for (let i = 1; i < nodeCap + 1; i++) {
    finalNodeCount = i;
    currentUnitSum = 0;
    time = 0;
    console.log(` Initial Node Count: ${finalNodeCount}`);
    consoleOutput += ` Initial Node Count: ${finalNodeCount} \n`;

    while (time <= timeCap) {
      //Buy nodes
      if (currentUnitSum >= nodePrice && finalNodeCount < nodeCap) {
        let numnodes = Math.floor((currentUnitSum / nodePrice) * reinvestRatio);
        if (numnodes + finalNodeCount > nodeCap) {
          let a = nodeCap - finalNodeCount;
          currentUnitSum -= nodePrice * a;
          finalNodeCount += a;
        } else {
          currentUnitSum -= nodePrice * numnodes;
          finalNodeCount += numnodes;
        }
      }

      dailyUnitsUpdt = finalNodeCount * dailyUnits * reinvestRatio;
      currentUnitSum += dailyUnitsUpdt;
      moneyPool += finalNodeCount * dailyUnits * (1 - reinvestRatio);

      if (finalNodeCount >= nodeCap) {
        trueTime = time;
        break;
      }

      time += 1;
    }

    console.log(` Final Node Count: ${finalNodeCount}`);
    consoleOutput += ` Final Node Count: ${finalNodeCount}\n`;

    if (trueTime > 0) {
      console.log(` Day ${trueTime}`);
      consoleOutput += ` Day ${trueTime}\n`;
    } else {
      console.log(` Insufficient Time`);
      consoleOutput += ` Insufficient Time\n`;
    }

    if (finalNodeCount >= nodeCap) {
      console.log(`\n`);
      console.log(` Initial Count: ${i}\t Initial Daily Units: ${dailyUnits * i}\n`);
      consoleOutput += `\n`;
      consoleOutput += ` Initial Count: ${i}\t Initial Daily Units: ${dailyUnits * i}\n`;
      e = 1;
      break;
    }

    console.log(`\n`);
    consoleOutput += `\n`;
  }

  if (e == -1) {
    console.log(` Insufficient time to reach ${dailyUnitsFinal} units per day`);
    consoleOutput += ` Insufficient time to reach ${dailyUnitsFinal} units per day\n`;
  }
  consoleOutput += `\n \n DONE.`;

  if (outputData == true) {
    return consoleOutput;
  }
}

let createChart = () => {
  //Grab all relevant values for calulation
  let dailyUnits = document.getElementById("daily-units").value;
  let nodePrice = document.getElementById("node-price").value;
  let initialNodeCount = document.getElementById("initial-node-count").value;
  let finalUnitSum = document.getElementById("final-unit-sum").value;
  let timeCap = document.getElementById("time-cap").value;
  let nodeCap = document.getElementById("node-cap").value;
  let dailyUnitsFinal = document.getElementById("daily-units-final").value;
  let reinvestRatio = document.getElementById("reinvest-ratio").value;

  let time = 1;
  let currentUnitSum = 0;
  let finalNodeCount = Number(initialNodeCount);
  let dailyUnitsUpdt = 0;

  if (nodeCap === -1 || nodeCap === "") {
    nodeCap = 10000000000000000000000000000000;
  }

  console.log("Create Click");

  data = complex(
    dailyUnits,
    nodePrice,
    timeCap,
    nodeCap,
    reinvestRatio,
    time,
    currentUnitSum,
    finalNodeCount,
    false,
    true
  );

  let timeLabels = data[0];
  let nodeArr = data[1];
  let moneyArr = data[2];

  boxClear();
  chartClear();
  chartUp();
  chartBoxCreate();

  document.getElementById("canvas").innerHTML = `<canvas id="myChart"></canvas>`;

  const canvas = document.getElementById("myChart");
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Nodes",
          data: nodeArr,
          backgroundColor: "rgba(0, 255, 0, 1)",
          borderColor: "rgba(0, 255, 0, 1)",
          borderWidth: 0,
          order: 1,
        },
        {
          label: "Money Pool",
          data: moneyArr,
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderColor: "rgba(255, 0, 0, 1)",
          borderWidth: 0,
          order: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  console.log(moneyArr);
};

function main() {
  //Grab all relevant values for calulation
  let dailyUnits = document.getElementById("daily-units").value;
  let nodePrice = document.getElementById("node-price").value;
  let initialNodeCount = document.getElementById("initial-node-count").value;
  let finalUnitSum = document.getElementById("final-unit-sum").value;
  let timeCap = document.getElementById("time-cap").value;
  let nodeCap = document.getElementById("node-cap").value;
  let dailyUnitsFinal = document.getElementById("daily-units-final").value;
  let reinvestRatio = document.getElementById("reinvest-ratio").value;

  let time = 1;
  let currentUnitSum = 0;
  let finalNodeCount = Number(initialNodeCount);
  let dailyUnitsUpdt = 0;

  let chartButton = `<button type="submit" id="button-create" onclick="createChart()">Create Chart</button>`;

  if (nodeCap === -1 || nodeCap === "") {
    nodeCap = 10000000000000000000000000000000;
  }

  boxClear();
  chartClear();

  let consoleOutput;

  if (timeCap == "" && finalUnitSum !== "" && reinvestRatio == "" && dailyUnits != 0) {
    // document.getElementById("console-output").innerText = 'Please Wait...\n \n';
    boxCreate();
    consoleOutput = simple(dailyUnits, currentUnitSum, finalUnitSum, finalNodeCount, time);
  }

  if (finalUnitSum === "" && initialNodeCount >= 1 && dailyUnits != "" && nodePrice != "" && timeCap != "") {
    // document.getElementById("console-output").innerText = 'Please Wait...\n \n';
    boxCreate();
    consoleOutput = complex(
      dailyUnits,
      nodePrice,
      timeCap,
      nodeCap,
      reinvestRatio,
      time,
      currentUnitSum,
      finalNodeCount,
      true
    );

    document.getElementById("buttons-b").innerHTML = chartButton;
  }

  if (
    initialNodeCount == "" &&
    reinvestRatio != "" &&
    nodePrice != "" &&
    dailyUnits != "" &&
    timeCap != "" &&
    dailyUnitsFinal != ""
  ) {
    // document.getElementById("console-output").innerText = 'Please Wait... \n \n';
    boxCreate();
    consoleOutput = reverse(
      dailyUnits,
      nodePrice,
      timeCap,
      nodeCap,
      reinvestRatio,
      time,
      currentUnitSum,
      finalNodeCount,
      dailyUnitsFinal,
      true
    );
  }

  if (consoleOutput != undefined) {
    document.getElementById("console-output").innerText = consoleOutput;
  }
  console.log("Click");
}
