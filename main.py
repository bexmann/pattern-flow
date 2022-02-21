def initNeopixel24(size: number):
    Index = 0
    while Index <= size - 1:
        if Index < len(Muster):
            Neopixel_24.insert_at(Index, Muster[Index])
        else:
            Neopixel_24.insert_at(Index, 0)
        Index += 1
def initNeopixel12(size: number):
    Index2 = 0
    while Index2 <= size - 1:
        Neopixel_12: List[number] = []
        if Index2 < len(Muster):
            Neopixel_12.insert_at(Index2, Muster[Index2])
        else:
            Neopixel_12.insert_at(Index2, 0)
        Index2 += 1
def setRGB(rot: number, grün: number, blau: number):
    global Farbe
    Farbe = blau + (grün * 256 + rot * 65536)
    return Farbe
Farbe = 0
Neopixel_24: List[number] = []
Muster: List[number] = []
Anzahl_Pixel12 = 12
Anzahl_Pixel24 = 24
Muster = [setRGB(15, 0, 0),
    setRGB(0, 15, 0),
    setRGB(0, 0, 15),
    setRGB(15, 0, 15)]
initNeopixel24(Anzahl_Pixel24)
initNeopixel12(Anzahl_Pixel12)
An = False
Rechts = False
strip24 = neopixel.create(DigitalPin.P0, Anzahl_Pixel24, NeoPixelMode.RGB)
strip24.clear()
strip24.show()
strip12 = neopixel.create(DigitalPin.P1, Anzahl_Pixel12, NeoPixelMode.RGB)
strip12.clear()
strip12.show()

def on_forever():
    global An, Rechts
    Index22 = 0
    while Index22 <= Anzahl_Pixel24 - 1:
        strip24.set_pixel_color(Index22, Neopixel_24[Index22])
        if input.button_is_pressed(Button.A):
            An = True
        if input.button_is_pressed(Button.A) and Rechts:
            Rechts = False
            basic.show_string("L")
        elif input.button_is_pressed(Button.A) and not (Rechts):
            Rechts = True
            basic.show_string("R")
        if input.button_is_pressed(Button.B):
            An = False
            basic.show_string("")
            strip24.clear()
            strip24.show()
        Index22 += 1
    if An:
        strip24.show()
        basic.pause(100)
    strip24.clear()
    if Rechts:
        Neopixel_24.unshift(Neopixel_24.pop())
    if not (Rechts):
        Neopixel_24.append(Neopixel_24.shift())
basic.forever(on_forever)
