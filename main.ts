radio.onReceivedNumber(function (receivedNumber) {
    sb.setServoPosition(sb.servo(SBServo.ServoA), 50)
})
input.onButtonPressed(Button.A, function () {
    temp = "" + User_Key + "1"
    music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    Check_Key()
})
function Check_Key () {
    User_Key = temp
    serial.writeLine(User_Key)
    if (User_Key == Key) {
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Green))
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedB), sb.color(SBColor.Green))
        sb.transitionServoPosition(sb.servo(SBServo.ServoA), -100, 1, sb.easing(SBEasing.Linear))
        basic.pause(2000)
        sb.transitionServoPosition(sb.servo(SBServo.ServoA), 0, 1, sb.easing(SBEasing.Linear))
        serial.writeLine("System read = USER Key Correct - PASS /23.x5")
        User_Key = ""
    } else if (User_Key.length > Key.length) {
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedA), sb.color(SBColor.Red))
        sb.setRgbLedColor(sb.rgbLed(SBRgbLed.RgbLedB), sb.color(SBColor.Red))
        serial.writeLine("System read = USER Key Wrong - FAIL /23.x5")
        music.play(music.tonePlayable(330, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        fail += 1
        basic.pause(2000)
        basic.clearScreen()
        User_Key = ""
    }
    if (fail == 5) {
        for (let index = 0; index < 30; index++) {
            serial.writeLine("System Read = USER Key Lock - LOCK /13.x5 Beep")
            music.play(music.createSoundExpression(WaveShape.Triangle, 4228, 0, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
            basic.showLeds(`
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                # # # # #
                `)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            serial.writeLine("System Read = Error - Code 505")
        }
    }
}
input.onButtonPressed(Button.B, function () {
    temp = "" + User_Key + "2"
    music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    Check_Key()
})
let temp = ""
let User_Key = ""
let fail = 0
let Key = ""
radio.setGroup(1)
sb.setContinuousServoSpeed(sb.servo(SBServo.ServoA), 100)
sb.setServoPosition(sb.servo(SBServo.ServoA), 0)
let Secret = 54655465
Key = "12121"
fail = 0
User_Key = ""
