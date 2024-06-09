#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import figlet from 'figlet';
import { differenceInSeconds } from 'date-fns';
console.log(chalk.bold.yellowBright(figlet.textSync('Countdown Timer')));
const res = await inquirer.prompt({
    name: "input",
    type: "number",
    message: "Please enter the amount of seconds",
    validate: (input) => {
        if (isNaN(input)) {
            return "Please enter valid number";
        }
        else if (input > 60) {
            return "Seconds must be in 60";
        }
        else {
            return true;
        }
    }
});
let input = res.input;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval((() => {
        const currTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.bgYellowBright(`Countdown finished.........!⏳`));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
