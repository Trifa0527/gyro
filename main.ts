function gyro_graph () {
    while (true) {
        OLED.drawLine(
        0,
        32,
        128,
        32
        )
        sxyz(xyzc)
        chgyro = xyz
        for (let index = 0; index <= 128; index++) {
            gyroi = gyroi / 30 + 32
            if (gyroi <= 1) {
                gyroi = 0
            } else if (gyroi >= 127) {
                gyroi = 128
            }
            OLED.drawLine(
            index,
            gyroi,
            index,
            gyroi
            )
            basic.pause(70)
            if (xyz != chgyro) {
                break;
            }
            if (select != 3) {
                break;
            }
        }
        OLED.clear()
        if (select != 2) {
            break;
        }
    }
}
function gyro_level () {
    while (true) {
        leveli = x
        if (900 < leveli) {
            basic.showLeds(`
                . . . . .
                . . # . .
                . . # # .
                . . # . .
                . . . . .
                `)
        } else if (500 < leveli) {
            basic.showLeds(`
                . . . . .
                . . . # .
                . . # . .
                . # . # .
                . . . . .
                `)
        } else if (-200 < leveli) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . # # # .
                . . # . .
                . . . . .
                `)
        } else if (-700 < leveli) {
            basic.showLeds(`
                . . . . .
                . # . . .
                . . # . .
                . # . # .
                . . . . .
                `)
        } else if (-900 < leveli) {
            basic.showLeds(`
                . . . . .
                . . # . .
                . # # . .
                . . # . .
                . . . . .
                `)
        }
        if (lselect != 1) {
            basic.clearScreen()
            break;
        }
    }
}
input.onButtonPressed(Button.A, function () {
    select += 1
    xyz = 1
})
function gyro_info () {
    while (true) {
        OLED.writeString("X : ")
        OLED.writeNumNewLine(x)
        OLED.newLine()
        OLED.writeString("Y : ")
        OLED.writeNumNewLine(y)
        OLED.newLine()
        OLED.writeString("Z : ")
        OLED.writeNumNewLine(z)
        basic.pause(500)
        OLED.clear()
        if (select != 1) {
            break;
        }
    }
}
function gyro_bar () {
    while (true) {
        gyroi = gyroi / 19
        sxyz(xyzc)
        OLED.drawLine(
        64,
        32,
        gyroi + 64,
        32
        )
        basic.pause(200)
        OLED.clear()
        if (select != 2) {
            break;
        }
    }
}
input.onButtonPressed(Button.AB, function () {
    xyz += 1
})
input.onButtonPressed(Button.B, function () {
    if (lselect == 1) {
        lselect = 0
    } else if (lselect == 0) {
        lselect = 1
    }
})
function sxyz (문자열: string) {
    OLED.writeString("                    " + 문자열)
}
let z = 0
let y = 0
let lselect = 0
let x = 0
let leveli = 0
let gyroi = 0
let chgyro = 0
let xyzc = ""
let xyz = 0
let select = 0
OLED.init(128, 64)
select = 1
xyz = 1
basic.forever(function () {
    if (select == 1) {
        gyro_info()
    } else if (select == 2) {
        gyro_bar()
    } else if (select == 3) {
        gyro_graph()
    } else if (select >= 4) {
        select = 1
    }
})
basic.forever(function () {
    if (lselect == 1) {
        gyro_level()
    }
})
basic.forever(function () {
    x = input.acceleration(Dimension.X)
    y = input.acceleration(Dimension.Y)
    z = input.acceleration(Dimension.Z)
    if (xyz == 1) {
        xyzc = "x"
        gyroi = x
    } else if (xyz == 2) {
        xyzc = "y"
        gyroi = y
    } else if (xyz == 3) {
        xyzc = "z"
        gyroi = z
    } else if (xyz >= 4) {
        xyz = 1
    }
})
