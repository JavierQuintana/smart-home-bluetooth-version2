bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
    I2C_LCD1602.ShowString("CONECTADO", 0, 0)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
    I2C_LCD1602.ShowString("DESCONECTADO", 0, 0)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    frase = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    I2C_LCD1602.ShowString(frase, 0, 1)
    if (frase == "ON") {
        pins.digitalWritePin(DigitalPin.P13, 1)
    }
    if (frase == "OFF") {
        pins.digitalWritePin(DigitalPin.P13, 0)
    }
})
let LLUVIA = 0
let frase = ""
basic.showString(control.deviceName())
I2C_LCD1602.on()
I2C_LCD1602.LcdInit(39)
I2C_LCD1602.BacklightOn()
bluetooth.startUartService()
pins.digitalWritePin(DigitalPin.P12, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
let UMBRAL = 500
loops.everyInterval(1000, function () {
    bluetooth.uartWriteValue("Temperatura ", input.temperature())
    LLUVIA = pins.analogReadPin(AnalogPin.P0)
    if (LLUVIA > UMBRAL) {
        bluetooth.uartWriteLine("ESTA LLOVIENDO")
    }
})
