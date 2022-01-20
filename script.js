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

    let moneyPool = 0;
    let dailyUnitsUpdt = 0;

    if (nodeCap === -1 || nodeCap === "") {
        nodeCap = 10000000000000000000000000000000;
    }

    
    
    let boxClear = () => {
        document.getElementById("console-output").removeAttribute('style');
        document.getElementById("console-output").innerHTML = '';
    }

    let boxCreate = () => {
        document.getElementById("console-output").style.margin = 'auto';
        document.getElementById("console-output").style.marginTop = '2%';
        document.getElementById("console-output").style.padding = '1%';
        document.getElementById("console-output").style.border = '2px solid';
        document.getElementById("console-output").style.borderColor = 'rgb(0, 255, 0)';
        document.getElementById("console-output").style.width = '40%';
        document.getElementById("console-output").style.fontSize = '12px';
    }

    boxClear();


    let consoleOutput = "";

    function simple() {
        dailyUnits = Number(dailyUnits);
            while (currentUnitSum < finalUnitSum) {

                //Buy a node
                // if (currentUnitSum >= nodePrice && finalNodeCount < nodeCap) {
                //     let numnodes = Math.floor(currentUnitSum / nodePrice * reinvestRatio);
                //     if (numnodes + finalNodeCount > nodeCap) {
                //         let a = nodeCap - finalNodeCount;
                //         currentUnitSum -= nodePrice * a;
                //         finalNodeCount += a;
                //     } else {
                //         currentUnitSum -= nodePrice * numnodes;
                //         finalNodeCount += numnodes;
                //     }
                //  }
                dailyUnitsUpdt = finalNodeCount * dailyUnits;
                currentUnitSum += dailyUnitsUpdt;

                time += 1;
            }

            finalUnitSum = currentUnitSum;
            console.log(` Time: ${time} days\n Final Unit Count: ${finalUnitSum}\n Final Node Count: ${finalNodeCount}\n Daily Units Final: ${dailyUnitsUpdt}`);
            consoleOutput += ` Time: ${time} days\n Final Unit Count: ${finalUnitSum}\n Final Node Count: ${finalNodeCount}\n Daily Units Final: ${dailyUnitsUpdt}\n`;
    }

    function complex() {
        
        dailyUnits = Number(dailyUnits);
        nodePrice = Number(nodePrice);
        timeCap = Number(timeCap);
        nodeCap = Number(nodeCap);
        reinvestRatio = Number(reinvestRatio);

        while (time <= timeCap) {
            console.log(` Day: ${time}\n Current Unit Count (start): ${currentUnitSum.toFixed(2)}`);
            consoleOutput += ` Day: ${time}\n Current Unit Count (start): ${currentUnitSum.toFixed(2)}\n`;

            if (finalNodeCount < nodeCap) {

                //Buy nodes
                if (currentUnitSum >= nodePrice && finalNodeCount < nodeCap) {
                    let numnodes = Math.floor((currentUnitSum / nodePrice) * reinvestRatio);
                    if ((numnodes + finalNodeCount) > nodeCap) {
                        let a = nodeCap - finalNodeCount;
                        currentUnitSum -= nodePrice * a;
                        finalNodeCount += a;
                        if (numnodes > 0) {
                            console.log(` Nodes Bought: ${a}\n Node Count: ${finalNodeCount}`)
                            consoleOutput += ` Nodes Bought: ${a}\n Node Count: ${finalNodeCount}\n`;
                        }
                    } else {
                        currentUnitSum -= nodePrice * numnodes;
                        finalNodeCount += numnodes;
                        if (numnodes > 0) {
                            console.log(` Nodes Bought: ${numnodes}\n Node Count: ${finalNodeCount}`)
                            consoleOutput += ` Nodes Bought: ${numnodes}\n Node Count: ${finalNodeCount}\n`;
                        }
                    }
                }

                dailyUnitsUpdt = finalNodeCount * dailyUnits * reinvestRatio;
                currentUnitSum += dailyUnitsUpdt;
                moneyPool += finalNodeCount * dailyUnits * (1 - reinvestRatio)

            } else {
                dailyUnitsUpdt = finalNodeCount * dailyUnits;
                currentUnitSum += dailyUnitsUpdt;
                moneyPool += dailyUnitsUpdt
            }

            console.log(` Current Unit Count (end): ${currentUnitSum.toFixed(2)}`)
            consoleOutput += ` Current Unit Count (end): ${currentUnitSum.toFixed(2)}\n`;

            if (reinvestRatio < 1) {
                console.log(` Money Pool: ${moneyPool.toFixed(2)}`)
            consoleOutput += ` Money Pool: ${moneyPool.toFixed(2)}\n`;
            }

            time += 1
            console.log(`\n`)
            consoleOutput += `\n`;

        }

        finalUnitSum = currentUnitSum
    }

    function reverse() {
        dailyUnitsFinal = Number(dailyUnitsFinal);
            dailyUnits = Number(dailyUnits);
            nodePrice = Number(nodePrice);
            timeCap = Number(timeCap);
            nodeCap = Number(nodeCap);
            reinvestRatio = Number(reinvestRatio);

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
                        if ((numnodes + finalNodeCount) > nodeCap) {
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
                    moneyPool += finalNodeCount * dailyUnits * (1 - reinvestRatio)

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
                consoleOutput += ` Insufficient time to reach ${dailyUnitsFinal} units per day\n`
            }

    }

    
    if (timeCap === "" && finalUnitSum !== "" && reinvestRatio === "") {
        // document.getElementById("console-output").innerText = 'Please Wait...\n \n';
        boxCreate();
        simple();
    }

    if (finalUnitSum === "" && initialNodeCount >= 1) {
        // document.getElementById("console-output").innerText = 'Please Wait...\n \n';
        boxCreate();
        complex();
        console.log(` Time: ${time - 1} days\n Final Unit Count: ${finalUnitSum.toFixed(2)}\n Final Node Count: ${finalNodeCount}\n Daily Units Final: ${dailyUnitsUpdt.toFixed(2)}`);
        consoleOutput += ` Time: ${time - 1} days\n Final Unit Count: ${finalUnitSum.toFixed(2)}\n Final Node Count: ${finalNodeCount}\n Daily Units Final: ${dailyUnitsUpdt.toFixed(2)}\n`;
        consoleOutput += `\n \n DONE.`;
    }

    if (initialNodeCount == "" && reinvestRatio != "" && nodePrice != "" && dailyUnits != "") {
        // document.getElementById("console-output").innerText = 'Please Wait... \n \n';
        boxCreate();
        reverse();
        consoleOutput += `\n \n DONE.`;
    }

    document.getElementById('console-output').innerText = consoleOutput;

    console.log("Button Working");

    
    

    // Reset calulator to empty variables
    document.getElementById("daily-units").value = "";
    document.getElementById("node-price").value = "";
    document.getElementById("initial-node-count").value = "";
    document.getElementById("final-unit-sum").value = "";
    document.getElementById("time-cap").value = "";
    document.getElementById("node-cap").value = "";
    document.getElementById("daily-units-final").value = "";
    document.getElementById("reinvest-ratio").value = "";

}