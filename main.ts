function initNeopixel24 (size: number) {
    for (let Index = 0; Index <= size - 1; Index++) {
        if (Index < Muster.length) {
            Neopixel_24.insertAt(Index, Muster[Index])
        } else {
            Neopixel_24.insertAt(Index, 0)
        }
    }
}
function initNeopixel12 (size: number) {
    for (let Index = 0; Index <= size - 1; Index++) {
        if (Index < Muster.length) {
            Neopixel_12.insertAt(Index, Muster[Index])
        } else {
            Neopixel_12.insertAt(Index, 0)
        }
    }
}
function setRGB (rot: number, grün: number, blau: number) {
    Farbe = blau + (grün * 256 + rot * 65536)
    return Farbe
}
let Farbe = 0
let Neopixel_12: number[] = []
let Neopixel_24: number[] = []
let Muster: number[] = []
let Anzahl_Pixel12 = 12
let Anzahl_Pixel24 = 24
Muster = [setRGB(15, 0, 0), setRGB(0, 15, 0), setRGB(0, 0, 15), setRGB(15, 0, 15)]
initNeopixel24(Anzahl_Pixel24)
initNeopixel12(Anzahl_Pixel12)
let An = false
let Rechts = false
let strip24 = neopixel.create(DigitalPin.P0, Anzahl_Pixel24, NeoPixelMode.RGB)
strip24.clear()
strip24.show()
let strip12 = neopixel.create(DigitalPin.P1, Anzahl_Pixel12, NeoPixelMode.RGB)
strip12.clear()
strip12.show()
basic.forever(function () {
    for (let Index2 = 0; Index2 <= Anzahl_Pixel24 - 1; Index2++) {
        strip24.setPixelColor(Index2, Neopixel_24[Index2])
        if (input.buttonIsPressed(Button.A)) {
            An = true
        }
        if (input.buttonIsPressed(Button.A) && Rechts) {
            Rechts = false
            basic.showString("L")
        } else if (input.buttonIsPressed(Button.A) && !(Rechts)) {
            Rechts = true
            basic.showString("R")
        }
        if (input.buttonIsPressed(Button.B)) {
            An = false
            basic.showString("")
            strip24.clear()
            strip24.show()
        }
    }
    if (An) {
        strip24.show()
        basic.pause(100)
    }
    strip24.clear()
    if (Rechts) {
        Neopixel_24.unshift(Neopixel_24.pop())
    }
    if (!(Rechts)) {
        Neopixel_24.push(Neopixel_24.shift())
    }
})
basic.forever(function () {
    for (let Index2 = 0; Index2 <= Anzahl_Pixel12 - 1; Index2++) {
        strip12.setPixelColor(Index2, Neopixel_12[Index2])
        if (input.buttonIsPressed(Button.B)) {
            strip12.clear()
            strip12.show()
        }
    }
    if (An) {
        strip12.show()
        basic.pause(100)
    }
    strip12.clear()
    if (Rechts) {
        Neopixel_12.unshift(Neopixel_12.pop())
    }
    if (!(Rechts)) {
        Neopixel_12.push(Neopixel_12.shift())
    }
})
